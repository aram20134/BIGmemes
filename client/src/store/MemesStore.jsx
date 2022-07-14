import {makeAutoObservable} from 'mobx'

export default class MemesStore {
    constructor() {
        this._memes = []
        this._types = []
        makeAutoObservable(this)
    }
    setMemes(memes) {
        this._memes = memes
    }
    setTypes(types) {
        this._types = types
    }
    get memes() {
        return this._memes
    }
    get types() {
        return this._types
    }
}