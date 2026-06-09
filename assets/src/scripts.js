let produtosAll = listProducts

const conteiner = document.querySelector(".conteiner-list")
const renderCards = (loadDados) => {
    try {
        const fragment = document.createDocumentFragment();
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
        conteiner.innerHTML = "";
        conteiner.appendChild(fragment);
    } catch (error) {
        console.error('Erro ao carregar os cards!')
    }
}

let produtosExibidos = produtosAll

const allMenu = () => {
    produtosExibidos = produtosAll;
    renderCards(produtosExibidos);
}

const veganMenu = () => {
    produtosExibidos = produtosAll.filter(item => item.vegan);
    renderCards(produtosExibidos);
}

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
/*
SISTEMA PARA ADICIONAR OS ITENS NO CARRINHO
*/



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
            img: produtoAtual.src,
            qtd: 1
        });
    }
    addListClient(pedidosClient);
    sumValortotal()
}


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
        <h5><span>${pes.qtd}</span> - ${pes.nome}</h5>
        </div>
        <p class="valor-pedido-peds">${formatarMoeda.format(pes.valor)}</p>
        `
        fragment.appendChild(item);
    });
    contListPedidos.appendChild(fragment);
}

const finalValue = document.querySelector('.finalValor')
const TotalValue = document.querySelector('.TotalValor')
const sumValortotal = () => {
    const result = pedidosClient.reduce((acc, companies) => acc + companies.valor, 0)
    finalValue.innerHTML = formatarMoeda.format(result)
    TotalValue.innerHTML = formatarMoeda.format(result)
}

const btnFinalizedPedido = document.querySelector('.btn-finalized')
btnFinalizedPedido.addEventListener('click', () => {
    // pedidosClient = []
    pedidosClient.length = 0;
    contListPedidos.innerHTML = '';
})





