<script setup lang="ts">
import { ref } from 'vue';
import qmDate from '../../package-copy/date';
import ShowData from './components/ShowData.vue';

// const today = ref('');
// const todayMonth = ref('');
// const todayYear = ref('');
</script>

<template lang="pug">
div
  h1 Date testing
  //- ShowData(title="getDate()" :value="qmDate.getDate()")
  //- ShowData(title="getDate(qmDate.getDate())" :value="qmDate.getDate(qmDate.getDate())")
  //- ShowData(title="MonthNames (es)" :value="qmDate.getAllMonths('es')")
  //- ShowData(title="MonthNames" :value="qmDate.getAllMonths()")
  //- ShowData(title="DaysOfWeek (es)" :value="qmDate.getAllDaysOfWeek('es')")
  //- ShowData(title="DaysOfWeek (es, monday first)" :value="qmDate.getAllDaysOfWeek('es', { mondayFirst: true })")
  //- ShowData(title="DaysOfWeek" :value="qmDate.getAllDaysOfWeek()")
  //- ShowData(title="Current MonthNum" :value="qmDate.getMonthNum()")
  //- ShowData(title="Specific MonthNum" :value="qmDate.getMonthNum('2018-07-24')")
  //- ShowData(title="Current MonthName" :value="qmDate.getMonthName()")
  //- ShowData(title="Specific MonthName" :value="qmDate.getMonthName('2018-07-24')")
  //- ShowData(title="DateIsNewer a < b" :value="qmDate.dateIsNewer('2018-01-01', '2021-01-01')")
  //- ShowData(title="DateIsNewer a = b" :value="qmDate.dateIsNewer('2022-01-01', '2022-01-01')")
  //- ShowData(title="DateIsNewer a > b" :value="qmDate.dateIsNewer('2010-01-01', '1999-01-01')")
  ShowData(title="timeIsNewer a < b" :value="qmDate.timeIsNewer('03:45:05', '10:30:10')")
  ShowData(title="timeIsNewer a = b" :value="qmDate.timeIsNewer('10:30:10', '10:30:10')")
  ShowData(title="timeIsNewer a > b" :value="qmDate.timeIsNewer('11:30:10', '11:10:05')")
  ShowData(title="datetimeIsNewer a < b" :value="qmDate.datetimeIsNewer('2018-01-01 03:45:05', '2021-01-01 10:30:10')")
  ShowData(title="datetimeIsNewer a = b" :value="qmDate.datetimeIsNewer('2022-01-01 03:45:05', '2022-01-01 03:45:05')")
  ShowData(title="datetimeIsNewer a > b" :value="qmDate.datetimeIsNewer('2024-11-30 11:45:10', '2024-10-27 11:45:10')")
  ShowData(title="datetimeIsNewer a > b" :value="qmDate.datetimeIsNewer('2024-11-30 11:45:10', '2024-11-30 10:00:10')")
  //- ShowData(title="isSameDate a = b" :value="qmDate.isSameDate('2024-12-01', '2024-12-01')")
  //- ShowData(title="isSameDate a != b" :value="qmDate.isSameDate('2024-10-01', '2024-12-01')")
  //- ShowData(title="datetimeIsNewer a > b" :value="qmDate.datetimeIsNewer('2024-12-01 10:30:10', '2024-12-01 02:30:10')")
  //- ShowData(title="Minutes of day" :value="qmDate.getMinutesOfDay()")
  //- ShowData(title="Días de diferencia" :value="qmDate.datesDifferenceInDays('2016-06-21', '2016-06-04')")
  //- ShowData(title="Días de diferencia" :value="qmDate.datesDifferenceInDays('2016-06-04', '2016-06-21')")
  //- ShowData(title="Current date" :value="qmDate.getDate()")
  //- ShowData(title="Date 2016-06-04'" :value="qmDate.getDate('2016-06-04')")
  //- ShowData(title="Tomorrow date" :value="qmDate.getDate({ days: +1 })")
  //- ShowData(title="3 days ago date" :value="qmDate.getDate({ days: -3 })")
  //- ShowData(title="Current date presented" :value="qmDate.presentDate()")
  //- ShowData(title="Date '2022-05-31'" :value="qmDate.presentDate('2022-05-31')")
  //- //- ShowData(title="Date '24-04-2022'" :value="qmDate.presentDate('24-04-2022')")
  //- ShowData(title="Current time" :value="qmDate.getTime()")
  //- ShowData(title="Current time presented" :value="qmDate.presentTime()")
  //- ShowData(title="Current datetime" :value="qmDate.getDatetime()")
  //- ShowData(title="Date present to DB" :value="qmDate.dateToDb('17/06/2022')")
  //- ShowData(title="From datetime SQL" :value="qmDate.presentDate('2022-05-07T08:52:04.821-03:00')")
  //- ShowData(title="Date present to DB" :value="qmDate.presentTime('2022-05-10T11:13:51.832-03:00')")
</template>
  