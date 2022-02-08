export default {
  methods: {
    // arrayToText
    // getRandomElementOfArray
    // hexToRGBA (ex qoHexToRGBA)
    // removeOfArray (ex qoRemoveOfArray)
    // removeOfArrayById (qoRemoveOfArrayById)
    // replaceInList (ex qoReplaceInList)

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
    getRandomElementOfArray(arr: any[]) {
      return arr[Math.floor(Math.random() * arr.length)];
    },
    hexToRGBA(hex: string, alpha: number) {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      if (alpha) return `rgba(${r}, ${g}, ${b}, ${alpha})`;
      return `rgb(${r}, ${g}, ${b})`;
    },
    removeOfArray(list: any[], findFunction: () => number) {
      if (!list || !findFunction) return;
      const index = list.findIndex(findFunction);
      if (index === -1) return;
      list.splice(index, 1);
    },
    removeOfArrayById(list: object[], id: number) {
      const index = list.findIndex(i => i.id === id);
      if (index === -1) return;
      list.splice(index, 1);
    },
    replaceInList(arr: object[], NewItem: object, prop: string = 'id') {
      if (!NewItem) return;
      const index = arr.findIndex(i => i[prop] === NewItem[prop]);
      if (index !== -1) arr.splice(index, 1, NewItem);
    },
    sort(arr: object[], keys: [String, any[]]) {
      // sort array of objects
      // keys can be: 'key' | [key, 'DESC'] | [[key1, 'ASC'], key2, [key3, 'DESC']
      if (typeof keys === 'string') keys = [keys];
      if (keys.length === 2) {
        if (keys[1] === 'DESC' || keys[1] === 'ASC') {
          keys = [keys];
        }
      }
      const finalKeys = [];
      keys.forEach(key => {
        if (typeof key === 'string') key = [key];
        if (typeof key[1] === 'undefined') key[1] = 'ASC';
        finalKeys.push(key);
      });
      // now keys is somthing like [[key1, 'DESC'], [key2], [key3], [key4, 'DESC'])
      return arr.sort((a, b) => {
        let value = 0;
        finalKeys.forEach(([key, order]) => {
          if (!value) {
            const mult = order === 'DESC' ? -1 : +1;
            if (a[key] < b[key]) value = -1 * mult;
            if (a[key] > b[key]) value = +1 * mult;
          }
        });
        return value;
      });
    },
  }, // methods
}; // export default