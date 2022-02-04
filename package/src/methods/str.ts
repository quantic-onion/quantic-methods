const qmStr = {
  // capitalize
  // checkContainsStr (ex qoStrContains)
  // cleanStr (ex qoCleanStr)
  // padZeros (ex pad)
  // removeDiacritics
  // removeWhiteSpaces
  // reverseString

  capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  },
  checkContainsStr(str: string, subStr: string) {
    str = qmStr.cleanStr(str);
    subStr = qmStr.cleanStr(subStr);
    return str.includes(subStr);
  },
  cleanStr(str: string) {
    if (!str) return '';
    str = qmStr.removeWhiteSpaces(str);
    str = qmStr.removeDiacritics(str);
    str = str.toLowerCase();
    return str;
  },
  padZeros(num: number, size: number = 2) {
    // 16 -> 016 | 9 -> 009 | 177 -> 177
    return (`000000000${num}`).substr(-size);
  },
  removeDiacritics(str: string) {
    // Elimina los diacríticos de un texto excepto si es una "ñ" (ES6)
    return str
      .normalize('NFD')
      // eslint-disable-next-line no-misleading-character-class
      .replace(/([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi, '$1')
      .normalize();
  },
  removeWhiteSpaces(str: string) {
    str = str.trim(); // delete start and final whitespace
    str = str.replace(/\s\s+/g, ' '); // replace multiple whitespace with one
    return str;
  },
  reverseString(str: string) {
    str = String(str);
    // Step 1. Use the split() method to return a new array
    const splitString = str.split(''); // var splitString = "hello".split("");
    // ["h", "e", "l", "l", "o"]

    // Step 2. Use the reverse() method to reverse the new created array
    // var reverseArray = ["h", "e", "l", "l", "o"].reverse();
    const reverseArray = splitString.reverse();
    // ["o", "l", "l", "e", "h"]

    // Step 3. Use the join() method to join all elements of the array into a string
    const joinArray = reverseArray.join(''); // var joinArray = ["o", "l", "l", "e", "h"].join("");
    // "olleh"

    // Step 4. Return the reversed string
    return joinArray; // "olleh"
  },
}; // qmStr

export default qmStr;