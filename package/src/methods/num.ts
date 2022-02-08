import qmStr from './str';
export default {
  methods: {
    // getRandomInt
    // presentNum (ex qo_presentNum) [ - - - VER - - - ]
    // removeNoNumber
    // setPrice (ex qo_setPrice) [ - - - VER - - - ]
    // showPrice (ex qo_showPrice) [ - - - VER - - - ]
    // simplifyNum (ex qo_simplifyNum) [ - - - VER - - - ]
    
    getRandomInt(min: number, max: number) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    setPrice(num: number, { precision = 2 } = {}) {
      if (!num) return 0;
      return +parseFloat(num).toFixed(precision);
    },
    presentNum(num, forceDecimal = false) {
      // validate
      num = +num;
      let finalInt = '0';
      let decimal = '00';
      const isNegative = num < 0;
      const isValidNum = !(!num || !+num);
      if (isValidNum) {
        // add dots
        num = parseFloat(Math.abs(num)).toFixed(2);
        decimal = num.substring(num.length - 2, num.length);
        const int = num.substring(0, num.length - 3);
        const reversedInt = qmStr.reverseString(int);
        let reversedRealInt = '';
        for (let i = 0; i < reversedInt.length; i++) {
          reversedRealInt += reversedInt.charAt(i);
          if (i + 1 >= reversedInt.length) continue;
          if ((i + 1) % 3) continue;
          reversedRealInt += '.';
        }
        finalInt = qmStr.reverseString(reversedRealInt);
      }
      let finalValue = finalInt;
      if (isNegative) finalValue = `-${finalValue}`;
      if (forceDecimal || +decimal) {
        finalValue = `${finalValue},${decimal}`;
      }
      return finalValue;
    },
    removeNoNumber(str: string, isFloat = false) {
      let newStr = '';
      str = str.toString();
      for (let i = 0; i < str.length; i++) {
        if (str[i] == parseInt(str[i], 10)) {
          newStr += str[i];
        } else if ((isFloat && str[i] == ',') || (isFloat && str[i] == '.')) {
          newStr += '.';
          isFloat = false;
        }
      }
      return newStr;
    },
    showPrice(num: number, Extra = { hideIcon: false, currency: '$' }) {
      if (Extra.hideIcon !== true) Extra.hideIcon = false;
      let presentedNum = this.presentNum(num, true);
      const isNegative = presentedNum[0] === '-';
      if (isNegative) presentedNum = presentedNum.substring(1, presentedNum.length);
      // add extras
      if (!Extra.hideIcon) presentedNum = `${Extra.currency}${presentedNum}`;
      if (isNegative) presentedNum = `- ${presentedNum}`;
      return presentedNum;
    },
    simplifyNum(num: number) {
      // 7.0 -> 7
      // 3.4 -> 3,4
      if (!(num % 1)) return Math.floor(num);
      return this.presentNum(num);
    },
  }, // methods
}; // export default