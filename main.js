import * as f from "./functions.js";
import random from "random";
import { highlight } from "./functions.js";

// * Pode Rodar esse arquivo com npm start

f.title("DON'T BORE YOURSELF TO DEATH");
let res;
//Se quiser jogar de novo o jogo reseta
while (res != "N") {
  let State = {
    boredom: 0,
    time: 0,
    money: 30,
    phoneBattery: 100,
  };
  let Scenes = [
    {
      choice: "Esperar pacientemente",
      onChoice: function () {
        highlight(
          "Você tenta esperar pacientemente, só que para você falta a paciência... Parece que não foi uma boa escolha"
        );
      },
      time: 5,
      boredom: 50,
    },
    {
      choice: "Comprar Café",
      counter: 0,
      onChoice: function () {
        this.counter++;
        highlight(
          `Você gasta um pouco de dinheiro para comprar e tomar um cafézinho,que não dura muito tempo... pelo menos fez alguma coisa.`
        );
      },
      time: 5,
      money: 5,
      boredom: -10,
    },
    {
      choice: "Comprar revista",
      counter: 0,
      onChoice: function () {
        this.counter++;
        highlight(
          `Você gasta um pouco de dinheiro para comprar e tomar um cafézinho,que não dura muito tempo... pelo menos fez alguma coisa.`
        );
      },
      money: 15,
      boredom: -20,
      time: 20,
    },
    {
      choice: "Comprar Lanche",
      onChoice: function () {
        highlight(
          "Você compra uma coxinha que estava deliciosa, mas não durou muito, pelo menos está de barriga cheia"
        );
      },
      money: 10,
      boredom: -10,
      time: +10,
    },
    {
      choice: "Ir ao banheiro",
      counter: 0,
      onChoice: function () {
        this.counter++;
        highlight(
          `Você gasta um pouco de dinheiro para comprar e tomar um cafézinho,que não dura muito tempo... pelo menos fez alguma coisa.`
        );
      },
      time: 5,
      boredom: -5,
    },
    {
      choice: "Olhar as pessoas passando",
      onChoice: function () {
        highlight(
          "Você só olha o movimento à sua volta... nada acontece. Que chatice."
        );
      },
      time: 5,
      boredom: 50,
    },
    {
      choice: "Ver tiktok",
      onChoice: function () {
        highlight(
          "Você saca o celular e vê tiktok, entre dancinhas e vídeos de humor duvidoso você gasta bastante tempo... Mas a bateria já quase foi embora."
        );
      },
      time: 20,
      phoneBattery: -30,
      boredom: -20,
    },
    {
      choice: "Jogar no celular",
      onChoice: function () {
        highlight(
          "Você pega o celular e começa a jogar candy crush como bom gamer hardcore que você é, gasta muito tempo estourando docinhos até que suas vidas acabam."
        );
      },
      time: 20,
      phoneBattery: -70,
      boredom: -20,
    },
  ];
  //Estado do jogador
  let passedScenes = [];
  f.dialog(
    "Você é um jovem que nasceu com uma condição rara: Ao ficar com muito tédio você explode! E pra piorar sua situação tem q ir de ônibus pra São Paulo visitar seus parentes, mas acabou vendo o horário errado, chegou na rodoviária interestadual Meio dia, mas o ônibus pra São Paulo chega meia noite. Faça suas escolhas sabiamente e tente não explodir."
  );
  //Jogo em si
  do {
    console.log(State);
    //Cenas que não atendem os requisitos são deletadas
    //Cenas alternativas podem ser adicionadas
    Scenes = f.SceneHandler(State, Scenes, passedScenes);
    // Cena escolhida
    const choice = await f.drawAndGetChoices(Scenes);
    f.setState(State, choice);
    choice.onChoice();
    passedScenes.push(choice);
    if (State.boredom >= 100) {
      f.GameOver();
      break;
    }
    State.boredom += 10;
    if (State.time > 120) {
      f.GameWin();
    }
    State.time += 10;
  } while (State.time <= 120);

  res = await f.getRes();
}

//Funções do jogo
