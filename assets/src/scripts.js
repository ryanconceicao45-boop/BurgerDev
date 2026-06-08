let produtosAll = []
let allLoad = false

const conteiner = document.querySelector(".conteiner-list")
const renderCards = (loadDados) => {
    try {
        conteiner.innerHTML = '';
        loadDados.forEach(dados => {
            const item = document.createElement("div")
            item.classList.add("box-card")
            item.innerHTML = `
                <div class="sub-img">
                    <img src="./assets/img/burgues/${dados.src}.png" alt="${dados.src} Imagem">
                </div>
                <div class="sub-infos">
                    <div class="sub-infos-text">
                        <h3>${dados.nome}</h3>
                        <p>${Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(dados.prince)}</p>
                        <button class="btn-ingredent">
                            Ver ingredientes
                            <span class="material-symbols-outlined">
                                arrow_right
                            </span>
                        </button>
                    </div>
                    <span class="add-icons material-symbols-outlined">
                        add
                    </span>
                </div>
            `
            conteiner.appendChild(item)
        })
    } catch (error) {
        console.error('Erro ao carregar os cards!')
    }
}
const allMenu = () => {
    produtosAll = listProducts
    renderCards(produtosAll)
}

const veganMenu = () => {
    const filtrados = produtosAll.filter(item => item.vegan);
    renderCards(filtrados)
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

