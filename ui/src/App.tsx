import { createMemo, For, type JSX, Show } from 'solid-js';
import './App.scss'
import { Chessboard } from './components/Chessboard'
import Pgn from './components/Pgn';
import { Provider, useState } from './state/State';
import { Chess, makeUci } from 'chessops';
import { makeSan } from 'chessops/san';
import { parseFen } from 'chessops/fen';
import { annotationShapes } from './components/annotationShapes';
import { A, Route, HashRouter } from '@solidjs/router';

function AppWrapper() {
  return (<>
    <Provider>
      <HashRouter root={Layout}>
        <Route path='/' component={App} />
      </HashRouter>
    </Provider>
  </>)
}

function Layout(props: { children?: JSX.Element }) {
  return (<>
    <header></header>
    <div class='main-wrap google-sans-flex-500'>{props.children}</div>
  </>)
}

function App() {


  const [{ main, player }, { player_actions: { on_move }, main_actions: { set_subtitle_list_open } }] = useState()

  const annotation = createMemo(() => {

    const position = Chess.fromSetup(parseFen(player.fen).unwrap()).unwrap()
    if (player.mark_correct !== undefined) {
      const uci = makeUci(player.mark_correct)
      const san = makeSan(position, player.mark_correct)
      return annotationShapes(uci, san, '✓')
    }
    if (player.mark_incorrect !== undefined) {
      const uci = makeUci(player.mark_incorrect)
      const san = makeSan(position, player.mark_incorrect)
      return annotationShapes(uci, san, '✗')
    }
  })

  return (
    <>

      <main class='layout'>
        <div class="board-wrap">
          <Chessboard shapes={annotation()} last_move={player.last_move} on_move={on_move} orientation={player.orientation} dests={player.dests} fen={player.fen} />
        </div>
        <div class="pgn-wrap">
          <div class='info'>

            <A href={`https://lichess.org/training/${player.id}`}>Lichess Puzzle: {player.id}</A>
            <h4 class='info-title'>Goal: {main.selected_goal.name}</h4>
            <h5 class='info-subtitle' onClick={() => set_subtitle_list_open(!main.subtitle_list_open)}>Style: {main.selected_style.description} ({main.nb_selected_style_length})</h5>
            <div class='info-subtitle-list'>
              <Show when={main.subtitle_list_open}>
                <SubtitleList />
              </Show>
            </div>
          </div>
          <span><span class='turn'>{player.orientation}</span> to move and <span class='goal'>{main.selected_goal.name}</span></span>
          <small> with a {main.selected_style.label}</small>
          <Pgn sans={player.solution_sans} first_black={player.orientation === 'white'} i_hidden_after={player.i_hidden_after} />
        </div>
      </main>
    </>
  );
}

export default AppWrapper

function SubtitleList() {

  const [{ main }, { main_actions: { set_selected_style, set_subtitle_list_open } }] = useState()

  return (<>
    <div class='subtitle-list'>
      <div class='list'>
        <For each={main.selected_goal.styles}>{style =>
          <div class='item' onClick={() => { set_selected_style(style); set_subtitle_list_open(false); }}>{style.label}</div>
        }</For>
      </div>
    </div>
  </>)
}