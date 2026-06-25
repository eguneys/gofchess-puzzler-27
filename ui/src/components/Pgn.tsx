import { For, Show } from "solid-js";

export default function Pgn(props: { first_black: boolean, sans: string[], i_hidden_after: number }) {

    const first_move_as_black = (i: number) => i === 0 && props.first_black
    const whites_move = (i: number) => props.first_black ? i % 2 === 1 : i % 2 === 0

    const ply_index_with_dots = (i: number) => {
        if (first_move_as_black(i)) {
            return `1...`
        }
        if (whites_move(i)) {
            return `${Math.ceil(i / 2 + 1)}.`
        }
    }

    return (<>
        <div class='pgn'>
            <For each={props.sans}>{(san, i) =>
                <span class='san' classList={{ hidden: props.i_hidden_after <= i() }}>
                    <Show when={first_move_as_black(i()) || whites_move(i())}>
                        <span class='index'>{ply_index_with_dots(i())}</span>
                    </Show>
                    {san}</span>
            }</For>
        </div>
    </>)
}