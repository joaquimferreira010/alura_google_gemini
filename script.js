let cardContainer = document.querySelector(".card-container");
let inputBusca = document.querySelector("input"); // Seleciona o campo de busca
let dados = [];

// Função que busca os dados e realiza a filtragem
async function iniciarBusca() {
    // Se os dados ainda não foram carregados, busca do data.json
    if (dados.length === 0) {
        try {
            let resposta = await fetch("data.json");
            dados = await resposta.json();
        } catch (error) {
            console.error("Erro ao buscar os dados:", error);
            return; // Interrompe a execução se houver erro
        }
    }

    // Pega o termo da busca, remove espaços em branco e converte para minúsculas
    const termoBusca = inputBusca.value.trim().toLowerCase();

    // Filtra os dados com base no termo de busca
    const resultados = dados.filter(dado => 
        dado.nome.toLowerCase().includes(termoBusca) ||
        dado.descricao.toLowerCase().includes(termoBusca)
    );

    renderizarCards(resultados);
}

function renderizarCards(dados){
    cardContainer.innerHTML = ""; // Limpa os cards existentes antes de renderizar os novos
    for (let dado of dados){
        let article = document.createElement("article");
        article.innerHTML = `
            <h2>${dado.nome}</h2>
            <p>${dado.data_criacao}</p>
            <p>${dado.descricao}</p>               
            <a href="${dado.link}" target="_blank">Saiba mais</a>
         `
         cardContainer.appendChild(article);
    }
}

// Chama a função uma vez no início para carregar e exibir todos os cards
iniciarBusca();