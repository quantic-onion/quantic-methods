<template lang="pug">
div
  b {{ title }}
  |
  | {{ value }}
</template>

<script setup lang="ts">
const props = defineProps({
  title: { type: String, required: true },
  value: { type: [String, Array, Number, Boolean], required: true },
})
</script>