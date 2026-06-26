import { createStore } from "solid-js/store"
import { captureTheQueen, type Goal, type Style } from "./types"
import { makePersisted } from "@solid-primitives/storage"
import { createMemo, createSignal } from "solid-js"
import { default_puzzle, fetch_puzzle_slice, type Puzzle } from "./puzzles"
import { createAsync } from "@solidjs/router"

export type MainState = {
    selected_goal: Goal
    selected_style: Style
    subtitle_list_open: boolean
    selected_puzzle: Puzzle
    nb_selected_style_length: number
}

export type MainActions = {
    set_fetch_selected_puzzle(): void
    set_selected_style(_: Style): void
    set_subtitle_list_open(v: boolean): void
}

export function createMain(): [MainState, MainActions] {

    const [subtitle_list_open, set_subtitle_list_open] = createSignal(true)

    const [store, set_store] = makePersisted(createStore({
        selected_goal_name: captureTheQueen.name,
        selected_style_label: captureTheQueen.styles[0].label,
    }))

    const selected_goal = createMemo(() => captureTheQueen)
    const selected_style = createMemo(() => selected_goal().styles.find(_ => _.label === store.selected_style_label)!)

    const puzzles = createAsync(async () => fetch_puzzle_slice(selected_style().slice))

    const [fetch_selected_puzzle, set_fetch_selected_puzzle] = createSignal(undefined, { equals: false })

    const selected_puzzle = createMemo(() => {
        fetch_selected_puzzle()
        const list = puzzles()
        if (!list) {
            return default_puzzle
        }
        return list[Math.floor(Math.random() * list.length)]
    })

    let state = {
        get nb_selected_style_length() {
            return puzzles()?.length ?? 0
        },
        get selected_puzzle() {
            return selected_puzzle()
        },
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
        set_fetch_selected_puzzle() {
            set_fetch_selected_puzzle()
        },
        set_subtitle_list_open(v: boolean) {
            set_subtitle_list_open(v)
        },
        set_selected_style(style: Style) {
            set_store('selected_style_label', style.label)
        }
    }

    return [state, actions]
}
