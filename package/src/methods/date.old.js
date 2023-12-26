// @ts-ignore
import moment from 'moment';

// MIGRATION GUIDE
// # ALL "Diferece"s muted to plural (day -> days | week -> weeks | month -> months | year -> years)

// monthsNamesSpanish -> getAllMonths('es')

// daysOfWeekNames -> getAllDaysOfWeek() # ANTES LOS DABA EN MINÚSCULA, AHORA EN MAYUS
// daysOfWeekNamesMondayFirst -> getAllDaysOfWeek('en', { mondayFirst: true })
// daysOfWeekNamesSpanishMondayFirst -> getAllDaysOfWeek('es', { mondayFirst: true })
// daysOfWeekNamesSpanish -> getAllDaysOfWeek('es')

// getActualDayOfWeek -> getDayOfWeekNum
// getDayOfWeek -> getDayOfWeekNum # before: [0-6] now: [1-7]

// getNameOfDate -> presentDateInWords

// getMonth -> getMonthNum
// getMonthOfDB -> getMonthNum
// getCurrentMonth -> getMonthNum

// getDayOfDB -> getDayOfMonth
// getDayOfMonth -> getDayOfMonth
// getCurrentDayOfMonth -> getDayOfMonth

// getMonthName -> getMonthName # Before, in none return 'Todo el año', now is current;

// getCurrentYear -> getYear
// getYear -> getYear

// getCurrentDate -> getDate
// getActualDateByDate -> getDate

// getCurrentDatetime -> getDatetime

// minToHour -> minToHour
// hourToMin -> hourToMin
// dateIsNewer -> dateIsNewer
// getCurrentMinutesOfDay -> getMinutesOfDay
// daysDiference -> datesDifferenceInDays
// getYearsFromDate -> datesDifferenceInYears

