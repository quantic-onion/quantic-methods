import qmStr from '$packageMethods/str';

import {
  compareAsc,
  addSeconds,
  addDays,
  addWeeks,
  addMonths,
  addYears,
  format as _format
} from 'date-fns';
import intervalToDuration from 'date-fns/intervalToDuration'
import { es } from 'date-fns/locale';

// types
type Languaje = 'es' | 'en';
type Time = string | undefined; // hh:mm
type Date = string; // yyyy-mm-dd
type DateDiference = {
  seconds: number,
  days: number,
  weeks: number,
  months: number,
  years: number,
};
type Datetime = string

type presentedDate = string; // dd/mm/yyyy
type DateFormat = 'dd/mm' | 'dd/mm/yy' | 'dd/mm/yyyy';
type DateParam = Date | DateDiference | undefined
type DatetimeParam = Datetime | undefined
// end types


// constants
// const MILLISECONDS_IN_DAY = 1000 * 60 * 60 * 24;
const DEFAULT_LANG = 'en';
const DAYS_OF_WEEK_NAMES = {
  es: [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
  ],
  en: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ],
}
const MONTH_NAMES = {
  es: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ],
  en: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
};
// end constants

// GLOBAL FUNCTIONS
// getDate
function setDate(date: DateParam = undefined) {
  // current date
  if (!date) return new Date();
  // passed date
  if (typeof date === 'string') {
    // if has not time, set time to 0
    if (date.length < 16) date = `${date.slice(0, )}T00:00:00`
    return new Date(date);
  }
  // date by diference
  const Diference = date;
  let newDate = new Date();
  if (Diference.seconds) addSeconds(newDate, Diference.seconds);
  if (Diference.days) newDate = addDays(newDate, Diference.days);
  if (Diference.weeks) newDate = addWeeks(newDate, Diference.weeks);
  if (Diference.months) newDate = addMonths(newDate, Diference.months);
  if (Diference.years) newDate = addYears(newDate, Diference.years);
  return newDate;
}
function setDatetime(datetime: DatetimeParam) {
  return setDate(datetime);
}
function getDatesInterval(date1: DateParam, date2: DateParam) {
  return intervalToDuration({
    start: setDate(date1),
    end: setDate(date2)
  }) // => { years: 39, months: 2, days: 20, hours: 7, minutes: 5, seconds: 0 }
}

function formatDate(date: DateParam, format: string) {
  return _format(setDate(date), format);
}
function formatDatetime(datetime: DatetimeParam, format: string) {
  return _format(setDatetime(datetime), format);
}
function formatDateLang(date: DateParam, format: string, lang: Languaje) {
  const langParam = lang === 'es' ? es : undefined;
  return _format(setDate(date), format, { locale: langParam });
}
function formatDateCapitalized(date: DateParam, format: string) {
  return qmStr.capitalize(formatDate(date, format));
}
function formatDateLangCapitalized(date: DateParam, format: string, lang: Languaje) {
  return qmStr.capitalize(formatDateLang(date, format, lang));
}
// END GLOBAL FUNCTIONS

