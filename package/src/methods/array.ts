import qmObj from './obj';
// @ts-ignore
import { ckNotify } from 'cleek';
import { objectWithId } from '../types/parameters';

type SqlOrderType = 'DESC' | 'ASC';
type SqlKeyPair = [string, SqlOrderType | undefined];
type SqlKeysPairFull = [string, SqlOrderType]

const qmArray = {
  arrayToText(arr: any[], key = null) {
    let msg = '';
    for (let index = 0; index < arr.length; index++) {
      // conectors
      if (index) {
        if (index === arr.length - 1) {
          msg += ' y ';
        } else {
          msg += ', ';
        }
      }
      // word
      let word: string;
      if (key) {
        word = arr[index][key];
      } else {
        word = arr[index];
      }
      // word
      msg += `"${word}"`;
    }
    return msg;
  },
  getRandomElementOfArray<T>(arr: T[]) {
    return arr[Math.floor(Math.random() * arr.length)];
  },
  insert<T>(arr: T[], index: number, item: T) {
    arr.splice(index, 0, item)
  },
  removeOfArray<T>(list: T[], findFunction: (element: T) => boolean) {
    if (!list || !findFunction) return;
    const index = list.findIndex(findFunction);
    if (index === -1) return;
    list.splice(index, 1);
  },
  removeOfArrayById(list: objectWithId[], id: number) {
    const index = list.findIndex(i => i.id === id);
    if (index === -1) return;
    list.splice(index, 1);
  },
  replaceInList<T>(arr: T[], newItem: T, prop: string = 'id') {
    if (!newItem) return;
    const index = arr.findIndex(i => qmObj.getValueByKey(i, prop) === qmObj.getValueByKey(newItem, prop));
    if (index !== -1) arr.splice(index, 1, newItem);
  },
  sort<T>(arr: T[], keys: string | SqlKeyPair | SqlKeyPair[]) : T[] {
    // sort array of objects
    // keys can be: 'key' | [key, 'DESC'] | [[key1, 'ASC'], key2, [key3, 'DESC']
  
    function varIsSqlKeys(varToCheck: SqlKeyPair | SqlKeyPair[]): varToCheck is SqlKeyPair {
      return typeof varToCheck[0] === 'string' && (varToCheck[1] === 'DESC' || varToCheck[1] === 'ASC');
    } 
    function forceOrderType([keyName, order]: SqlKeyPair) {
      if (order !== 'DESC') order = 'ASC';
      return [keyName, order] as SqlKeysPairFull;
    }
    // clean the data - anytyhing -> SqlKeyPair[]
    let keysList: SqlKeyPair[];
    if (typeof keys === 'string') {
      keysList = [[keys, 'ASC']];
    } else {
      if (varIsSqlKeys(keys)) {
        keysList = [keys];
      } else {
        keysList = keys;
      }
    }
    const finalKeysList: SqlKeysPairFull[] = [];
    keysList.forEach((keyPair) => {
      finalKeysList.push(forceOrderType(keyPair))
    });
    // now keysList is something like [[key1, 'DESC'], [key2], [key3], [key4, 'DESC'])
    return arr.sort((a, b) => {
      let value = 0;
      finalKeysList.forEach(([key, order]) => {
        if (!value) {
          const mult = order === 'DESC' ? -1 : +1;
          // or 0, because undefined broke everything
          if ((qmObj.getValueByKey(a, key) || 0) < (qmObj.getValueByKey(b, key) || 0)) value = -1 * mult;
          if ((qmObj.getValueByKey(a, key) || 0) > (qmObj.getValueByKey(b, key) || 0)) value = +1 * mult;
        }
      });
      return value;
    });
  },
  validateFields(fields: [boolean, string][]) {
    for (const field of fields) {
      if (field[0]) {
        ckNotify.notifyError(field[1], 'Atención');
        return false;
      }
    }
    return true;
  },
}; // export default

export default qmArray