export default {
  data() {
    return {
      emptyDatetime: '0000-00-00 00:00:00',
      emptyDate: '0000-00-00',
      daysOfWeekNames: [
        'sunday',
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
      ],
      daysOfWeekNamesMondayFirst: [
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
        'sunday',
      ],
      daysOfWeekNamesSpanishMondayFirst: [
        'Lunes',
        'Martes',
        'Miércoles',
        'Jueves',
        'Viernes',
        'Sábado',
        'Domingo',
      ],
      daysOfWeekNamesSpanish: [
        'Domingo',
        'Lunes',
        'Martes',
        'Miércoles',
        'Jueves',
        'Viernes',
        'Sábado',
      ],
      monthsNamesSpanish: [
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
    }; // return data
  }, // data
  methods: {

    // WORKING WITH DATES
    getNameOfDate(date, configToShow = []) {
      const Show = {
        day: !!configToShow.includes('day'),
        num: !!configToShow.includes('num'),
        month: !!configToShow.includes('month'),
        year: !!configToShow.includes('year'),
      };
      // return date name like "Jueves 24 de Mayo de 2014"
      // get object to hide parts of date. eg: { year: false,} return "Jueves 24 de Mayo"
      if (date == this.getCurrentDate()) return 'Hoy';
      if (date == this.getCurrentDate({ day: +1 })) return 'Mañana';
      const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
      let finalDate = '';
      if (Show.day) finalDate += ` ${daysOfWeek[+this.getDayOfWeek(date)]}`;
      if (Show.num) finalDate += ` ${this.getDayOfMonth(date)}`;
      if (Show.month) finalDate += ` de ${this.monthsNamesSpanish[+this.getMonth(date) - 1]}`;
      if (Show.year) finalDate += ` de ${this.getYear(date)}`;
      return finalDate;
    },
    getDayOfMonth(date) {
    // return number of day of month. Between 01 and 31
      return this.getMomentByDate(date).format('DD');
    },
    getMonth(date) {
    // return number of month. Between 01 and 12
      return this.getMomentByDate(date).format('MM');
    },
    getMonthName(monthNum) {
      if (!monthNum) return 'Todo el año';
      return this.monthsNamesSpanish[monthNum - 1];
    },
    getYear(date) {
      return this.getMomentByDate(date).format('YYYY');
    },
    getDayOfWeek(date) {
    // return number of day of week.Between 0 and 6
    // sunday is 0
      return this.getMomentByDate(date).day();
    },
    isDateEmpty(date) {
      if (!date) return true;
      if (date === this.emptyDate) return true;
      if (date === this.emptyDatetime) return true;
      return false;
    },
    isTimeEmpty(date) {
      if (!date) return true;
      if (date.substring(0, 5) === '00:00') return true;
      return false;
    },

    // OTRAS COSAS
    // daysDiference
    // getNameOfDate
    // minToHour
    // hourToMin
    // showRange
    // dateIsNewer
    // validateDatetime
    daysDiference(date1, date2) {
      const a = moment(date1, 'YYYY-MM-DD');
      const b = moment(date2, 'YYYY-MM-DD');
      return b.diff(a, 'days');
    },
    showRange(time, timeOfRange = null) {
      // showRange of time to select delivery options
      const defaultTimeOfRange = 60;
      timeOfRange = timeOfRange == null ? defaultTimeOfRange : timeOfRange;
      return `Entre ${this.minToHour(time)} y ${this.minToHour((time) + timeOfRange)}`;
    },
    showRangeAlt(time, timeOfRange = null) {
      // showRange of time to select delivery options
      const defaultTimeOfRange = 60;
      timeOfRange = timeOfRange == null ? defaultTimeOfRange : timeOfRange;
      return `${this.minToHour(time)} y ${this.minToHour((time) + timeOfRange)}`;
    },
    minToHour(val: number) {
      // get minutes as int and return hour as string
      const isNegative = val < 0;
      val = Math.abs(val);
      let hour = Math.floor(val / 60);
      hour = (hour < 10 ? '0' : '') + hour;
      const min = this._qmStr.padZeros((+val % 60), 2);
      if (isNegative) hour = `-${hour}`;
      return `${hour}:${min}`;
    },
    hourToMin(val) {
      // get hour as string and return min as string
      const hour = val.substring(0, 2);
      const min = val.substring(3, 5);
      return +hour * 60 + +min;
    },
    dateIsNewer(date1, date2) {
      // compare two dates and return true if date1 is newer than date2
      const d1 = {
        year: +date1.substring(0, 4),
        month: +date1.substring(5, 7),
        day: +date1.substring(8, 10),
      };
      const d2 = {
        year: +date2.substring(0, 4),
        month: +date2.substring(5, 7),
        day: +date2.substring(8, 10),
      };
      if (d1.year > d2.year) return true;
      if (d1.year < d2.year) return false;
      if (d1.month > d2.month) return true;
      if (d1.month < d2.month) return false;
      if (d1.day > d2.day) return true;
      return false;
    },

    getYearsFromDate(date) {
      // return diference of years between date and now
      if (date == '' || date == this.emptyDate || date == this.emptyDatetime) return '';
      return moment().diff(date, 'years', false); // false is to avoid float
    },

    validateDate(date) {
      // check the structure nnnn-nn-nn
      for (let i = 0; i < date.length; i++) {
        const char = date.charAt(i);
        if (i == 4 || i == 7) {
          if (char != '-') return false;
        } else if (char != +char) return false;
      }
      return true;
    },

    validateTime(time) {
      // check the structure nn:nn:nn
      for (let i = 0; i < time.length; i++) {
        const char = time.charAt(i);
        if (i == 2 || i == 5) {
          if (char != ':') return false;
        // } else {
        //   if (char != +char) return false;
        }
      }
      return true;
    },

    validateDatetime(datetime) {
      // check datetime is valid
      const date = datetime.substring(0, 10);
      const space = datetime.substring(10, 11);
      const time = datetime.substring(11, 19);
      if (!this.validateDate(date)) return false;
      if (space != ' ') return false;
      if (!this.validateTime(time)) return false;
      return true;
    },

    // DATE COSAS

    getMoment(Diference = {}) {
      // only called by other function to get date
      Diference.seconds = Diference.seconds || 0;
      Diference.day = Diference.day || 0;
      Diference.week = Diference.week || 0;
      Diference.month = Diference.month || 0;
      Diference.year = Diference.year || 0;
      const m = moment();
      m.add(Diference.seconds, 'seconds');
      m.add(Diference.day, 'days');
      m.add(Diference.week, 'weeks');
      m.add(Diference.month, 'months');
      m.add(Diference.year, 'years');
      return m;
      // return m.format('DD/MM/YYYY');
    },
    getMomentByDate(date, Diference = {}) {
      // same than momenty but by date
      Diference.day = Diference.day || 0;
      Diference.month = Diference.month || 0;
      Diference.year = Diference.year || 0;
      const m = moment(date);
      m.add(Diference.day, 'days');
      m.add(Diference.month, 'months');
      m.add(Diference.year, 'years');
      return m;
    },
    // getActualDatetime

    getCurrentDayOfMonth(Diference = {}) {
      return this.getMoment(Diference).format('DD');
    },
    getCurrentMonth(Diference = {}) {
      return this.getMoment(Diference).format('MM');
    },
    getCurrentYear(Diference = {}) {
      return this.getMoment(Diference).format('YYYY');
    },

    // TO DB
    getCurrentDate(Diference = {}) {
      return this.getMoment(Diference).format('YYYY-MM-DD');
    },
    getActualDateByDate(date, Diference = {}) {
      return this.getMomentByDate(date, Diference).format('YYYY-MM-DD');
    },
    getCurrentDatetime(Diference = {}) {
      return this.getMoment(Diference).format('YYYY-MM-DD HH:mm:ss');
    },
    getActualDayOfWeek(Diference = {}) {
      return this.getMoment(Diference).day();
    },
    getCurrentMinutesOfDay() {
      const hour = this.getMoment().format('HH');
      const min = this.getMoment().format('mm');
      return +hour * 60 + +min;
    },

    // FROM DB
    getDayOfDB(date) {
      return date.substring(8, 10);
    },
    getMonthOfDB(date) {
      return date.substring(5, 7);
    },
    getDateOfDB(date, onlyNumber = false) {
      if (!date) return '';
      if (!onlyNumber) {
        if (date === this.getCurrentDate()) return 'Hoy';
        // if (date == this.getCurrentDate({day: +2})) return 'Pasado mañana';
        if (date === this.getCurrentDate({ day: +1 })) return 'Mañana';
        if (date === this.getCurrentDate({ day: -1 })) return 'Ayer';
        if (date === this.getCurrentDate({ day: -2 })) return 'Anteayer';
      }
      if (date === '0000-00-00') return '-';
      const month = date.substring(5, 7).padStart(2, '0');
      const day = date.substring(8, 10).padStart(2, '0');
      const year = date.substring(2, 4);
      return `${day}/${month}/${year}`;
    },
    getTimeOfDB(date) {
      // getTimeFromDate
      if (!date) return '';
      const time = date.substring(11, 16);
      if (this.isTimeEmpty(time)) return '';
      return time;
    },
    showDatetime(datetime) {
      if (!datetime) return '';
      const date = this.getDateOfDB(datetime);
      const time = this.getTimeOfDB(datetime);
      if (!date && !time) return '';
      if (!date) return time;
      if (!time) return date;
      return `${date} | ${time}`;
    },
  }, // methods
}; // export
