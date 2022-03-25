const prompt = require("prompt-sync")();
const random = require("random");
const chalk = require("chalk");
warn("DON'T BORE YOURSELF TO DEATH");
// const randomScenes = [1, 2, 3];
// let chance;
let res;
//Se quiser jogar de novo o jogo reseta
while (res != "N") {
  //Estado do jogador
  let State = {
    boredom: 0,
    time: 0,
    money: 30,
    phoneBattery: 100,
  };

  let Scenes = [
    {
      choice: () => dialog("Esperar pacientemente"),
      onChoice: () =>
        console.log(
          "Você tenta esperar pacientemente, só que para você falta a paciência... Parece que não foi uma boa escolha"
        ),
      time: 5,
      boredom: 50,
    },
    {
      choice: () => dialog("Comprar Café"),
      onChoice: () =>
        console.log(
          `Você gasta um pouco de dinheiro para comprar e tomar um cafézinho,que não dura muito tempo... pelo menos fez alguma coisa.`
        ),
      time: 5,
      money: 5,
      boredom: -10,
    },
    {
      choice: () => dialog("Comprar revista"),
      onChoice: () =>
        console.log(
          "Com seu pouco dinheiro você compra uma revista na banca. A revista fala sobre carpintaria, cuidado de casa e a vida de famosos, você se vê mais entretido do que deveria, foi uma boa escolha."
        ),
      money: 15,
      boredom: -20,
      time: 20,
    },
    {
      choice: () => dialog("Comprar Lanche"),
      onChoice: () =>
        console.log(
          "Você compra uma coxinha que estava deliciosa, mas não durou muito, pelo menos está de barriga cheia"
        ),
      money: 10,
      boredom: -10,
      time: +10,
    },
    {
      choice: () => dialog("Ir ao banheiro"),
      onChoice: () =>
        console.log(
          "Mesmo sem vontade você vai ao banheiro... Meio estranho, mas ok. Dentro do banheiro está tudo sujo além de estar com um cheiro ruim, você sai rapidamente de lá"
        ),
      time: 5,
      boredom: -5,
    },
    {
      choice: () => dialog("Olhar as pessoas passando"),
      onChoice: () =>
        console.log(
          "Você só olha o movimento à sua volta... nada acontece. Que chatice."
        ),
      time: 5,
      boredom: 50,
    },
    {
      choice: () => dialog("Ver tiktok"),
      onChoice: () =>
        console.log(
          "Você saca o celular e vê tiktok, entre dancinhas e vídeos de humor duvidoso você gasta bastante tempo... Mas a bateria já quase foi embora."
        ),
      time: 20,
      phoneBattery: -50,
      boredom: -20,
    },
    {
      choice: () => dialog("Jogar no celular"),
      onChoice: () =>
        console.log(
          "Você pega o celular e começa a jogar candy crush como bom gamer hardcore que você é, gasta muito tempo estourando docinhos até que suas vidas acabam."
        ),
      time: 20,
      phoneBattery: -50,
      boredom: -20,
    },
  ];

  dialog(
    "Você é um jovem que nasceu com uma condição rara: Ao ficar com muito tédio você explode! E pra piorar sua situação tem q ir de ônibus pra São Paulo visitar seus parentes, mas acabou vendo o horário errado, chegou na rodoviária interestadual Meio dia, mas o ônibus pra São Paulo chega meia noite. Faça suas escolhas sabiamente e tente não explodir."
  );

  //Jogo em si
  do {
    //Cenas que não atendem os requisitos são deletadas
    //Cenas alternativas podem ser adicionadas
    Scenes = SceneHandler(State, Scenes);
    // Cena escolhida
    const choice = drawAndGetChoices(Scenes);
    setState(State, choice);
    choice.onChoice();
    if (State.boredom >= 100) {
      GameOver();
      break;
    }
    State.boredom += 10;
    if (State.time > 120) {
      GameWin();
    }
    State.time += 1;
    console.log(State);
  } while (State.time <= 120);

  dialog("Deseja jogar novamente? [N] para sair.");
  res = prompt().trim().toUpperCase().slice(0, 1);
}

//Funções do jogo
function dialog(str) {
  console.log(chalk.bgWhite.black(str));
}

function warn(str) {
  console.log(chalk.bgRed.white(str));
}

function highlight(str) {
  console.log(chalk.bgGreen.black(str));
}

function GameOver() {
  console.log(chalk.bgRed.black("BOOM! você explodiu de tanto tédio..."));
}

function GameWin() {
  console.log(
    chalk.bgGreen.black(
      "Parabéns! Você conseguiu passar 12 horas sem explodir em pedacinhos!"
    )
  );
}

function setState(State, Scene) {
  if (Scene.hasOwnProperty("boredom")) {
    //Boredom não pode ser menor que 0
    if ((State.boredom += Scene.boredom >= 0)) {
      State.boredom += Scene.boredom;
    }
  }
  if (Scene.hasOwnProperty("time")) {
    State.time += Scene.time;
  }
  if (Scene.hasOwnProperty("phoneBattery")) {
    State.phoneBattery += Scene.phoneBattery;
  }
  if (Scene.hasOwnProperty("money")) {
    State.money -= Scene.money;
  }
  return State;
}

// Decisões

function drawAndGetChoices(Scenes) {
  console.log("Faça sua escolha: ");
  // Mostra as escolhas para o usuário
  for (const key in Scenes) {
    highlight(`[${key}]: `);
    Scenes[key].choice();
  }

  let choice = +prompt("");
  while (!Scenes.hasOwnProperty(choice)) {
    console.log(
      "Essa opção não existe! Sei que está entediado, mas também não fica inventando moda!"
    );
    choice = +prompt("");
  }
  return Scenes[choice];
}

function SceneHandler(State, Scenes) {
  Scenes = Scenes.filter(
    (scene) => !scene.hasOwnProperty("money") || State.money - scene.money >= 0
  );
  if (State.phoneBattery <= 0) {
    Scenes = Scenes.filter((scene) => !scene.hasOwnProperty("phoneBattery"));
  }
  return Scenes;
}
