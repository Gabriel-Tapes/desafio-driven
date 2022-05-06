const prefixo = "card-";
const cardsAFazer = document.getElementById("cardsAFazer");
const cardsFazendo = document.getElementById("cardsFazendo");
const cardsEntregue = document.getElementById("cardsEntregue");

function adicionar(elemento) {
    const texto = prompt("Qual é a tarefa?");

    if (texto !== '' && texto !== null) {
        const ulId = elemento.previousElementSibling.id;

        const cardId = new Date().getTime()
        const card = `
        <li id="${cardId}" draggable="true" ondragstart="arrastar(event, this.id)">
            <p class="tarefa" onclick="event.stopPropagation()" contenteditable="true" onblur="salvarAlteracoes(this)">
                ${texto}
            </p class="excluir">
            <p class="excluir" onclick="deletar(this)">
                x
            </p>
        </li>`;

        const ul = document.getElementById(ulId);


        ul.innerHTML = ul.innerHTML + card;
        localStorage.setItem(prefixo + cardId, [card, ulId]);
    }
}

function arrastar(event, id) {
    event.dataTransfer.setData("tarefa", event.target.id);
}

function soltar(event, id) {
    event.preventDefault();
    const target = document.getElementById(id);
    const data = event.dataTransfer.getData("tarefa");
    const uls = [cardsAFazer, cardsFazendo, cardsEntregue];

    const card = document.getElementById(data);

    target.appendChild(card);

    for (let i = 0; i < 3; i++) {
        uls[i].classList.remove("em-cima");
    }

    key = prefixo + data;
    atual = localStorage[key].slice(localStorage[key].lastIndexOf(",") + 1);

    localStorage[key] = localStorage[key].replace(atual, id);
}

function emCima(event, id) {
    event.preventDefault();

    const ul = document.getElementById(id).classList;
    ul.add("em-cima");
}

function deletar(elemento) {
    const idCard = elemento.parentElement.id;

    card = document.getElementById(idCard);

    card.remove();
    localStorage.removeItem(prefixo + idCard);
}

function manterAlteracoes() {
    for (let key in localStorage) {
        if (key.includes(prefixo)) {
            const ulId = localStorage[key].slice(localStorage[key].lastIndexOf(",") + 1);
            const ul = document.getElementById(ulId);
            const card = localStorage[key].slice(0, localStorage[key].lastIndexOf(","));

            ul.innerHTML = ul.innerHTML + card;
        }
    }
}

function salvarAlteracoes(elemento) {
    const card = elemento.parentElement;
    const ulId = card.parentElement.id;
    const cardId = card.id;
    const texto = elemento.innerText;

    localStorage[prefixo + cardId] = `
    <li id="${cardId}" draggable="true">
        <p class="tarefa" onclick="event.stopPropagation()" contenteditable="true" onblur="salvarAlteracoes(this)">
            ${texto}
        </p class="excluir">
        <p class="excluir" onclick="deletar(this)">
            x
        </p>
    </li>,${ulId}`;
}

manterAlteracoes();