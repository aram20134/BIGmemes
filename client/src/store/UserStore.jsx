import {makeAutoObservable} from 'mobx'

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._user = {}
        this._memes = []
        makeAutoObservable(this)
    }
    setIsAuth(bool) {
        this._isAuth = bool
    }
    setUser(user) {
        this._user = user
    }
    setUserMemes(memes) {
        this._memes = memes
    }
    get userMemes() {
        return this._memes
    }
    get isAuth() {
        return this._isAuth
    }
    get user() {
        return this._user
    }
}