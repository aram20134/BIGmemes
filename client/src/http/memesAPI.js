import {$authHost, $host} from "./index";

export const create = async (title, img, typeId, userId) => {
    const {data} = await $authHost.post('api/memes', {title, img, typeId, userId})
    return data
}

export const getAll = async () => {
    const {data} = await $host.get('api/memes')
    return data
}
export const getAllUser = async (id) => {
    const {data} = await $host.get('api/memes/memesuser', {
        params: {
            id: id
        }
    })
    return data
}

export const getOne = async (id) => {
    const {data} = await $host.get('api/memes/' + id)
    return data
}