console.log("oi");
async function pegarTemperatura() {
  return new Promise(function (resolve, reject) {
    console.log("Pegando Temperatura...");

    setTimeout(function () {
      resolve("40 na sombra");
    }, 2000);
  });
}
let temp = await pegarTemperatura();
console.log(temp);