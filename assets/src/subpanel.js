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
        const valueAnterior = Number(finalValue.textContent.replace(/[^\d,]/g, '').replace(',', '.'));
        ListCardDescont.innerHTML = "";
        listDiscont.forEach((item, index) => {
            setTimeout(() => {
                const box = document.createElement("div");
                box.classList.add("card-discontp", "card-hidden");
                const verificad = valueAnterior < item.aboveDescont ? 'disabled' : ''
                box.innerHTML = `
                    <div>
                        <h3 class="discont-title ${verificad}">${item.title}</h3>
                        <p class="discont-descrip ${verificad}">
                            Economize ${item.valueDescont}% em pedidos acima de R$ ${item.aboveDescont.toFixed(2)}.
                        </p>
                    </div>
                    <input
                        type="radio"
                        name="radio-disctt"
                        class="discont-rd-style"
                        id="discont-select-${index}"
                        data-index="${index}"
                        ${verificad}
                    >
                `
                ListCardDescont.appendChild(box);
                requestAnimationFrame(() => box.classList.add("card-visible"));
            }, index * 300); // 150ms entre cada card
        })
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



        //         TotalValue.innerHTML = formatarMoeda.format(valueAnterior)
        // const ValorTotal = Number(TotalValue.textContent.replace(/[^\d,]/g, '').replace(',', '.'));
        // const percentual = descontBase[0].valueDescont / 100
        // const result = valueAnterior - (valueAnterior * percentual)

        // console.log(result, percentual)
        // btnDescont.textContent = descontBase[0].title + ' APLICADO'
        // TotalValue.innerHTML = formatarMoeda.format(result)

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


const claerCacheDiscont = () => {
    descontBase.length = 0
    btnDescont.textContent = '5% OFF acima de R$ 100';
    btnDescont.style.textDecoration = 'none';
    btnDescont.style.cursor = 'default';
}
// =======================================
// ==(PAINEL PAINEL DE FINALIZAR PEDIDO)==
// =======================================
const windFinalized = document.querySelector('.wind-Finalized')

const boxConfirmed = document.querySelector('.box-confirmed')
const boxProgress = document.querySelector('.box-Progress')
const boxfinished = document.querySelector('.box-finished')

const btnFinalizedF = document.querySelector('.btn-finalized')
const btnConfimarBack = document.querySelector('.btn-confimarBack')
const btnConfimarComprar = document.querySelector('.btn-confimarComprar')

const SobraDiscont = document.querySelector('.listG-discont')
const TotalValueFi = document.querySelector('.listG-Total')

const TextCupom = document.querySelector('.text-cupom-disc')
const contListFinal = document.querySelector('.box-Lista-All-confimed')
const renderListFinal = () => {
    contListFinal.innerHTML = ''
    pedidosClient.forEach((item, index) => {
        const itens = document.createElement('div')
        itens.classList.add('cart-row-listG')
        itens.innerHTML = `
                <span>${item.nome}</span>
                <span>${item.qtd}x</span>
                <span>${formatarMoeda.format(item.valorUni)}</span>
                <span>${formatarMoeda.format(item.valor)}</span>
        `
        contListFinal.appendChild(itens)
    });
    const valueAnterior = Number(finalValue.textContent.replace(/[^\d,]/g, '').replace(',', '.'));
    const ValorTotal = Number(TotalValue.textContent.replace(/[^\d,]/g, '').replace(',', '.'));

    if (descontBase.length !== 0) {
        const percentual = descontBase[0].valueDescont / 100
        const resto = valueAnterior * percentual

        SobraDiscont.textContent = formatarMoeda.format(valueAnterior) + ' - ' + formatarMoeda.format(resto)
        TotalValueFi.textContent = formatarMoeda.format(ValorTotal)
        TextCupom.textContent = descontBase[0].title + ' APLICADO COM SUCESSO!'
    } else {
        SobraDiscont.textContent = 'R$ 0'
        TotalValueFi.textContent = formatarMoeda.format(ValorTotal)
        TextCupom.textContent = 'Nenhum cupom de desconto foi aplicado.'
    }
}


const clearListFinal = () => {
    contListFinal.innerHTML = ''
    SobraDiscont.textContent = ''
    TotalValueFi.textContent = ''
    TextCupom.textContent = ''
}

const windFinalPanelOpen = (showPanel) => {
    const show = showPanel === `active`
    if (show) {
        windFinalized.style.display = `flex`
        requestAnimationFrame(() => {
            windFinalized.style.opacity = '1'
            renderListFinal()
            elShow2(boxConfirmed)
        })
    } else {
        windFinalized.style.opacity = '0';
        windFinalized.addEventListener('transitionend', (e) => {
            if (e.propertyName !== 'opacity') return;
            windFinalized.style.display = 'none';
            clearListFinal()
        }, { once: true });
    }
}

btnFinalizedF.addEventListener('click', () => {
    pedidosClient.length !== 0 && windFinalPanelOpen('active')
})

btnConfimarBack.addEventListener('click', () => {
    windFinalPanelOpen()
})

// ─── Constantes ───────────────────────────────────────────────
const barraPrograss = document.querySelector('.barra-Prograss')
const TIMER_PROGRESS = 9000 // ms

// ─── Utilitários de exibição ──────────────────────────────────
const elShow2 = (el) => {
    el.style.display = 'flex'
    requestAnimationFrame(() => el.style.opacity = '1')
}
const elHide2 = (el) => {
    el.style.opacity = '0'
    el.style.display = 'none'
}

btnConfimarComprar.addEventListener('click', iniciarFluxoCompra)

function iniciarFluxoCompra() {
    elHide2(boxConfirmed)
    clearListFinal()
    iniciarProgress()
}

const iniciarProgress = () => {
    elShow2(boxProgress)
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            barraPrograss.classList.add('activeBarr')
        })
    })
    setTimeout(() => {
        barraPrograss.classList.remove('activeBarr')
        elHide2(boxProgress)
        iniciarConcluido()
    }, TIMER_PROGRESS)
}

const iniciarConcluido = () => {
    elShow2(boxfinished)
    setTimeout(() => {
        windFinalPanelOpen(`remove`, true)
        elHide2(boxfinished)
        elHide2(boxConfirmed)
    }, TIMER_PROGRESS)

    setTimeout(() => {
        clickOpenInicia()
    }, TIMER_PROGRESS + 1200)
}


