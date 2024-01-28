<script setup lang="ts">
const route = useRoute()
const tagname = ((tagname: string | string[]) =>
  typeof tagname === 'string' ? tagname : tagname.join('/'))(
  route.params.tagname,
)

const mounted = ref(false)

onMounted(() => {
  mounted.value = true
})
</script>

<template>
  <div class="flex flex-col gap-y-1">
    <div v-if="!mounted">loading...</div>
    <h1>{{ tagname }}</h1>
  </div>
</template>
