// for ts
function getKeyValue(obj: any, key: string) {
  return obj[key];
}
function setKeyValue(obj: any, key: string, value: any) {
  obj[key] = value;
}

export default {
  // addEmptyOptionToList (ex global_addOptionNotSelected)
  // getObjKey
  // objsAreTheSame (ex qoAreSameObj)
  // objIsEmpty (ex qoIsObjEmpty || objIsEmpty)
  // copyAvaibleFields (ex copyFieldsToEdit)

  addEmptyOptionToList(optionsList: any[], { prop = 'name', title = 'Todos', noneId = 0 } = {}) {
    const noneOption = {
      id: noneId,
      [prop]: title,
    };
    const newList = [...optionsList];
    newList.unshift(noneOption);
    return newList;
  },
  copyAvaibleFields(ObjEditable: object, ObjToCopy: object) {
    for (const key in ObjEditable) {
      if (typeof getKeyValue(ObjToCopy, key) !== 'undefined') {
        setKeyValue(ObjEditable, key, getKeyValue(ObjToCopy, key));
      }
    }
  },
  isArray(obj: [object, any[]]) {
    return obj.constructor === Array;
  },
  getObjKey(obj: any, key: string): any{
    return obj[key];
  },
  objsAreTheSame(obj1: object, obj2: object) {
    for (const key in obj1) {
      if (getKeyValue(obj1, key) != getKeyValue(obj2, key)) return false;
    }
    for (const key in obj2) {
      if (getKeyValue(obj1, key) != getKeyValue(obj2, key)) return false;
    }
    return true;
  },
  qoIsObjEmpty(obj: object = {}) {
    return (
      obj
      && Object.keys(obj).length === 0
      && Object.getPrototypeOf(obj) === Object.prototype
    );
  },
}; // export default
