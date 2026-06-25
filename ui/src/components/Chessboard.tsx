import { Chessground } from "@lichess-org/chessground"
import { createEffect, onMount } from "solid-js"
import '../assets/chessground/chessground.css'
import '../assets/chessground/maestro.css'
import '../assets/chessground/theme.css'
import './Chessboard.css'
import type { Api } from "@lichess-org/chessground/api"
import type { Config } from "@lichess-org/chessground/config"
import type { Color, Dests, Key } from "@lichess-org/chessground/types"
import type { DrawShape } from "@lichess-org/chessground/draw"
import { square } from "chessops/debug"


type FEN = string
type Move = any

export function Chessboard(props: { on_move?: (orig: Key, dest: Key) => void, dests?: Dests, fen: FEN, orientation?: Color, last_move?: Move, on_wheel?: (_: number) => void, shapes?: DrawShape[] }) {

    let ground: Api

    onMount(() => {

        let config: Config = {
            orientation: props.orientation,
            fen: props.fen,
            events: {
                move: props.on_move
            },
            movable: {
                free: false,
            }
        }
        if (props.last_move) {
            config.lastMove = [square(props.last_move.from) as Key, square(props.last_move.to) as Key]
        }
        ground = Chessground($el, config)

        if (props.shapes) {
            ground.setShapes(props.shapes)
        }
    })

    createEffect(() => {

        const orientation = props.orientation
        let fen = props.fen
        let lastMove
        if (props.last_move) {
            lastMove = [square(props.last_move.from) as Key, square(props.last_move.to) as Key]
        }

        const dests = props.dests

        if (!ground) {
            return
        }

        ground.set({ orientation, fen, lastMove, movable: { dests } })
    })

    createEffect(() => {
        let shapes = props.shapes
        if (!ground) {
            return
        }
        if (shapes) {
            ground.setShapes(shapes)
        } else {
            ground.setShapes([])
        }
    })

    let $el!: HTMLDivElement

    const handle_wheel_event = {
        handleEvent: (e: WheelEvent) => {
            props.on_wheel?.(e.deltaY)
        },
        passive: true
    }

    return (<>
        <div on:wheel={handle_wheel_event} ref={$el} class='is2d chessboard-wrap'></div>
    </>)
}