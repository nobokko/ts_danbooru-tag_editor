<script setup lang="ts">
const refA = ref<string>('')

const computedB = computed(() => {
  return (
    refA.value
      ?.split(' ')
      .map((str) =>
        str.replaceAll('_', ' ').replaceAll('(', '\\(').replaceAll(')', '\\)'),
      )
      .filter((str) => str.length) ?? []
  )
})

const refC = ref<string[]>([])

watch(computedB, (newValue, oldValue) => {
  if (newValue.length !== oldValue.length) {
    refC.value = [...newValue]
  } else {
    newValue.forEach((str, index) => {
      refC.value[index] = str
    })
  }
})

const sort = () => {
    refA.value = refA.value?.split(' ').sort().join(' ')
}

const mounted = ref(false)

onMounted(() => {
  mounted.value = true
})
</script>

<template>
  <div class="flex flex-col gap-y-1">
    <div v-if="!mounted">loading...</div>
    <input type="text" v-model="refA" placeholder="input danbooru tags." />
    <div class="m-1 border rounded border-black p-1">
      {{ computedB.join(', ') }},
    </div>
    <div>total {{ computedB.length }} word(s).</div>
    <div><button @click="sort()">Sort</button></div>
    <div class="flex flex-row flex-wrap">
      <template v-for="(value, index) in computedB" :key="value">
        <input type="text" v-model="refC[index]" class="w-[30%] flex-grow" />
        <div class="w-[60%] flex-grow">{{ refC[index] }}</div>
      </template>
    </div>
  </div>
</template>
