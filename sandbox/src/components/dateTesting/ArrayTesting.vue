<script setup lang="ts">
import { ref } from 'vue';
import { qmArray } from 'quantic-methods';

const testText = ref('');

function validateTest() {
  console.log('valido');
  const res = qmArray.validateFields([
    [testText.value, 'Está vacío'],
  ]);
  console.log('res', res);
}
</script>

<template lang="pug">
input(v-model="testText" label="Is text empty?")
button(@click="validateTest()")
  | Validate
</template>