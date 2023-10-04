import qmStr from './str';

// day of week
export type DayOfWeekLowerCase = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
export type DayOfWeekSpanishLowerCase = 'domingo' | 'lunes' | 'martes' | 'miércoles' | 'jueves' | 'viernes' | 'sábado';
export type DayOfWeekSpanish = 'Domingo' | 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado';
// month name
export type MonthNameLowerCase =
	| 'january'
	| 'february'
	| 'march'
	| 'april'
	| 'may'
	| 'june'
	| 'july'
	| 'august'
	| 'september'
	| 'october'
	| 'november'
	| 'december';
export type MonthName =
	| 'January'
	| 'February'
	| 'March'
	| 'April'
	| 'May'
	| 'June'
	| 'July'
	| 'August'
	| 'September'
	| 'October'
	| 'November'
	| 'December';
export type MonthNameSpanishLowerCase =
	| 'enero'
	| 'febrero'
	| 'marzo'
	| 'abril'
	| 'mayo'
	| 'junio'
	| 'julio'
	| 'agosto'
	| 'septiembre'
	| 'octubre'
	| 'noviembre'
	| 'diciembre';
export type MonthNameSpanish =
	| 'Enero'
	| 'Febrero'
	| 'Marzo'
	| 'Abril'
	| 'Mayo'
	| 'Junio'
	| 'Julio'
	| 'Agosto'
	| 'Septiembre'
	| 'Octubre'
	| 'Noviembre'
	| 'Diciembre';

import { compareAsc, addSeconds, addDays, addWeeks, addMonths, addYears, intervalToDuration, format as _format } from 'date-fns';
import { es as languajeEs } from 'date-fns/locale';

// types
type Languaje = 'es' | 'en';
type Time = string | undefined; // hh:mm
type TsDate = string; // yyyy-mm-dd
type presentedDate = string; // dd/mm/yyyy
type DateFormat = 'dd/mm' | 'dd/mm/yy' | 'dd/mm/yyyy';
type DateDiference = {
	seconds?: number;
	days?: number;
	weeks?: number;
	months?: number;
	years?: number;
};
type TsDatetime = string;

type DateParam = TsDate | DateDiference | undefined | null;
type DatetimeParam = TsDatetime | undefined | null;
// end types

// constants
// const MILLISECONDS_IN_DAY = 1000 * 60 * 60 * 24;
const DEFAULT_LANG = 'en';
const DAYS_OF_WEEK_NAMES: {
	es: DayOfWeekSpanish[];
	en: DayOfWeek[];
} = {
	es: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
	en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
};
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
	en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
};
// end constants

// LOCAL FUNCTIONS
function setDateDifference(date: Date, diference?: DateDiference) {
	if (!diference) return date;
	if (diference.seconds) addSeconds(date, diference.seconds);
	if (diference.days) date = addDays(date, diference.days);
	if (diference.weeks) date = addWeeks(date, diference.weeks);
	if (diference.months) date = addMonths(date, diference.months);
	if (diference.years) date = addYears(date, diference.years);
	return date;
}

// GLOBAL FUNCTIONS
function setDate(dateParam: DateParam, diference?: DateDiference) {
	// current date
	if (!dateParam) return setDateDifference(new Date(), diference);
	// passed date
	if (typeof dateParam === 'string') {
		if (dateParam.length < 16) dateParam = dateParam.slice(0, 10); // remove timezone
		if (dateParam.length > 10) dateParam = dateParam.slice(0, 10); // remove timezone
		return setDateDifference(new Date(`${dateParam}T00:00:00`), diference); // force timezone ignore
	}
	// date by diference
	return setDateDifference(new Date(), dateParam);
}
function setDatetime(dateParam: DateParam, diference?: DateDiference) {
	// current date
	if (!dateParam) return setDateDifference(new Date(), diference);
	// passed date
	if (typeof dateParam === 'string') {
		if (dateParam.length < 16) dateParam = `${dateParam.slice(0)}T00:00:00`; // if has not time, set time to 0
		return setDateDifference(new Date(dateParam), diference);
	}
	// date by diference
	return setDateDifference(new Date(), dateParam);
}
function getDatesInterval(date1: DateParam, date2: DateParam) {
	return intervalToDuration({
		start: setDate(date1),
		end: setDate(date2),
	}); // => { years: 39, months: 2, days: 20, hours: 7, minutes: 5, seconds: 0 }
}

