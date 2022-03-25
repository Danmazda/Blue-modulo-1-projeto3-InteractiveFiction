const objeto = {
  1: "Escolheu 1",
  2: "Escolheu 2",
  3: "Escolheu 3",
};

const prompt = require("prompt-sync")();
const escolha = +prompt("Digite sua escolha: 1 , 2 ou 3  ");
console.log(objeto[escolha]);
