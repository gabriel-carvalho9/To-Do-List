const inputTarefa = document.getElementById('inserirTarefa'); // Representa o campo de entrada para a tarefa
const inputValorHora = document.getElementById('valorHora'); // Representa o valor da hora
const inputHoras = document.getElementById('quantidadeHora'); // Representa a quantidade de horas
const inputImposto = document.getElementById('imposto'); // Representa o valor do imposto
const listaTarefas = document.getElementById('listaTarefas'); // Representa a lista onde as tarefas serão exibidas
const caixaLista = document.getElementById('caixaTarefas'); /* Representa o contêiner que envolve a lista de tarefas,
usado para mostrar ou esconder a caixa de tarefas */
const caixaCusto = document.getElementById('caixaCusto');/* Representa o contêiner que envolve a lista de tarefas, 
usado para mostrar ou esconder a caixa de tarefas */
let valoresTarefas = []; // Array para armazenar os valores totais de cada tarefa, facilitando o cálculo do custo total
const valorBruto = 0;
const valorTotal = 0; 
let soma = 0;

const tarefas = {
    nome: inputTarefa.value,
    id: Date.now(), //usado para gerar IDs únicos para as tarefas
    valor: valorTotal
};

valoresTarefas.push(novaTarefa);
atualizarInterface();

function adicionar() {
    const tarefaNome = inputTarefa.value.trim();
    const valorHora = Number(inputValorHora.value);
    const horas = Number(inputHoras.value);
    const imposto = Number(inputImposto.value);
    
    // Capturar a urgência selecionada no momento do clique
    const selectUrgencia = document.getElementById('urgencias').value;

    if (tarefaNome === "" || valorHora <= 0 || horas <= 0) { 
        alert("Preencha corretamente!");
        return; 
    }

    // Definir o multiplicador de urgência
    let multiplicador = 1; // Padrão: Sem urgência (multiplica por 1, não muda nada)

    if (selectUrgencia === "Urgente") {
        multiplicador = 1.20; // +20%
    } else if (selectUrgencia === "muitaUrgencia") {
        multiplicador = 1.50; // +50%
    }

    // Cálculos (Valor com imposto * Multiplicador de Urgência)
    const valorBruto = valorHora * horas;
    const valorComImposto = valorBruto + (valorBruto * imposto / 100);
    const valorTotalTarefa = valorComImposto * multiplicador;

    // Criar o objeto com a informação da urgência (opcional para exibir depois)
    const novaTarefa = {
        id: Date.now(),
        nome: tarefaNome,
        valor: valorTotalTarefa,
        imposto: imposto,
        urgencia: selectUrgencia // Guardamos para saber o nível de urgência
    };

    valoresTarefas.push(novaTarefa);
    atualizarInterface();
    limparFormulario();
}

function atualizarInterface() {
    // Limpa a lista na tela para não repetir o que já estava lá
    listaTarefas.innerHTML = "";
    
    let somaTotal = 0; // Começa a soma do zero

    // O forEach percorre cada item da sua Array
    valoresTarefas.forEach(item => {
        somaTotal += item.valor; // Soma o valor desse item ao total

        // Cria o elemento na tela
        const listaItem = document.createElement('li');
        listaItem.innerHTML = `
            <span><strong>${item.nome}</strong><br>
            <small>R$ ${item.valor.toFixed(2)} (com ${item.imposto}% imposto)</small></span>
        `;

        // Cria o botão de remover e diz o que ele deve fazer
        const botaoRemover = document.createElement('button');
        botaoRemover.innerText = "X";
        botaoRemover.onclick = () => removerTarefa(item.id); // Remove pelo ID

        listaItem.appendChild(botaoRemover);
        listaTarefas.appendChild(listaItem);
    });

    // Atualiza o custo total e mostra/esconde as caixas
    document.getElementById('custoTotal').innerText = somaTotal.toFixed(2);
    caixaLista.style.display = valoresTarefas.length > 0 ? "block" : "none";
    caixaCusto.style.display = valoresTarefas.length > 0 ? "block" : "none";
}

function removerTarefa(idParaRemover) {
    // Dizemos: "A lista agora só tem quem NÃO tem esse ID"
    valoresTarefas = valoresTarefas.filter(t => t.id !== idParaRemover);
    
    // Como a lista mudou, chamamos o desenhista de novo
    atualizarInterface();
}   

function resetarTudo() {
    // Limpa todos os itens da lista de uma vez
    listaTarefas.innerHTML = "";
    
    // Esconde as caixas após resetar tudo, já que não haverá mais tarefas nem custo para exibir
    caixaLista.style.display = "none";
    caixaCusto.style.display = "none";

    limparFormulario();
}   

function limparFormulario() {
    inputTarefa.value = "";
    inputValorHora.value = "";
    inputHoras.value = "";
    inputImposto.value = "";
    inputTarefa.focus();
}