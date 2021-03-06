import random from "random";
import { sideGame } from "./functions.js";

export const State = {
  boredom: 0,
  time: 0,
  money: 30,
  phoneBattery: 100,
  bathroom: false,
};

export const Scenes = [
  {
    choice: "Esperar pacientemente",
    onChoice: async function () {
      this.text =
        "Você tenta esperar pacientemente, só que para você falta a paciência... Parece que não foi uma boa escolha";
      this.time = 5;
      this.boredom = 50;
      let chance = random.int(1, 4);
      if (chance === 2) {
        const scene = await sideGame();
        const { text, time, boredom } = scene;
        this.text = text;
        this.time = time;
        this.boredom = boredom;
      }
    },
  },
  {
    choice: "Comprar Café",
    counter: 0,
    text: `Você gasta um pouco de dinheiro para comprar e tomar um cafézinho,que não dura muito tempo... pelo menos fez alguma coisa.`,
    time: 5,
    money: 5,
    boredom: -10,
    onChoice: function () {
      this.counter++;
    },
    onSecondChoice: function () {
      if (this.counter > 1) {
        this.text = `Você gasta mais do seu dinheiro pra tomar mais café. Vício talvez? agora você ficou apertado e precisa ir no banheiro!`;
        this.time = 10;
        this.boredom = -25;
        this.bathroom = true;
      }
    },
  },
  {
    choice: "Comprar revista",
    counter: 0,
    text: `Você gasta com uma revista na banca, a revista fala sobre a vida de celebridades, carpintaria e moda, você se vê mais intrigado do que deveria, foi uma boa esolha.`,
    money: 15,
    boredom: -20,
    time: 20,
    onChoice: function () {
      this.counter++;
    },
    onSecondChoice: function () {
      if (this.counter > 1) {
        this.text = `Você gasta de novo com outra revista, dessa vez fala sobre esportes... que você não tem o menor interese, "A nova sensação do cricket", dinheiro jogado fora.`;
        this.boredom = 30;
        this.time = 10;
      }
    },
  },
  {
    choice: "Comprar Lanche",
    text: "Você compra uma coxinha que estava deliciosa, mas não durou muito, pelo menos está de barriga cheia... e estranha, aparentemente a coxinha estava estragada, e você sente uma vontade urgente de ir ao banheiro!",
    money: 10,
    boredom: -10,
    time: +10,
    bathroom: true,
  },
  {
    choice: "Ir ao banheiro",
    counter: 0,
    time: 5,
    boredom: -5,
    onChoice: function (bathroom = false) {
      if (bathroom) {
        this.text = `Você vai correndo pro banheiro se aliviar... Ufa essa foi por pouco.`;
      } else {
        this.text = `Você vai ao banheiro, mesmo sem vontade, meio estranho, mas ok, o banheiro está bem sujo e fedido você não consegue ficar lá por muito tempo.`;
        this.counter++;
      }
    },
    onSecondChoice: function () {
      if (this.counter > 1) {
        this.text = `Você vai ao banheiro... De novo cara?? O que você quer encontrar lá? tu é muito esquisito, de novo tá tudo fedido, pelo menos você arruma seu cabelo dessa vez.`;
        this.boredom = 10;
      }
    },
  },
  {
    choice: "Olhar as pessoas passando",
    onChoice() {
      let chance = random.int(1, 9);
      if (chance == 1) {
        this.text =
          "Você olha as pessoas passando... e vê um grande alvoroço se formando numa catraca, dois motoristas trocam socos e chutes enquanto um pessoal tenta separá-los, treta para os outros entretenimento pra você.";
        this.time = 20;
        this.boredom = 30;
      } else if (chance == 2) {
        this.text =
          "Você vê o movimento à sua volta, nada demais acontecendo... dá até um sono até que sua visão começa a se encher de cores, um unicórnio alado atravessa a multidão e vem direto a você, ele diz que você é o escolhido e o especial. Você fica muito feliz até que ele vomita doces na sua cara. Você acorda num pulo, dormiu e nem viu o tempo passar, que sorte.";
        this.time = 120;
        this.boredom = -20;
      } else if (chance == 3) {
        this.text =
          "Você olha o movimento à sua volta, nada demais acontecendo... uma senhora cruza olhares com você, coê até tenta desviar, mas tarde demais ela está vindo até você. Com muita alegria e doçura ela fala sobre toda a vida dela, como ela se casou, como foi criar os filhos, porque ela está ali... Parece uma eternidade pra você, mas se passaram apenas minutos.";
        this.time = 10;
        this.boredom = 40;
      } else {
        this.text =
          "Você só olha o movimento à sua volta... nada acontece. Que chatice.";
        this.time = 5;
        this.boredom = 50;
      }
    },
  },
  {
    choice: "Pegar transporte pirata",
    text: "Você percebe que tem um tranporte pirata e sem pensar duas vezes pega ele ",
    money: 30,
    onChoice: function () {
      let chance = random.int(1, 2);
      if (chance == 1) {
        this.text =
          "Você entra na van, mas ela está vazia, o motorista é enfático: Só sai com mais de 20 passageiros, esses passageiros parecem nunca chegar... você fica esperando demais até que...";
        this.time = 0;
        this.boredom = 100;
      } else {
        this.text =
          "Você vai indo rápido para São Paulo, o motorista da Van parece um piloto de fórmula 1, quando você menos espera chegou. Que sorte!";
        this.time = 120;
        this.boredom = -40;
      }
    },
  },
  {
    choice: "Ver tiktok",
    text: "Você saca o celular e vê tiktok, entre dancinhas e vídeos de humor duvidoso você gasta bastante tempo... Mas a bateria já quase foi embora.",
    time: 20,
    phoneBattery: -30,
    boredom: -20,
  },
  {
    choice: "Jogar no celular",
    text: "Você pega o celular e começa a jogar candy crush como bom gamer hardcore que você é, gasta muito tempo estourando docinhos até que suas vidas acabam.",
    time: 20,
    phoneBattery: -70,
    boredom: -20,
  },
];

export const repeatableScenes = [
  "Esperar pacientemente",
  "Olhar as pessoas passando",
  "Ir ao banheiro",
  "Comprar Café",
  "Comprar revista",
];
