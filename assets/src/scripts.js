let produtosAll = listProducts


// FUNCAO PARA RENDEREZIAR OS CARD QUE ESTAO NA ARRAY NO ARQUIVO products.js
const conteiner = document.querySelector(".conteiner-list")
const renderCards = (loadDados) => {
    try {
        const fragment = document.createDocumentFragment();
        conteiner.innerHTML = "";
        loadDados.forEach((dados, index) => {
            const item = document.createElement("div")
            item.classList.add("box-card")
            item.innerHTML = `
                <div class="sub-img">
                    <img src="./assets/img/burgues/${dados.src}.png" alt="${dados.src} Imagem">
                </div>
                <div class="sub-infos">
                    <div class="sub-infos-text">
                        <h3>${dados.nome}</h3>
                        <p>${formatarMoeda.format(dados.prince)}</p>
                        <button onclick="clickOpenIngredent('${index}')" class="btn-ingredent">
                            Ver ingredientes
                            <span class="material-symbols-outlined">
                                arrow_right
                            </span>
                        </button>
                    </div>
                    <span onclick="clickOpenAddItem('${index}')" class="add-icons material-symbols-outlined">
                        add
                    </span>
                </div>
                `
            fragment.appendChild(item)
        })
        conteiner.appendChild(fragment);
    } catch (error) {
        console.error('Erro ao carregar os cards!')
    }
}

// MOSTRA TODOS OS CARD AO CLICAR NO MENU [Cardápio completo]
const allMenu = () => {
    produtosExibidos = produtosAll;
    renderCards(produtosExibidos);
}
// MOSTRA OS CARDS VEGANOS AO CLICAR NO MENU [Apenas Veganos]
const veganMenu = () => {
    produtosExibidos = produtosAll.filter(item => item.vegan);
    renderCards(produtosExibidos);
}
// VOLTAR PARA A TELA INICIAL AO CLICAR NO MENU
const boxListBuegur = document.querySelector(".conteiner-list")
const MenuAll = (acao) => {
    if (acao === "All") {
        boxListBuegur.scrollTop = 0
        allMenu()
    } else if (acao === "Vegann") {
        boxListBuegur.scrollTop = 0
        veganMenu()
    }
}
// ===================================================
// ==( SISTEMA PARA ADICIONAR OS ITENS NO CARRINHO )==
// ===================================================

// EVENTO QUE AO CLICAR NO SIMBOLO DE + O ITEM PASSA PARA A LISTA DE PEDIDOS
const pedidosClient = []
let idPedidos = 1;
const clickOpenAddItem = (index) => {
    const produtoAtual = produtosExibidos[index];
    const produtoExistente = pedidosClient.find(
        item => item.nome === produtoAtual.nome
    );
    if (produtoExistente) {
        produtoExistente.qtd++;
        produtoExistente.valor += produtoAtual.prince;
    } else {
        pedidosClient.push({
            id: idPedidos++,
            nome: produtoAtual.nome,
            valor: produtoAtual.prince,
            valorUni: produtoAtual.prince,
            img: produtoAtual.src,
            qtd: 1
        });
    }
    addListClient(pedidosClient);
    sumValortotal()
}

// FUNCAO QUE VAI ADICIONANDO OS PEDIDOS NA LISTA UMA POR UMA
const contListPedidos = document.querySelector('.box-list-peds')
const addListClient = (dados) => {
    contListPedidos.innerHTML = '';
    const fragment = document.createDocumentFragment();
    dados.forEach(pes => {
        const item = document.createElement('div')
        item.classList.add('add-peds-check')
        item.innerHTML = `
        <div>
        <img src="./assets/img/burgues/${pes.img}.png" alt="${pes.img} Imagem">
        <h5><span>${pes.qtd}x</span>  ${pes.nome}</h5>
        </div>
        <p class="valor-pedido-peds">${formatarMoeda.format(pes.valor)}</p>
        `
        fragment.appendChild(item);
    });
    contListPedidos.appendChild(fragment);
}

// VALOR QUE SOMA TUDO E APLICA O RESULDADO DE TODO O VALOR DO PEDIDO
const finalValue = document.querySelector('.finalValor')
const TotalValue = document.querySelector('.TotalValor')
const sumValortotal = () => {
    const result = pedidosClient.reduce((acc, companies) => acc + companies.valor, 0)
    finalValue.innerHTML = formatarMoeda.format(result)
    TotalValue.innerHTML = formatarMoeda.format(result)
    fucAddDescont()
    descontBase.length = 0
}

// FUNCAO PARA AVISAR QUE PRODUTOS ACIMA DE 100 TEM DESCONTO
const btnAddDescont = document.querySelector('.btn-add-descont');
const fucAddDescont = () => {
    const valueClear = Number(finalValue.textContent.replace(/[^\d,]/g, '').replace(',', '.'));
    const temDesconto = valueClear >= 100;
    btnAddDescont.textContent = temDesconto ? 'Ver Descontos' : '5% OFF acima de R$ 100';
    btnAddDescont.style.textDecoration = temDesconto ? 'underline' : 'none';
    btnAddDescont.style.cursor = temDesconto ? 'pointer' : 'default';
}

// EVENTO PARA LIMPAR A LISTA DE PEDIDOS
const btnClerPedido = document.querySelector('.btn-clear-pedidos')
btnClerPedido.addEventListener('click', () => {
    if (pedidosClient.length !== 0) {
        claerListPedidos()
        fucAddDescont()
    }
})

const claerListPedidos = () => {
    if (pedidosClient.length !== 0) {
        pedidosClient.length = 0;
        contListPedidos.innerHTML = '';
        finalValue.innerHTML = formatarMoeda.format(0)
        TotalValue.innerHTML = formatarMoeda.format(0)
        claerCacheDiscont()
    }
}
