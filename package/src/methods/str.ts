const qmStr = {
	// capitalize
	// checkContainsStr (ex qoStrContains)
	// cleanStr (ex qoCleanStr)
	// getRandomStr (ex getRandomCode)
	// hexToRGBA (ex qoHexToRGBA)
	// padZeros (ex pad)
	// passDecode (ex decodePass)
	// passEncode (ex encodePass)
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
	getRandomHexColor() {
		return Math.floor(Math.random() * 16777215).toString(16);
	},
	getRandomStr(length = 10) {
		let result = '';
		// I and l are removed - O and 0 are removed
		const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz123456789';
		const charactersLength = characters.length;
		for (let i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	},
	hexToRGBA(hex: string, alpha: number) {
		const r = parseInt(hex.slice(1, 3), 16);
		const g = parseInt(hex.slice(3, 5), 16);
		const b = parseInt(hex.slice(5, 7), 16);
		if (alpha) return `rgba(${r}, ${g}, ${b}, ${alpha})`;
		return `rgb(${r}, ${g}, ${b})`;
	},
	padZeros(num: number, size: number = 2) {
		// 6 -> 06 | 14 -> 14 | 177 -> 177 | 2.345 -> 02.345
		const isNegative = num < 0;
    const [integerPart, decimalPart] = Math.abs(num).toString().split('.');
    const paddedInteger = integerPart.padStart(size, '0');
    const result = decimalPart ? `${paddedInteger}.${decimalPart}` : paddedInteger;
    return isNegative ? `-${result}` : result;
	},
	pascalToCamelCase(str: string) {
		if (str === 'ID') return 'id';
		let res = str.charAt(0).toLowerCase() + str.slice(1);
		const lastTwoChars = res.slice(res.length - 2);
		if (lastTwoChars === 'ID') {
			res = `${res.slice(0, res.length - 2)}Id`;
		}
		return res;
	},
	snakeToCamelCase(str: string) {
		const strArray = str.split('_');
		let res = strArray[0];
		for (let i = 1; i < strArray.length; i++) {
			res += strArray[i].charAt(0).toUpperCase() + strArray[i].slice(1);
		}
		return res;
	},
	camelToSnakeCase(str: string) {
		return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
	},
	passDecode(pass: string) {
		if (!pass) return '';
		const codifierNum = 7;
		let finalPass = '';
		const passSplited = pass.split('-');
		[...passSplited].forEach(codedChar => {
			finalPass += String.fromCharCode(+codedChar - codifierNum);
		});
		return finalPass;
	},
	passEncode(pass: string) {
		// let passChars =
		if (!pass) return '';
		const codifierNum = 7;
		let finalPass = '';
		[...pass].forEach(char => {
			finalPass += `${char.charCodeAt(0) + codifierNum}-`;
		});
		return finalPass.slice(0, -1);
	},
	removeDiacritics(str: string) {
		// Elimina los diacríticos de un texto excepto si es una "ñ" (ES6)
		return (
			str
				.normalize('NFD')
				// eslint-disable-next-line no-misleading-character-class
				.replace(/([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi, '$1')
				.normalize()
		);
	},
	removeWhiteSpaces(str: string) {
		if (!str) return str;
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
