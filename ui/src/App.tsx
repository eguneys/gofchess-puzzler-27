import { For, Show } from 'solid-js';
import './App.scss'
import { Chessboard } from './components/Chessboard'
import Pgn from './components/Pgn';
import { Provider, useState } from './state/State';

function AppWrapper() {
  return (<>
    <Provider>
      <App />
    </Provider>
  </>)
}

function App() {


  const [{ main }, { main_actions: { set_subtitle_list_open } }] = useState()


  return (
    <>
      <header></header>
      <div class='main-wrap google-sans-flex-500'>
        <main class='layout'>
          <div class="board-wrap">
            <Chessboard fen="" />
          </div>
          <div class="pgn-wrap">
            <div class='info'>
              <h4 class='info-title'>Goal: {main.selected_goal.name}</h4>
              <h5 class='info-subtitle' onClick={() => set_subtitle_list_open(!main.subtitle_list_open)}>Style: {main.selected_style.description}</h5>
              <div class='info-subtitle-list'>
                <Show when={main.subtitle_list_open}>
                  <SubtitleList />
                </Show>
              </div>
            </div>
            <span>Black to move and <span class='goal'>{main.selected_goal.name}</span></span>
            <small> with a {main.selected_style.label}</small>
            <Pgn />
          </div>
        </main>
      </div>
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