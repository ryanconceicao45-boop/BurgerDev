// Funcao para voltar para o menu principal
const windInicial = document.querySelector(".wind-inicial")
const windMenu = document.querySelector(".options-menu")
const windCardapio = document.querySelector(".wind-cardapio")
const time = 0.3
const openMenu = (show) => {
    windMenu.style.transition = `opacity ${time}s ease`
    if (show === "add") {
        windMenu.style.display = "flex"
        requestAnimationFrame(() => {
            windMenu.style.opacity = "1"
        })
    } else {
        windMenu.style.opacity = "0"
        setTimeout(() => {
            windMenu.style.display = "none"
        }, time * 1000);
    }
}

const AnimInicial = (show) => {
    windInicial.style.transition = `all ${time}s ease`
    if (show === "add") {
        windInicial.style.transform = "translateX(100vw)"
        windInicial.style.opacity = "0"
        setTimeout(() => {
            windInicial.style.display = "none"
        }, time * 1000);
        setTimeout(() => {
            AnimCardapio('add')
        }, time * 1000);
    } else {
        AnimCardapio('remove')
        setTimeout(() => {
            windInicial.style.display = "flex"
            requestAnimationFrame(() => {
                windInicial.style.transform = "translateX(0)"
                windInicial.style.opacity = "1"
            })
        }, time * 1000);
    }
}


const AnimCardapio = (show) => {
    windCardapio.style.transition = `all ${time}s ease`
    if (show === "add") {
        windCardapio.classList.add("activeC")
        allMenu()
    } else {
        windCardapio.classList.remove("activeC")
    }
}


let aberto = false
let animation = false
const clickOpenInicia = (acao) => {
    if (animation) return
    animation = true
    aberto = !aberto
    AnimInicial(aberto ? "add" : "remove")
    openMenu(aberto ? "add" : "remove")
    setTimeout(() => {
        animation = false
    }, 1500);
}