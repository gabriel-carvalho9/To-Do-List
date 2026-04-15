const inputTarefa = document.getElementById('inserirTarefa'); // Representa o campo de entrada para a tarefa
const inputValorHora = document.getElementById('valorTarefa'); // Representa o valor da hora
const inputHoras = document.getElementById('quantidadeHora'); // Representa a quantidade de horas
const inputImposto = document.getElementById('Imposto'); // Representa o valor do imposto
const listaTarefas = document.getElementById('listaTarefas'); // Representa a lista onde as tarefas serão exibidas
const containerLista = document.getElementById('caixaTarefas'); /* Representa o contêiner que envolve a lista de tarefas, 
 usado para mostrar ou esconder a caixa de tarefas */

function adicionar() {
    const tarefa = inputTarefa.value.trim(); /* O método trim() remove os espaços em branco do início e do fim da string,
    garantindo que o usuário não possa adicionar uma tarefa vazia mesmo que insira apenas espaços. */
    const valorHora = Number(inputValorHora.value);
    const horas = Number(inputHoras.value);
    const imposto = Number(inputImposto.value); /* O método Number() é usado para converter os valores de entrada em números,
    permitindo que sejam usados em cálculos posteriormente. */
    
    if (tarefa === "" || valorHora <= 0 || horas <= 0) { 
        alert("Por favor, preencha todos os campos corretamente!");
        return; 
    }

    const valorBruto = valorHora * horas;
    const valorTotal = valorBruto + (valorBruto * imposto / 100);

        containerLista.style.display = "block"; // Exibe a caixa de tarefas quando uma tarefa é adicionada

        const listaItem = document.createElement('li'); // Cria um elemento de lista

        listaItem.innerHTML = `
        <span><strong>${tarefa}</strong><br>
        <small>R$ ${valorTotal.toFixed(2)} (com ${imposto}% imposto)</small></span>
        `; 
        /* Define o conteúdo HTML do elemento de lista, incluindo a tarefa e o valor total formatado com duas casas decimais, 
        além do imposto aplicado */

        const botaoRemover = document.createElement('button'); // Cria um elemento de remover
        botaoRemover.innerText = "X";

        botaoRemover.onclick = function() {
            listaItem.remove(); // Remove a tarefa da lista quando o botão de remover é clicado

            if (listaTarefas.children.length === 0) { // Verifica se a lista de tarefas está vazia
                /* o .children aparece antes do .length para contar os elementos filhos da lista de tarefas, pois
                se fosse apenas o .length, a tag <ul> não tem "comprimento" então provavelmente seria 0 sempre*/
                containerLista.style.display = "none"; // Esconde a caixa de tarefas se não houver mais tarefas
            }
        };

        // As linhas abaixo precisam estar FORA do onclick para funcionarem assim que você clica em "Adicionar"
        listaItem.appendChild(botaoRemover); // Adiciona o botão de remover à tarefa
        listaTarefas.appendChild(listaItem); // Adiciona novos elementos no final da lista

        if (valorTotal < 100) {
        lista.style.border = "2px solid red";
        }

    limparFormulario();
}

function resetarTudo() {
    // Limpa todos os itens da lista de uma vez
    listaTarefas.innerHTML = "";
    
    // Esconde a caixa de tarefas após resetar tudo, já que não haverá mais tarefas para exibir
    containerLista.style.display = "none";
    limparFormulario();
}   

function limparFormulario() {
    inputTarefa.value = "";
    inputValorHora.value = "";
    inputHoras.value = "";
    inputImposto.value = "";
    inputTarefa.focus();
}