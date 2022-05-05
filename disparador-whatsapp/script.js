function pegarTexto(elemento) {
    let texto = elemento.firstElementChild.innerText;
    return texto
}

function somenteNumeros(e) {
    var charCode = e.charCode ? e.charCode : e.keyCode;

    if (charCode != 8 && charCode != 9) {
        if (charCode < 48 || charCode > 57) {
            return false;
        }
    }
}

/*
O número não pode ter menos de 8 caracteres e nem mais que 13
a variável numero deve conter apenas inteiros e não pode estar vazia
*/

function validaNumero(numero) {
    if (numero.legth < 8 || numero.length > 13 || isNaN(numero) || numero === '') {
        return false
    } else {
        return true
    }
}

function enviaMensagem(elemento) {
    let numero = String(prompt("Qual é o número? "));
    let mensagem = pegarTexto(elemento);

    if (validaNumero(numero) === true) {
        let link = `https://web.whatsapp.com/send?phone=${numero}&text=${mensagem}&app_absent=1`;

        window.open(link);
    } else if (numero === 'null' || numero === '') {
        null;
    } else {
        alert('Digite um numero válido!');
        enviaMensagem(elemento);
    }
}

function salvarAlteracoes() {
    const editaveis = document.querySelectorAll("[contentEditable]");

    //Seleciona todos os elementos com contenteditable e armazena o elemento inteito 
    //no LocalStorage com a chave datastorage-(id do elemento)
    editaveis.forEach(el => {
        el.addEventListener("blur", () => {
            localStorage.setItem("dataStorage-" + el.id, el.innerHTML);
        })
    })
}

function manterAlteracoes() {
    for (let key in localStorage) {
        if (key.includes("dataStorage-")) {
            let id = key.replace("dataStorage-", "");
            document.querySelector('#' + id).innerHTML = localStorage.getItem(key);
        }
    }
}

salvarAlteracoes();
manterAlteracoes();