<script setup lang="ts">
import { useTag } from '~/composable/tags'

const route = useRoute()
const tagname = ((tagname: string | string[]) =>
  typeof tagname === 'string' ? tagname : tagname.join('/'))(
  route.params.tagname,
)

const store = useTag(tagname)

const mounted = ref(false)

onMounted(() => {
  mounted.value = true
})
</script>

<template>
  <div class="flex flex-col gap-y-1">
    <div v-if="!mounted">loading...</div>
    <h1>{{ tagname }}</h1>
    <input type="text" v-model="store.refTaginfo.discription" />
    <div v-for="(_attr, index) in store.refTaginfo.attributes" :key="index">
      <input
        class="border rounded"
        type="text"
        v-model="store.refTaginfo.attributes[index]"
      />
      <button @click="store.deleteAttr(index)">delete</button>
    </div>
    <button @click="store.appendAttr('')">add</button>
    <div>ver: {{ store.refTaginfo.version }}</div>
    <div>{{ store.refTaginfo }}</div>
  </div>
</template>
