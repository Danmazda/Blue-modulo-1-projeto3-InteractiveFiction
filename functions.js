import chalk from "chalk";
import inquirer from "inquirer";
import figlet from "figlet";

export function dialog(str) {
  console.log(chalk.bgWhite.black(str));
}

export function warn(str) {
  console.log(chalk.bgRed.white(str));
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

  // while (!Scenes.hasOwnProperty(choice)) {
  //   console.log(
  //     "Essa opção não existe! Sei que está entediado, mas também não fica inventando moda!"
  //   );
  //   choice = +prompt("");
  // }
  return Scenes.find((scene) => {
    return scene.choice === choice;
  });
}

export function SceneHandler(State, Scenes) {
  Scenes = Scenes.filter(
    (scene) => !scene.hasOwnProperty("money") || State.money - scene.money >= 0
  );
  if (State.phoneBattery <= 0) {
    Scenes = Scenes.filter((scene) => !scene.hasOwnProperty("phoneBattery"));
  }
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
