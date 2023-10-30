import qmStr from './str';

const obj = {
  deepCopy(obj: any) {
    return JSON.parse(JSON.stringify(obj));
  },
	// for ts
	getKeyValue(obj: any, key: string) {
		return obj[key];
	},
	setKeyValue(obj: any, key: string, value: any) {
		obj[key] = value;
	},
	// addEmptyOptionToList (ex global_addOptionNotSelected)
	// getObjKey -> should be renamed to getValueByKey
	// getValueByKey
	// objsAreTheSame (ex qoAreSameObj)
	// renameObjKey
	// objIsEmpty (ex qoIsObjEmpty || objIsEmpty)
	// setValueByKey
	// @ts-ignore
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
	copyAvailableFields(destinationObj?: any, originObj?: any) {
		if (!destinationObj || !originObj) return;
		for (const key in originObj) {
			if (originObj.hasOwnProperty(key)) {
				// Verifica si la propiedad es un objeto
				if (typeof originObj[key] === 'object' && originObj[key] !== null) {
					// Si es un objeto, llama recursivamente a la función copiarObjeto
					obj.copyAvailableFields(destinationObj[key], originObj[key]);
				} else {
					// Si no es un objeto, simplemente copia el valor
					destinationObj[key] = originObj[key];
				}
			}
		}
	},
	isArray(obj: [object, any[]]) {
		if (!obj) return false;
		if (typeof obj !== 'object') return false;
		return obj.constructor === Array;
	},
	getObjKey(obj: any, key: string): any {
		return obj[key];
	},
	getValueByKey(obj: any, key: string): any {
		return obj[key];
	},
	objsAreTheSame(obj1: object, obj2: object) {
		for (const key in obj1) {
			if (this.getKeyValue(obj1, key) != this.getKeyValue(obj2, key)) return false;
		}
		for (const key in obj2) {
			if (this.getKeyValue(obj1, key) != this.getKeyValue(obj2, key)) return false;
		}
		return true;
	},
	pascalToCamelCase(obj: object) {
		for (let [key, value] of Object.entries(obj)) {
			if (typeof value === 'object' && value) {
				this.pascalToCamelCase(value);
			}
			this.renameKey(obj, key, qmStr.pascalToCamelCase(key));
		}
	},
	snakeToCamelCase(obj: object) {
		for (let [key, value] of Object.entries(obj)) {
			if (typeof value === 'object' && value) {
				this.snakeToCamelCase(value);
			}
			this.renameKey(obj, key, qmStr.snakeToCamelCase(key));
		}
	},
	camelToSnakeCase(obj: object) {
		for (let [key, value] of Object.entries(obj)) {
			if (typeof value === 'object' && value) {
				this.camelToSnakeCase(value);
			}
			this.renameKey(obj, key, qmStr.camelToSnakeCase(key));
		}
	},
	qoIsObjEmpty(obj: object = {}) {
		return obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype;
	},
	renameKey(obj: object, oldKey: string, newKey: string) {
		// @ts-ignore
		if (typeof obj[oldKey] === 'undefined') return;
		if (oldKey === newKey) return;
		// @ts-ignore
		Object.defineProperty(obj, newKey, Object.getOwnPropertyDescriptor(obj, oldKey));
		// @ts-ignore
		delete obj[oldKey];
	},
	setValueByKey(obj: object, key: string, value: any) {
		// @ts-ignore
		obj[key] = value;
	},
}; // export default

export default obj;
