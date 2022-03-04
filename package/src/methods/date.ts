import qmStr from './str';

export default {
  // minToHour

  minToHour(val: number) {
    // get minutes as int and return hour as string
    const isNegative = val < 0;
    val = Math.abs(val);
    let hour = Math.floor(val / 60);
    hour = (hour < 10 ? '0' : '') + hour;
    const min = qmStr.padZeros((+val % 60), 2);
    if (isNegative) hour = `-${hour}`;
    return `${hour}:${min}`;
  },
} // export default
