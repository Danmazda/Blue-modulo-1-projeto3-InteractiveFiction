import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import inquirer from "inquirer";
import figlet from "figlet";
import random from "random";
import gradient from "gradient-string";
import { repeatableScenes } from "./objects.js";
export function dialog(str) {
  console.log(chalk.bgWhite.black(str));
}

export function title(str) {
  console.log(
    // Forma síncrona do figlet, a assíncrona dava erros
    chalk.red(
      figlet.textSync(str, {
        horizontalLayout: "default",
        verticalLayout: "default",
        width: 80,
        whitespaceBreak: true,
      })
    )
  );
}

export function highlight(str) {
  console.log(chalk.bgGreen.black(str));
}

export function GameOver() {
  title("BOOM!");
  console.log(chalk.bgRed.black("você explodiu de tanto tédio..."));
}

export function GameWin() {
  console.log(
    // Forma síncrona do figlet, a assíncrona dava erros
    gradient.cristal(
      figlet.textSync("PARABÉNS!", {
        horizontalLayout: "default",
        verticalLayout: "default",
        width: 80,
        whitespaceBreak: true,
      })
    )
  );
  highlight("Você conseguiu passar 12 horas sem explodir em pedacinhos!");
}

export async function setState(State, Scene) {
  //Boredom não pode ser menor que 0
  if (Scene.hasOwnProperty("onChoice")) {
    await Scene.onChoice();
  }
  if (State.boredom + Scene.boredom >= 0) {
    State.boredom += Scene.boredom;
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

  if (Scene.hasOwnProperty("onSecondChoice")) {
    Scene.onSecondChoice();
  }
  return State;
}

// Decisões

export async function drawAndGetChoices(Scenes) {
  const choices = [];
  for (const i in Scenes) {
    choices.push(Scenes[i].choice);
  }

  const questions = await inquirer.prompt({
    name: "choice",
    type: "list",
    choices: choices,
    message: "Qual a sua escolha?",
  });
  const choice = questions.choice;
  return Scenes.find((scene) => scene.choice === choice);
}

export function SceneHandler(State, Scenes, passedScenes = []) {
  // Se não tem dinheiro a cena não aparece
  Scenes = Scenes.filter(
    (scene) => !scene.hasOwnProperty("money") || State.money - scene.money >= 0
  );

  // Se não tem bateria a cena não aparece
  Scenes = Scenes.filter(
    (scene) =>
      !scene.hasOwnProperty("phoneBattery") ||
      State.phoneBattery - scene.phoneBattery >= 0
  );

  //Se a cena já foi mostrada e ela não é repetível ela não aparece
  Scenes = Scenes.filter(
    (scene) =>
      !passedScenes.includes(scene) || repeatableScenes.includes(scene.choice)
  );

  //Se a cena foi mostrada duas vezes ela não aparece
  Scenes = Scenes.filter(
    (scene) => !scene.hasOwnProperty("counter") || scene.counter <= 1
  );

  return Scenes;
}

export async function getRes() {
  const ask = await inquirer.prompt({
    name: "response",
    type: "input",
    message: dialog("Deseja jogar novamente?"),
    default() {
      return "S";
    },
  });
  return ask.response.trim().toUpperCase().slice(0, 1);
}

export async function sideGame() {
  const ask = await inquirer.prompt({
    name: "r",
    type: "list",
    choices: ["Sim", "Não"],
    message: dialog(
      "Um estranho te vê esperando e chega perto, ele oferece uma carona até São Paulo. Você aceita?"
    ),
  });
  if (ask.r === "Sim") {
    let chance = random.int(1, 2);
    if (chance === 1) {
      return {
        text: "Você aceita a corrida, entra no carro preto do homem, ele adentra um matagal que você nunca tinha visto, você fica apreensivo, o homem fica calado, o caminho parece um portal mágico porque em menos de uma hora vocês estão em São Paulo, que sorte!",
        time: 120,
        boredom: 0,
      };
    } else {
      return {
        text: "Você aceita a corrida, entra no carro preto do homem, ele adentra um matagal que você nunca tinha visto, você fica apreensivo, o homem fica calado, no meio do mato o pneu estoura, o homem xinga, e para o carro pra trocar o pneu 'Vai ser rapidinho' ele diz, mas não foi nada rápido já se passaram três horas e você não vai aguentar...",
        time: 0,
        boredom: 100,
      };
    }
  } else {
    return {
      text: "Você não aceita e o estranho segue sua vida.",
      time: 10,
      boredom: 0,
    };
  }
}