export default {
  // GET LIST
  // getAllDaysOfWeek
  // getAllMonths
  getAllDaysOfWeek(
    lang: Languaje = DEFAULT_LANG, 
    { mondayFirst = false }:
    { mondayFirst: boolean } =
    { mondayFirst: false }
  ) {
    const list = DAYS_OF_WEEK_NAMES[lang]
    if (!mondayFirst) return [...list];
    return [...list.slice(1, list.length), ...list.slice(0, 1)];
  },
  getAllMonths(lang: Languaje = DEFAULT_LANG) {
    return MONTH_NAMES[lang];
  },

  // MINUTES
  // hourToMin
  // minToHour
  hourToMin(time: Time) {
    if (!time) return '';
    // get hour as string and return min as number
    const hour = time.substring(0, time.length - 3);
    const min = time.substring(time.length - 2, time.length);
    return +hour * 60 + +min;
  },
  minToHour(minutes: number) {
    // get minutes as int and return hour as string
    const isNegative = minutes < 0;
    minutes = Math.abs(minutes);
    let hour = Math.floor(minutes / 60);
    let hourTxt = (hour < 10 ? '0' : '') + hour;
    const min = qmStr.padZeros((+minutes % 60), 2);
    if (isNegative) hourTxt = `-${hourTxt}`;
    return `${hourTxt}:${min}`;
  },

  // DATE
  // getDate
  // getDatetime
  // getDayOfMonth
  // getDayOfWeekNum
  // getDayOfWeekName
  // getDayOfYear
  // getMinutesOfDay
  // getMonthNum
  // getMonthName
  // getTime
  // getYear
  getDate(date: DateParam = undefined) {
    return formatDate(date, 'yyyy-MM-dd')
  },
  getDatetime(datetime: DatetimeParam = undefined) {
    return `${this.getDate(datetime)} ${this.getTime(datetime)}`;
  },
  getDayOfMonth(date: DateParam = undefined) {
    return formatDate(date, 'd');
  },
  getDayOfWeekNum(date: DateParam = undefined) {
    // return number of day. Between 1 and 7
    return formatDate(date, 'i');
  },
  getDayOfWeekName(date: DateParam = undefined, lang: Languaje = DEFAULT_LANG) {
    return formatDateLangCapitalized(date, 'iiii', lang);
  },
  getDayOfYear(date: DateParam = undefined) {
    // return number of day. Between 1 and 366
    return formatDate(date, 'D');
  },
  getMinutesOfDay(datetime: DatetimeParam = undefined) {
    const h = formatDatetime(datetime, 'kk');
    const min = formatDatetime(datetime, 'mm');
    return (+h * 60) + (+min);
  },
  getMonthNum(date: DateParam = undefined) {
    // return number of month. Between 01 and 12
    return formatDate(date, 'MM');
  },
  getMonthName(date: DateParam = undefined, lang: Languaje = DEFAULT_LANG) {
    return formatDateLangCapitalized(date, 'MMMM', lang);
  },
  getTime(datetime: DatetimeParam = undefined, useMiliseconds: boolean = false) {
    if (!useMiliseconds) return formatDatetime(datetime, 'kk:mm:ss');
    return formatDatetime(datetime, 'kk:mm:ss:SSSSSS');
  },
  getYear(date: DateParam = undefined, format: 'yy' | 'yyyy' = 'yyyy') {
    return formatDateCapitalized(date, format);
  },

  // COMPARISON
  dateIsNewer(date1: DateParam = undefined, date2: DateParam = undefined) {
    // compare two dates and return true if date1 is newer than date2
    if (date1 === undefined && date2 === undefined) return false;
    return this.dateIsNewerFunc(date1, date2) === 1;
  },
  dateIsNewerFunc(date1: DateParam = undefined, date2: DateParam = undefined) {
    // compare two dates and returns:
    // -1 if date1 < date2
    //  0 if date1 = date2
    //  1 if date1 > date2
    if (date1 === undefined && date2 === undefined) return 0;
    return compareAsc(setDate(date1), setDate(date2));
  },
  datesDifferenceInDays(date1: DateParam = undefined, date2: DateParam = undefined) {
    // return diference in days
    // (just full days count)
    // (allways positive)
    if (date1 === undefined && date2 === undefined) return 0;
    return getDatesInterval(date1, date2).days || 0;
  },

  // PRESENTATION
  // presentDate
  // presentTime
  presentDate(date?: DateParam, format: DateFormat = 'dd/mm/yy'): presentedDate {
    if (!date) return '';
    let pluginFormat = 'dd/MM/yy';
    if (format === 'dd/mm/yyyy') pluginFormat = 'dd/MM/yyyy';
    if (format === 'dd/mm') pluginFormat = 'dd/MM';
    return formatDate(date, pluginFormat)
  },
  presentTime(datetime?: DatetimeParam): presentedDate {
    if (!datetime) return '';
    return formatDatetime(datetime, 'kk:mm');
  },
  dateToDb(date: presentedDate) {
    const day = date.substring(0, 2);
    const month = date.substring(3, 5);
    const year = date.substring(6, 10);
    return `${year}-${month}-${day}`;
  },
};