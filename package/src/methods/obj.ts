// for ts
function getKeyValue(obj: any, key: string) {
  return obj[key];
}
function setKeyValue(obj: any, key: string, value: any) {
  obj[key] = value;
}

export default {
  methods: {
    // addEmptyOptionToList (ex global_addOptionNotSelected)
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
    global_validateParams(validationParams) {
      validationParams.forEach((ValidationParam) => {
        if (ValidationParam.condition) {
          this.rsAlert(ValidationParam.msg);
          return false;
        }
      });
      return true;
    },
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
      return (
        obj
        && Object.keys(obj).length === 0
        && Object.getPrototypeOf(obj) === Object.prototype
      );
    },
  }, // methods
}; // export default
