import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const reg = async (email, password, name) => {
    const {data} = await $host.post('api/user/reg', {email, password, name})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const log = async (email, password) => {
    const {data} = await $host.post('api/user/log', {email, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/check' )
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const getUsers = async () => {
    const {data} = await $host.get('api/user/users' )
    return data
}

export const getUserName = async (name) => {
    const {data} = await $host.get('api/user/name', {
        params: {
            name:name
        }
    })
    return data
}

export const getUserId = async (id) => {
    const {data} = await $host.get('api/user/id', {
        params: {
            id:id
        }
    })
    return data
}

export const changeUserName = async (id, name) => {
    const {data} = await $authHost.post('api/user/changeusername', {
        id,
        name
    })
    return data
}