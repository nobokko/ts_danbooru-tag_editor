<script setup lang="ts">
const mounted = ref(false)

onMounted(() => {
  mounted.value = true
})
</script>

<template>
  <div class="flex flex-col gap-y-1">
    <div v-if="!mounted">loading...</div>
  </div>
</template>
