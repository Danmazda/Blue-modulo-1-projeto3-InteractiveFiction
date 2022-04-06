import * as f from "./functions.js";
import { highlight } from "./functions.js";
import * as ob from "./objects.js";
// * Pode Rodar esse arquivo com npm start
f.title("DON'T BORE YOURSELF TO DEATH");
let res;
//Se quiser jogar de novo o jogo reseta
while (res != "N") {
  let State = { ...ob.State };
  let Scenes = [...ob.Scenes];
  let passedScenes = [];
  f.dialog(
    "Você é um jovem que nasceu com uma condição rara: Ao ficar com muito tédio você explode! E pra piorar sua situação tem q ir de ônibus pra São Paulo visitar seus parentes, mas acabou vendo o horário errado, chegou na rodoviária interestadual Meio dia, mas o ônibus pra São Paulo chega meia noite. Faça suas escolhas sabiamente e tente não explodir."
  );
  //Jogo em si
  do {
    //Cenas que não atendem os requisitos são deletadas
    //Cenas alternativas podem ser adicionadas
    Scenes = f.SceneHandler(State, Scenes, passedScenes);
    // Cena escolhida
    const choice = await f.drawAndGetChoices(Scenes);
    if (State.bathroom && choice.choice != "Ir ao banheiro") {
      f.GameOver(State.bathroom);
      break;
    }
    passedScenes.push(choice);
    await f.setState(State, choice, passedScenes);
    highlight(choice.text);
    if (State.boredom >= 100) {
      f.GameOver();
      break;
    }
    if (State.time > 120) {
      f.GameWin();
    }
    State.boredom += 10;
    State.time += 10;
  } while (State.time <= 120);

  res = await f.getRes();
}
