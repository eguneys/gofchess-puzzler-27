import { createContext, type JSX, useContext } from "solid-js"
import { createMain, type MainActions, type MainState } from "./main_store"

export const useState = () => useContext(Context)!

const Context = createContext<Store>()

type State = {
    main: MainState
}

type Actions = {
    main_actions: MainActions
}

export type Store = [State, Actions]



export const Provider = (props: { children: JSX.Element }) => {

    const [main, main_actions] = createMain()

    const state = {
        main,
    }

    const actions = {
        main_actions
    }

    const store: Store = [state, actions]

    return <Context.Provider value={store}>
        {props.children}
    </Context.Provider>
}