import { dialog } from "./functions.js";

export let State = {
  boredom: 0,
  time: 0,
  money: 30,
  phoneBattery: 100,
};

export let Scenes = [
  {
    choice: "Esperar pacientemente",
    onChoice: () =>
      console.log(
        "Você tenta esperar pacientemente, só que para você falta a paciência... Parece que não foi uma boa escolha"
      ),
    time: 5,
    boredom: 50,
  },
  {
    choice: "Comprar Café",
    onChoice: () =>
      console.log(
        `Você gasta um pouco de dinheiro para comprar e tomar um cafézinho,que não dura muito tempo... pelo menos fez alguma coisa.`
      ),
    time: 5,
    money: 5,
    boredom: -10,
  },
  {
    choice: "Comprar revista",
    onChoice: () =>
      console.log(
        "Com seu pouco dinheiro você compra uma revista na banca. A revista fala sobre carpintaria, cuidado de casa e a vida de famosos, você se vê mais entretido do que deveria, foi uma boa escolha."
      ),
    money: 15,
    boredom: -20,
    time: 20,
  },
  {
    choice: "Comprar Lanche",
    onChoice: () =>
      console.log(
        "Você compra uma coxinha que estava deliciosa, mas não durou muito, pelo menos está de barriga cheia"
      ),
    money: 10,
    boredom: -10,
    time: +10,
  },
  {
    choice: "Ir ao banheiro",
    onChoice: () =>
      console.log(
        "Mesmo sem vontade você vai ao banheiro... Meio estranho, mas ok. Dentro do banheiro está tudo sujo além de estar com um cheiro ruim, você sai rapidamente de lá"
      ),
    time: 5,
    boredom: -5,
  },
  {
    choice: "Olhar as pessoas passando",
    onChoice: () =>
      console.log(
        "Você só olha o movimento à sua volta... nada acontece. Que chatice."
      ),
    time: 5,
    boredom: 50,
  },
  {
    choice: "Ver tiktok",
    onChoice: () =>
      console.log(
        "Você saca o celular e vê tiktok, entre dancinhas e vídeos de humor duvidoso você gasta bastante tempo... Mas a bateria já quase foi embora."
      ),
    time: 20,
    phoneBattery: -50,
    boredom: -20,
  },
  {
    choice: "Jogar no celular",
    onChoice: () =>
      console.log(
        "Você pega o celular e começa a jogar candy crush como bom gamer hardcore que você é, gasta muito tempo estourando docinhos até que suas vidas acabam."
      ),
    time: 20,
    phoneBattery: -50,
    boredom: -20,
  },
];
