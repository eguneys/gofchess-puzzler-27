import type { MapKey } from "./puzzles"

export type Goal = {
    name: string
    styles: Style[]
}

export type Style = {
    goal: Goal
    label: string
    description: string
    slice: MapKey
}

function addStyle(goal: Goal, style: Style) {
    goal.styles.push({
        ...style,
        goal
    })
}

export const captureTheQueen: Goal = {
    name: 'Capture The Queen',
    styles: []
}

addStyle(captureTheQueen, {
    label: 'Knight Fork',
    description: 'Knight fork with check',
    goal: captureTheQueen,
    slice: 'capture_the_queen_knight_fork.csv'
})


addStyle(captureTheQueen, {
    label: 'Bishop Fork',
    description: 'Bishop fork with check',
    goal: captureTheQueen,
    slice: 'capture_the_queen_bishop_fork.csv'
})


/*
addStyle(captureTheQueen, {
    label: 'Pawn Fork',
    description: 'Pawn fork with check',
    goal: captureTheQueen,
    slice: 'capture_the_queen_pawn_fork.csv'
})
    */


addStyle(captureTheQueen, {
    label: 'Bishop skewer',
    description: 'Bishop skewer king and queen',
    goal: captureTheQueen,
    slice: 'capture_the_queen_bishop_skewer.csv'
})

addStyle(captureTheQueen, {
    label: 'Rook skewer',
    description: 'Rook skewer king and queen',
    goal: captureTheQueen,
    slice: 'capture_the_queen_rook_skewer.csv'
})

addStyle(captureTheQueen, {
    label: 'Queen skewer',
    description: 'Queen skewer king and queen',
    goal: captureTheQueen,
    slice: 'capture_the_queen_queen_skewer.csv'
})


addStyle(captureTheQueen, {
    label: 'Knight Discovery',
    description: 'Knight check with a discovered attack',
    goal: captureTheQueen,
    slice: 'capture_the_queen_knight_discovery.csv'
})


addStyle(captureTheQueen, {
    label: 'Bishop Discovery',
    description: 'Bishop check with a discovered attack',
    goal: captureTheQueen,
    slice: 'capture_the_queen_bishop_discovery.csv'
})


/*

addStyle(captureTheQueen, {
    label: 'Pawn Discovery',
    description: 'Pawn check with a discovered attack',
    goal: captureTheQueen,
    slice: 'capture_the_queen_pawn_discovery.csv'
})
    */