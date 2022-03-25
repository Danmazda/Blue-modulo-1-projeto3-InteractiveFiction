import * as f from "./functions.js";
import * as ob from "./objects.js";
import random from "random";

f.warn("DON'T BORE YOURSELF TO DEATH");
// const randomScenes = [1, 2, 3];
// let chance;
let res;
//Se quiser jogar de novo o jogo reseta
while (res != "N") {
  //Estado do jogador
  let { State, Scenes } = ob;
  f.dialog(
    "Você é um jovem que nasceu com uma condição rara: Ao ficar com muito tédio você explode! E pra piorar sua situação tem q ir de ônibus pra São Paulo visitar seus parentes, mas acabou vendo o horário errado, chegou na rodoviária interestadual Meio dia, mas o ônibus pra São Paulo chega meia noite. Faça suas escolhas sabiamente e tente não explodir."
  );

  //Jogo em si
  do {
    //Cenas que não atendem os requisitos são deletadas
    //Cenas alternativas podem ser adicionadas
    Scenes = f.SceneHandler(State, Scenes);
    // Cena escolhida
    const choice = await f.drawAndGetChoices(Scenes);
    f.setState(State, choice);
    choice.onChoice();
    if (State.boredom >= 100) {
      f.GameOver();
      break;
    }
    State.boredom += 10;
    if (State.time > 120) {
      f.GameWin();
    }
    State.time += 1;
    console.log(State);
  } while (State.time <= 120);

  res = await f.getRes();
}

//Funções do jogo
