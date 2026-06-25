import { createContext, type JSX, useContext } from "solid-js"
import { createMain, type MainActions, type MainState } from "./main_store"
import { createPuzzlePlayer, type PlayerActions, type PlayerState } from "./player_store"

export const useState = () => useContext(Context)!

const Context = createContext<Store>()

type State = {
    main: MainState
    player: PlayerState
}

type Actions = {
    main_actions: MainActions
    player_actions: PlayerActions
}

export type Store = [State, Actions]



export const Provider = (props: { children: JSX.Element }) => {

    const [main, main_actions] = createMain()

    const [player, player_actions] = createPuzzlePlayer(
        () => main.selected_puzzle,
        main_actions.set_fetch_selected_puzzle,
    )


    const state = {
        main,
        player,
    }

    const actions = {
        main_actions,
        player_actions
    }

    const store: Store = [state, actions]

    return <Context.Provider value={store}>
        {props.children}
    </Context.Provider>
}