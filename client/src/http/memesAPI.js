import {$authHost, $host} from "./index";

export const create = async (meme) => {
    const {data} = await $authHost.post('api/memes', meme)
    return data
}

export const getAll = async (offset, limit) => {
    const {data} = await $host.get('api/memes', {
        params: {
            offset,
            limit
        }
    })
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