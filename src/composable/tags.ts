import { defineStore } from 'pinia'

export const useTagList = () => (defineStore('tag-list', () => {
    const refTagList = ref({
        version: 2,
        tags: [] as string[],
    })

    return { refTagList }
}, {
    persist: {
        storage: persistedState.localStorage,
    },
}))()

export const useTag = (tagname: string) => {
    const tagListStore = useTagList()
    if (tagListStore.refTagList.tags.find(str => str === tagname) === undefined) {
        tagListStore.refTagList.tags = [...tagListStore.refTagList.tags, tagname]
    }

    const useStore = defineStore(
        `tags/${tagname}`,
        () => {
            const refTaginfo = ref({
                version: 2,
                discription: '',
                attributes: [] as string[],
            })

            const appendAttr = (str: string) => {
                refTaginfo.value.attributes = [...refTaginfo.value.attributes, str]
            }

            const deleteAttr = (index: number) => {
                refTaginfo.value.attributes = [...refTaginfo.value.attributes.slice(0, index), ...refTaginfo.value.attributes.slice(index + 1)]
            }

            return { refTaginfo, appendAttr, deleteAttr }
        },
        {
            persist: {
                storage: persistedState.localStorage,
            },
        },
    )

    const store = useStore()

    if (store.refTaginfo.version === 1) {
        store.refTaginfo.discription = ''
        store.refTaginfo.version = 2
    }

    return store
}
