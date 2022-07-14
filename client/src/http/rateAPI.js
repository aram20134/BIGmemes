import {$authHost, $host} from "./index";

export const addLike = async (userId, theMemeId) => {
    const {data} = await $authHost.post('api/rate', {userId, theMemeId})
    return data
}
export const delLike = async (userId, theMemeId) => {
    const {data} = await $authHost.post('api/rate/del', {userId, theMemeId})
    return data
}