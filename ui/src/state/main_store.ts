import { createStore } from "solid-js/store"
import { captureTheQueen, type Goal, type Style } from "./types"
import { makePersisted } from "@solid-primitives/storage"
import { createMemo, createSignal } from "solid-js"

export type MainState = {
    selected_goal: Goal
    selected_style: Style
    subtitle_list_open: boolean
}

export type MainActions = {
    set_selected_style(_: Style): void
    set_subtitle_list_open(v: boolean): void
}

export function createMain(): [MainState, MainActions] {

    const [subtitle_list_open, set_subtitle_list_open] = createSignal(false)

    const [store, set_store] = makePersisted(createStore({
        selected_goal_name: captureTheQueen.name,
        selected_style_label: captureTheQueen.styles[0].label,
    }))

    const selected_goal = createMemo(() => captureTheQueen)
    const selected_style = createMemo(() => selected_goal().styles.find(_ => _.label === store.selected_style_label)!)

    let state = {
        get subtitle_list_open() {
            return subtitle_list_open()
        },
        get selected_goal() {
            return selected_goal()
        },
        get selected_style() {
            return selected_style()
        }
    }

    let actions = {
        set_subtitle_list_open(v: boolean) {
            set_subtitle_list_open(v)
        },
        set_selected_style(style: Style) {
            set_store('selected_style_label', style.label)
        }
    }

    return [state, actions]
}