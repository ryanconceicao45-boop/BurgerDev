const windIng = document.querySelector('.wind-ingredients')
const nameIng = document.querySelector('.ing-name')
const imgIng = document.querySelector('.img-ing')


const listIngredients = document.querySelector('.List-ingredients')
const loadListing = (dados) => {
    const info = dados.map(item => `<li>• ${item}</li>`).join("");
    listIngredients.innerHTML = info
}

// Abrir painel de ingredient
const clickOpenIngredent = (index) => {
    const produto = produtosExibidos[index];
    windIng.style.display = 'flex'
    requestAnimationFrame(() => {
        windIng.style.opacity = '1'
        nameIng.innerHTML = produto.nome
        imgIng.src = `./assets/img/burgues/${produto.src}.png`
        loadListing(produto.ingredients)
    })
};

// Fechar painel de ingredient
document.querySelector('.bnt-backIng').addEventListener('click', () => {
    windIng.style.opacity = '0'
    setTimeout(() => {
        windIng.style.display = "none"
    }, 0.6 * 1000);
})

// =======================================
// ===(MECANISMO DO PAINEL DE DESCONTO)===
// =======================================
const windDescont = document.querySelector(".wind-descont")
const btnDescont = document.querySelector(".btn-add-descont")
const btnBackDescont = document.querySelector(".btn-back-descont")
const btnAplicaDescont = document.querySelector(".btn-aplicar-descont")
const ListCardDescont = document.querySelector(".list-card-descont")

const renderListDescont = () => {
    try {
        ListCardDescont.innerHTML = "";
        listDiscont.forEach((item, index) => {
            setTimeout(() => {
                const box = document.createElement("div");
                box.classList.add("card-discontp", "card-hidden");
                box.innerHTML = `
                <div>
                    <h3 class="discont-title">${item.title}</h3>
                    <p class="discont-descrip">
                        Economize ${item.valueDescont}% em pedidos acima de R$ ${item.aboveDescont.toFixed(2)}.
                    </p>
                </div>
                <input type="radio" name="radio-disctt" class="discont-rd-style" id="discont-select-${index}" data-index="${index}">`;
                ListCardDescont.appendChild(box);
                requestAnimationFrame(() => box.classList.add("card-visible"));
            }, index * 300); // 150ms entre cada card
        });
    } catch (error) {
        console.log(`Error ao criar os cards de Desconto!`)
    }
}
let descontBase = []

document.addEventListener("change", (e) => {
    if (e.target.name === "radio-disctt") {
        descontBase.length = 0
        const index = Number(e.target.dataset.index);
        const desconto = listDiscont[index];
        const { title, aboveDescont, valueDescont } = desconto;
        descontBase.push({ title, aboveDescont, valueDescont });
        animBtnsDiscntds('active', 'APLICAR')
    }
});



function aplicarDesconto(e) {
    windDescontPanelOpen('remover')
    btnAplicaDescont.removeEventListener("click", aplicarDesconto);
    const valueAnterior = Number(finalValue.textContent.replace(/[^\d,]/g, '').replace(',', '.'));

    if (btnAplicaDescont.innerHTML === 'APLICAR') {
        TotalValue.innerHTML = formatarMoeda.format(valueAnterior)
        const ValorTotal = Number(TotalValue.textContent.replace(/[^\d,]/g, '').replace(',', '.'));
        const percentual = descontBase[0].valueDescont / 100
        const result = valueAnterior - (valueAnterior * percentual)
        btnDescont.textContent = descontBase[0].title + ' APLICADO'
        TotalValue.innerHTML = formatarMoeda.format(result)
    } else {
        TotalValue.innerHTML = formatarMoeda.format(valueAnterior)
        descontBase.length = 0
        btnDescont.textContent = 'Ver Desconto'
    }
}

const animBtnsDiscntds = (show, descrip) => {
    if (show === 'active') {
        btnAplicaDescont.innerHTML = descrip
        if (!btnBackDescont.classList.contains('active-bntDist')) {
            btnBackDescont.classList.add('active-bntDist');
            btnAplicaDescont.style.display = 'block';
            requestAnimationFrame(() => {
                btnAplicaDescont.style.opacity = '1';
                btnAplicaDescont.addEventListener("click", aplicarDesconto);
            });
        }
    }
}

const windDescontPanelOpen = (showPanel) => {
    const show = showPanel === `active`
    if (show) {
        windDescont.style.display = `flex`
        requestAnimationFrame(() => {
            windDescont.style.opacity = '1'
            renderListDescont()
        })
    } else {
        windDescont.style.opacity = '0';
        btnBackDescont.classList.remove('active-bntDist');
        btnAplicaDescont.style.opacity = '0';
        windDescont.addEventListener('transitionend', (e) => {
            if (e.propertyName !== 'opacity') return;
            windDescont.style.display = 'none';
            btnAplicaDescont.style.display = 'none';
        }, { once: true });
    }
}

btnDescont.addEventListener('click', () => {
    if (descontBase.length !== 0) {
        animBtnsDiscntds('active', 'Remover Desconto')
    }
    btnDescont.textContent !== '5% OFF acima de R$ 100' && windDescontPanelOpen('active')
})

btnBackDescont.addEventListener('click', () => {
    windDescontPanelOpen('remover')
})
// =======================================
// ==(PAINEL PAINEL DE FINALIZAR PEDIDO)==
// =======================================