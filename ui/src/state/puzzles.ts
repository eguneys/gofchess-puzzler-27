import mapping_json from "../assets/mapping.json"

export type MapKey = keyof typeof mapping_json

export function fetch_puzzle_slice(src: MapKey) {
    return fetch(`puzzles/${mapping_json[src]}`).then(_ => _.text()).then(parse_csv)
}

export type Puzzle = {
    id: string,
    fen: string,
    moves: string
}

function parse_csv(csv: string) {
    return csv.split('\n').map(line => {
        let [id, fen, moves] = line.split(',')

        return { id, fen, moves }
    })
}

export const default_puzzle = (() => {
    let [id, fen, moves] = '00DTg,r2qk2r/1pp2ppp/p1pb1n2/4P3/3Q4/2N2b2/PPP2PPP/R1B2RK1 w KQkq - 0 1,e5f6 d6h2 g1h2 d8d4,https://lichess.org/training/00DTg'.split(',')
    return { id, fen, moves }
})()