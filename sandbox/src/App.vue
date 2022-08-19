<script setup lang="ts">
import ArrayTesting from './components/dateTesting/ArrayTesting.vue'
import DateTesting from './components/dateTesting/DateTesting.vue'
import HelloWorld from './components/HelloWorld.vue'
import { qmStr } from 'quantic-methods';

console.log(qmStr.reverseString('Hola, soy Lisandro'));
</script>

<template>
<img alt="Vue logo" src="./assets/logo.png" />
<ArrayTesting/>
<DateTesting/>
<!-- <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" /> -->
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
