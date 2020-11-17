import { makeAutoObservable } from 'mobx'
import { createContext } from 'react'

interface Fractal {
    uri: string
    config: Object
}

export class Store {    
    private _fractals: Array<Fractal> = []

    constructor() {
        makeAutoObservable(this)
    }
    
    get fractals() {
        return this._fractals
    }
}

export class UiStore {
    private _timeToDrawMs: number | null = null

    constructor() {
        makeAutoObservable(this)
    }
    
    get timeToDrawMs() {
        return this._timeToDrawMs
    }

    setTimeToDrawMs(ms: number | null) {
        this._timeToDrawMs = ms
    }
}

export const StoreContext = createContext({ store: new Store(), uiStore: new UiStore() })