function formatDate(date: DateParam, format: string, diference?: DateDiference) {
	return _format(setDate(date, diference), format);
}
function formatDatetime(datetime: DatetimeParam, format: string) {
	return _format(setDatetime(datetime), format);
}
function formatDateLang(date: DateParam, format: string, lang: Languaje) {
	const langParam = lang === 'es' ? languajeEs : undefined;
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
	getAllDaysOfWeek(lang: Languaje = DEFAULT_LANG, { mondayFirst = false }: { mondayFirst: boolean } = { mondayFirst: false }) {
		const list = DAYS_OF_WEEK_NAMES[lang];
		if (!mondayFirst) return [...list];
		return [...list.slice(1, list.length), ...list.slice(0, 1)];
	},
	getAllMonths(lang: Languaje = DEFAULT_LANG) {
		return MONTH_NAMES[lang];
	},

	// MINUTES
	// hourToMin
	// minToHour
	hourToMin(time?: Time) {
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
		const min = qmStr.padZeros(+minutes % 60, 2);
		if (isNegative) hourTxt = `-${hourTxt}`;
		return `${hourTxt}:${min}`;
	},

	// DATE
	// getDate
	// getDatetime
	// getDatetimeUtc
	// getDayOfMonth
	// getDayOfWeekNum
	// getDayOfWeekName
	// getDayOfYear
	// getMinutesOfDay
	// getMonthNum
	// getMonthName
	// getTime
	// getYear
	getDate(date?: DateParam, difference?: DateDiference) {
		return formatDate(date, 'yyyy-MM-dd', difference);
	},
	getDatetime(datetime?: DatetimeParam) {
		return `${this.getDate(datetime)} ${this.getTime(datetime)}`;
	},
	getDatetimeUtc() {
		const now = new Date();
		const year = now.getUTCFullYear();
		const month = String(now.getUTCMonth() + 1).padStart(2, '0');
		const day = String(now.getUTCDate()).padStart(2, '0');
		const hours = String(now.getUTCHours()).padStart(2, '0');
		const minutes = String(now.getUTCMinutes()).padStart(2, '0');
		return `${year}-${month}-${day}T${hours}:${minutes}`;
	},
	getDayOfMonth(date?: DateParam) {
		return formatDate(date, 'd');
	},
	getDayOfWeekNum(date?: DateParam) {
		// return number of day. Between 1 and 7
		return formatDate(date, 'i');
	},
	getDayOfWeekName(date?: DateParam, lang: Languaje = DEFAULT_LANG) {
		const format = 'iiii';
		return formatDateLangCapitalized(date, format, lang) as DayOfWeek;
	},
	getDayOfYear(date?: DateParam) {
		// return number of day. Between 1 and 366
		return formatDate(date, 'D');
	},
	getMinutesOfDay(datetime?: DatetimeParam) {
		const h = formatDatetime(datetime, 'kk');
		const min = formatDatetime(datetime, 'mm');
		return +h * 60 + +min;
	},
	getMonthNum(date?: DateParam) {
		// return number of month. Between 01 and 12
		return formatDate(date, 'MM');
	},
	getMonthName(date?: DateParam, lang: Languaje = DEFAULT_LANG) {
		return formatDateLangCapitalized(date, 'MMMM', lang);
	},
	getMonthNameByMonth(monthNum: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12) {
		if (!+monthNum || +monthNum > 12 || +monthNum < 0) return '';
		return MONTH_NAMES.es[monthNum - 1];
	},
	getTime(datetime?: DatetimeParam, useSeconds: boolean = false, useMiliseconds: boolean = false) {
		if (!useSeconds) return formatDatetime(datetime, 'kk:mm');
		if (!useMiliseconds) return formatDatetime(datetime, 'kk:mm:ss');
		return formatDatetime(datetime, 'kk:mm:ss:SSSSSS');
	},
	getYear(date?: DateParam, format: 'yy' | 'yyyy' = 'yyyy') {
		return +formatDateCapitalized(date, format);
	},

	// COMPARISON
	dateIsNewer(date1?: DateParam, date2?: DateParam) {
		// compare two dates and return true if date1 is newer than date2
		if (!date1 && !date2) return false;
		return this.dateIsNewerFunc(date1, date2) === 1;
	},
	dateIsNewerFunc(date1?: DateParam, date2?: DateParam) {
		// compare two dates and returns:
		// -1 if date1 < date2
		//  0 if date1 = date2
		//  1 if date1 > date2
		if (!date1 && !date2) return 0;
		return compareAsc(setDate(date1), setDate(date2));
	},
	datesDifferenceInDays(date1?: DateParam, date2?: DateParam) {
		// return diference in days
		// (just full days count)
		// (allways positive)
		if (!date1 || !date2) return 0;
		return getDatesInterval(date1, date2).days || 0;
	},
	datesDifferenceInYears(date1?: DateParam, date2?: DateParam) {
		// return diference in years
		// (just full years count)
		// (allways positive)
		if (!date1 || !date2) return 0;
		return getDatesInterval(date1, date2).years || 0;
	},

	// PRESENTATION
	// presentDate
	// presentTime
	presentDate(date?: DateParam, format: DateFormat = 'dd/mm/yy'): presentedDate {
		if (!date) return '';
		let pluginFormat = 'dd/MM/yy';
		if (format === 'dd/mm/yyyy') pluginFormat = 'dd/MM/yyyy';
		if (format === 'dd/mm') pluginFormat = 'dd/MM';
		return formatDate(date, pluginFormat);
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
