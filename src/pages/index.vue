<script setup lang="ts">
import { useTag } from '~/composable/tags'

const refA = storeToRefs(
  defineStore(
    'danbooru-tags',
    () => {
      const words = ref<string>('')

      return { words }
    },
    {
      persist: { storage: persistedState.sessionStorage },
    },
  )(),
).words

const refC = ref<string[]>([])

watch(
  refA,
  (newValue, oldValue) => {
    refC.value =
      newValue
        ?.split(' ')
        .map((str) =>
          str
            .replaceAll('_', ' ')
            .replaceAll(/([()])/g, (substring, ...args) => `\\${args[0]}`),
        )
        .filter((str) => str.length) ?? []
  },
  { immediate: true },
)

watch(
  refC,
  (newValue, oldValue) => {
    const tmp = newValue
      .map((str) =>
        str
          .replaceAll(' ', '_')
          .replaceAll(/\\([()])/g, (substring, ...args) => args[0]),
      )
      .join(' ')
    if (refA.value.trim() !== tmp) {
      refA.value = tmp
    }
  },
  { deep: true },
)

const computedB = computed(() => {
  return [...refC.value]
})

const conputedTaginfos = computed(() => {
  return computedB.value.map((str) => {
    const store = useTag(str)

    return store.refTaginfo.attributes.join(',')
  })
})

watch(computedB, (newValue, oldValue) => {
  newValue.forEach((str, index) => {
    refC.value[index] = str
  })
})

const sort = () => {
  refA.value = refA.value?.split(' ').sort().join(' ')
}

const mounted = ref(false)

onMounted(() => {
  mounted.value = true

  refA.value = `${refA.value}`
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
      <template v-for="(value, index) in refC" :key="index">
        <input type="text" v-model="refC[index]" class="w-[30%] flex-grow" />
        <div class="w-[60%] flex-grow">
          <span>{{ conputedTaginfos[index] }}</span
          ><NuxtLink class="border rounded" :to="`./tags/${value}`"
            >edit</NuxtLink
          >
        </div>
      </template>
    </div>
  </div>
</template>
