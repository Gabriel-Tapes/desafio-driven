const segundo = 1000;
const minuto = 60 * segundo;
const hora = 60 * minuto;
const dia = 24 * hora;
const botaoIr = document.getElementById("ir");
const span = document.getElementById("timer");
const h1 = document.getElementById("emoji");
const data = document.getElementById("data");
let tempo = 0;
let dataFinal;
let idIntervalo;

if (localStorage.getItem("dataFinal")) {
    data.value = localStorage.getItem("data");
    dataFinal = localStorage.getItem("dataFinal");
    idIntervalo = setInterval(timer, 1000);

    h1.classList.add("hidden");
    span.classList.remove("hidden");
    botaoIr.classList.add("hidden");
}

function comecar() {
    dataFinal = new Date(data.value).getTime();

    salvar()
    idIntervalo = setInterval(timer, 1000);

    h1.classList.add("hidden");
    span.classList.remove("hidden");
    botaoIr.classList.add("hidden");
}

function timer() {
    let agora = new Date().getTime();

    tempo = dataFinal - (agora - 3 * hora);

    const dias = Math.floor(tempo / dia);
    const horas = Math.floor((tempo % dia) / hora);
    const minutos = Math.floor((tempo % hora) / minuto);
    const segundos = Math.floor((tempo % minuto) / segundo);

    span.innerHTML = `${dias} Dias ${horas} Horas ${minutos} Minutos ${segundos} Segundos`;
}

function resetar() {
    let input = document.getElementById("data");

    clearInterval(idIntervalo);
    deletar()

    input.value = "2023-01-01";

    botaoIr.classList.remove("hidden");
    span.classList.add("hidden");
    h1.classList.remove("hidden");
}

function salvar() {
    localStorage.setItem("dataFinal", dataFinal);
    localStorage.setItem("data", data.value);
}

function deletar() {
    localStorage.removeItem("dataFinal");
    localStorage.removeItem("data");
}