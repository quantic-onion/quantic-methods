<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <DateTesting/> -->
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" /> -->
</template>

<script setup lang="ts">
import DateTesting from './components/dateTesting/DateTesting.vue'
import HelloWorld from './components/HelloWorld.vue'
import { qmStr } from 'quantic-methods';

console.log(qmStr.reverseString('Hola, soy Lisandro'));
</script>

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
