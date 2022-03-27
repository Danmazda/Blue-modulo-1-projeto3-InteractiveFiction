import chalk from "chalk";
import inquirer from "inquirer";
import figlet from "figlet";
import random from "random";
import { randomScenes, repeatableScenes } from "./objects.js";
// import  from "chalk-animation"

//A promise vai ser resolvida depois do tempo informado em ms (default: 2s)
const sleep = (ms = 2000) => new Promise((resolve) => setTimeout(resolve, ms));

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
  console.log(chalk.bgRed.black("BOOM! você explodiu de tanto tédio..."));
}

export function GameWin() {
  console.log(
    chalk.bgGreen.black(
      "Parabéns! Você conseguiu passar 12 horas sem explodir em pedacinhos!"
    )
  );
}

export function setState(State, Scene) {
  //Boredom não pode ser menor que 0
  if (Scene.hasOwnProperty("onChoice")) {
    Scene.onChoice();
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
