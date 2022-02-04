// for ts
function getKeyValue(obj: any, key: string) {
  return obj[key];
}
function setKeyValue(obj: any, key: string, value: any) {
  obj[key] = value;
}

export default {
  methods: {
    // objsAreTheSame (ex qoAreSameObj)
    // objIsEmpty (ex qoIsObjEmpty)
    // copyAvaibleFields (ex copyFieldsToEdit)

    copyAvaibleFields(ObjEditable: object, ObjToCopy: object) {
      for (const key in ObjEditable) {
        if (typeof getKeyValue(ObjToCopy, key) !== 'undefined') {
          setKeyValue(ObjEditable, key, getKeyValue(ObjToCopy, key));
        }
      }
    },
    qoAreSameObj(obj1: object, obj2: object) {
      for (const key in obj1) {
        if (getKeyValue(obj1, key) != getKeyValue(obj2, key)) return false;
      }
      for (const key in obj2) {
        if (getKeyValue(obj1, key) != getKeyValue(obj2, key)) return false;
      }
      return true;
    },
    qoIsObjEmpty(obj: object = {}) {
      for (const key in obj) {
        // eslint-disable-next-line no-prototype-builtins
        if (obj.hasOwnProperty(key)) return false;
      }
      return true;
    },
  }, // methods
}; // export default
