<template>
<h1>Child</h1>
</template>

<script setup>
import {watch} from "vue";

const route = useRoute()
watch(route, () => {
  console.log(route.params)
})
</script>

<style scoped>

</style>