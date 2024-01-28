import { defineStore } from 'pinia'

export const useTag = (tagname: string) => {
    const useStore = defineStore(
        `tags/${tagname}`,
        () => {
            const refTaginfo = ref({
                version: 1,
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

    return useStore()
}
