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



addStyle(captureTheQueen, {
    label: 'Outright Hanging',
    description: 'Queen is outright hanging',
    goal: captureTheQueen,
    slice: 'capture_the_queen_immediate_hang_full_true.csv'
})

addStyle(captureTheQueen, {
    label: 'Outright Hanging II',
    description: 'Queen is outright hanging (longer version)',
    goal: captureTheQueen,
    slice: 'capture_the_queen_immediate_hang_true.csv'
})




addStyle(captureTheQueen, {
    label: 'Outright Hanging To Rook',
    description: 'Queen is outright hanging to rook',
    goal: captureTheQueen,
    slice: 'capture_the_queen_immediate_hang_capture_rook_full_true.csv'
})

addStyle(captureTheQueen, {
    label: 'Outright Hanging To Rook II',
    description: 'Queen is outright hanging to rook (longer version)',
    goal: captureTheQueen,
    slice: 'capture_the_queen_immediate_hang_capture_rook_true.csv'
})



addStyle(captureTheQueen, {
    label: 'Outright Hanging To Bishop',
    description: 'Queen is outright hanging to bishop',
    goal: captureTheQueen,
    slice: 'capture_the_queen_immediate_hang_capture_bishop_full_true.csv'
})

addStyle(captureTheQueen, {
    label: 'Outright Hanging To Bishop II',
    description: 'Queen is outright hanging to bishop (longer version)',
    goal: captureTheQueen,
    slice: 'capture_the_queen_immediate_hang_capture_bishop_true.csv'
})



addStyle(captureTheQueen, {
    label: 'Outright Hanging To Knight',
    description: 'Queen is outright hanging to knight',
    goal: captureTheQueen,
    slice: 'capture_the_queen_immediate_hang_capture_knight_full_true.csv'
})

addStyle(captureTheQueen, {
    label: 'Outright Hanging To Knight II',
    description: 'Queen is outright hanging to knight (longer version)',
    goal: captureTheQueen,
    slice: 'capture_the_queen_immediate_hang_capture_knight_true.csv'
})



addStyle(captureTheQueen, {
    label: "Can't Capture The Queen (Knight Fork)",
    description: 'Knight lands a fork, then rook checks the king',
    goal: captureTheQueen,
    slice: 'capture_the_queen_advanced_knight_cant_capture_full_true.csv'
})

addStyle(captureTheQueen, {
    label: "Can't Capture The Queen (Knight Fork) II",
    description: 'Knight lands a fork, then rook checks the king (longer version)',
    goal: captureTheQueen,
    slice: 'capture_the_queen_advanced_knight_cant_capture_full_first_move.csv'
})


addStyle(captureTheQueen, {
    label: "Knight Fork CTQ and defends own Queen",
    description: 'Knight lands a fork, captures the queen, defends the queen I',
    goal: captureTheQueen,
    slice: 'capture_the_queen_adv_knight_capture_continue_full_true.csv'
})

addStyle(captureTheQueen, {
    label: "Knight Fork CTQ and defends own Queen II",
    description: 'Knight lands a fork, captures the queen, defends the queen II',
    goal: captureTheQueen,
    slice: 'capture_the_queen_adv_knight_capture_continue_full_first_move.csv'
})

addStyle(captureTheQueen, {
    label: "Knight Fork CTQ and defends own Queen III",
    description: 'Knight lands a fork, captures the queen, defends the queen III',
    goal: captureTheQueen,
    slice: 'capture_the_queen_adv_knight_capture_continue_full_false.csv'
})



