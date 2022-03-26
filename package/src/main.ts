import qmApi from './methods/api';
import qmArray from './methods/array';
import qmAudio from './methods/audio';
import qmDate from './methods/date';
import qmNum from './methods/num';
import qmObj from './methods/obj';
import qmStr from './methods/str';

import './types/parameters';

const allModules = {
  qmApi,
  qmArray,
  qmAudio,
  qmDate,
  qmNum,
  qmObj,
  qmStr,
};
export {
  allModules as default,
  qmApi,
  qmArray,
  qmAudio,
  qmDate,
  qmNum,
  qmObj,
  qmStr,
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