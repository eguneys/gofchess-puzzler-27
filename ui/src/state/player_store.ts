import { createStore } from "solid-js/store"
import type { Puzzle } from "./puzzles"
import type { Dests, Key } from "@lichess-org/chessground/types"
import { makeFen, parseFen } from "chessops/fen"
import { Chess, opposite, parseUci, type Color, type Move } from "chessops"
import { batch, createEffect, createMemo, on, type Accessor } from "solid-js"
import { square } from "chessops/debug"
import { createWritableMemo } from "@solid-primitives/memo"
import { makeSan } from "chessops/san"

export type PlayerState = {
    fen: string
    id: string
    dests?: Dests
    orientation: Color
    last_move?: Move
    mark_correct: Move | undefined
    mark_solved: boolean
    mark_incorrect: Move | undefined
    solution_sans: string[]
    i_hidden_after: number
}

export type PlayerActions = {
    on_move: (orig: Key, dest: Key) => void
}

type PuzzlePlayerStore = {
    mark_correct: Move | undefined
    mark_solved: boolean
    mark_incorrect: Move | undefined
}

export function createPuzzlePlayer(puzzle: Accessor<Puzzle>, jump_to_next_puzzle: () => void): [PlayerState, PlayerActions] {
    console.log(puzzle())

    const moves = createMemo(() => puzzle().moves.split(' '))
    const first_move = createMemo(() => moves()[0])
    const solution_moves = createMemo(() => moves().slice(1))

    const original_pos = createMemo(() => Chess.fromSetup(parseFen(puzzle().fen).unwrap()).unwrap())

    const solution_fens = createMemo(() => {
        const result: string[] = []
        const position = original_pos().clone()
        position.play(parseUci(first_move())!)
        for (let move of solution_moves()) {
            position.play(parseUci(move)!)
            result.push(makeFen(position.toSetup()))
        }

        return result
    })
    const solution_sans = createMemo(() => {
        const result: string[] = []
        const position = original_pos().clone()
        result.push(makeSan(position, parseUci(first_move())!))
        position.play(parseUci(first_move())!)
        for (let move of solution_moves()) {
            result.push(makeSan(position, parseUci(move)!))
            position.play(parseUci(move)!)
        }

        return result
    })

    const id = createMemo(() => puzzle().id)
    const [fen, set_fen] = createWritableMemo(() => puzzle().fen)

    const [last_move, set_last_move] = createWritableMemo<Move | undefined>(() => {
        puzzle()
        return undefined
    })

    const [store, set_store] = createStore<PuzzlePlayerStore>({
        mark_correct: undefined,
        mark_solved: false,
        mark_incorrect: undefined
    })

    const pos = createMemo(() => Chess.fromSetup(parseFen(fen()).unwrap()).unwrap())

    const dests = createMemo(() => {
        if (pos().turn === original_pos().turn) {
            return undefined
        }
        let res: Dests = new Map()
        for (let [sq, dests] of pos().allDests()) {
            let key = square(sq) as Key

            let keys: Key[] = []

            for (let dest of dests) {
                keys.push(square(dest) as Key)
            }
            res.set(key, keys)
        }

        return res
    })

    let state = {
        get i_hidden_after() {
            const i = solution_fens().indexOf(fen())
            if (i === -1) {
                return 1
            }
            return i + 2
        },
        get solution_sans() {
            return solution_sans()
        },
        get mark_correct() {
            return store.mark_correct
        },
        get mark_incorrect() {
            return store.mark_incorrect
        },
        get mark_solved() {
            return store.mark_solved
        },
        get id() {
            return id()
        },
        get fen() {
            return fen()
        },
        get dests() {
            return dests()
        },
        get orientation() {
            return opposite(original_pos().turn)
        },
        get last_move() {
            return last_move()
        }
    }

    const set_mark_incorrect = (move?: Move) => {
        set_store('mark_incorrect', move)
    }

    const set_mark_correct = (move?: Move) => {
        set_store('mark_correct', move)
    }

    const is_fen_part_ofthe_solution = (fen: string) => {
        return solution_fens().includes(fen)
    }

    const get_next_solution_move_after_fen = (fen: string) => {
        let i = solution_fens().indexOf(fen)

        return moves()[i + 2]
    }

    const make_auto_move = (move: Move) => {
        pos().play(move)
        const new_fen = makeFen(pos().toSetup())
        batch(() => {
            set_fen(new_fen)
            set_last_move(move)
        })
    }

    const mark_solved = () => {
        set_store('mark_solved', true)
    }

    createEffect(on(puzzle, () => {
        begin_puzzle()
    }))

    let begin_puzzle_enter_id = 0
    async function begin_puzzle() {
        begin_puzzle_enter_id += 1
        const self_id = begin_puzzle_enter_id
        await delay(180)
        if (self_id !== begin_puzzle_enter_id) {
            return
        }
        const move = parseUci(first_move())!
        pos().play(move)
        const new_fen = makeFen(pos().toSetup())
        batch(() => {
            set_fen(new_fen)
            set_last_move(move)
        })
    }

    let actions = {

        async on_move(orig: Key, dest: Key) {
            const backup_fen = fen()
            const backup_last_move = last_move()!
            const move = parseUci(`${orig}${dest}`)!
            pos().play(move)
            const new_fen = makeFen(pos().toSetup())
            batch(() => {
                set_fen(new_fen)
                set_last_move(move)
            })

            if (is_fen_part_ofthe_solution(new_fen)) {
                set_mark_correct(move)
                await delay(600)
                set_mark_correct(undefined)

                const next_move = get_next_solution_move_after_fen(new_fen)

                if (next_move) {
                    make_auto_move(parseUci(next_move)!)
                } else {
                    mark_solved()
                    await delay(800)
                    jump_to_next_puzzle()
                }
            } else {
                set_mark_incorrect(move)
                await delay(500)
                set_mark_incorrect(undefined)

                batch(() => {
                    set_fen(backup_fen)
                    set_last_move(backup_last_move)
                })
            }
        }
    }

    function delay(delay: number) {
        return new Promise(resolve => setTimeout(resolve, delay))
    }

    return [state, actions]
}