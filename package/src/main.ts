import qmApiRest from './methods/api-rest';
import qmArray from './methods/array';
import qmAudio from './methods/audio';
import qmDate from './methods/date';
import qmNum from './methods/num';
import qmObj from './methods/obj';
import qmStr from './methods/str';

import type {
  DayOfWeekLowerCase,
  DayOfWeek,
  DayOfWeekSpanishLowerCase,
  DayOfWeekSpanish,
  MonthNameLowerCase,
  MonthName,
  MonthNameSpanishLowerCase,
  MonthNameSpanish,
} from './methods/date';


import './types/parameters';

const allModules = {
  qmApiRest,
  qmArray,
  qmAudio,
  qmDate,
  qmNum,
  qmObj,
  qmStr,
};
export {
  allModules as default,
  qmApiRest,
  qmArray,
  qmAudio,
  qmDate,
  qmNum,
  qmObj,
  qmStr,
  // TYPES
  // date types
  DayOfWeekLowerCase,
  DayOfWeek,
  DayOfWeekSpanishLowerCase,
  DayOfWeekSpanish,
  MonthNameLowerCase,
  MonthName,
  MonthNameSpanishLowerCase,
  MonthNameSpanish,
};

// export module App {
//   export class SomeClass {
//     getName(): string {
//       return 'name';
//     }
//   }
//   export class OtherClass {
//     getName(): string {
//       return 'name';
//     }
//   }
// }