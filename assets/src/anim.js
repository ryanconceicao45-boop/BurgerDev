const windInicial = document.querySelector(".wind-inicial");
const windMenu = document.querySelector(".options-menu");
const windCardapio = document.querySelector(".wind-cardapio");

const TIME_S = 1000;

const nextFrame = (cb) => requestAnimationFrame(() => requestAnimationFrame(cb));

function showElement(el) {
    el.style.display = "flex";
    nextFrame(() => {
        el.classList.add("is-visible");
    });
}

function hideElement(el, callback) {
    el.classList.remove("is-visible");
    const onEnd = (e) => {
        if (e.propertyName !== "opacity") return;
        el.style.display = "none";
        el.removeEventListener("transitionend", onEnd);
        callback?.();
    };
    el.addEventListener("transitionend", onEnd);
}

function reverseHide(el) {
    el.classList.add("is-visible");

    const onEnd = (e) => {
        if (e.propertyName !== "opacity") return;
        el.style.display = "none";
        el.removeEventListener("transitionend", onEnd);
        showElement(windCardapio);
        showElement(windMenu)
    };

    el.addEventListener("transitionend", onEnd);
}

function reverseShow(el) {
    hideElement(windCardapio, () => {
        el.style.display = "flex";
        nextFrame(() => {
            el.classList.remove("is-visible");
        });
    });
}

function startAnimationPanel(open) {
    if (open) {
        allMenu()
        reverseHide(windInicial);
    } else {
        claerListPedidos();
        hideElement(windMenu)
        reverseShow(windInicial);
    }
}

let aberto = false;
let animation = false;

function clickOpenInicia() {
    if (animation) return;
    animation = true;
    aberto = !aberto;
    startAnimationPanel(aberto);
    setTimeout(() => { animation = false; }, TIME_S + 200);
}