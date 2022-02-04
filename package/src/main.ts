import qmStr from './methods/str';
import qmObj from './methods/obj';

export default {
  qmStr,
  qmObj,
};

export module App {
  export class SomeClass {
    getName(): string {
      return 'name';
    }
  }
  export class OtherClass {
    getName(): string {
      return 'name';
    }
  }
}