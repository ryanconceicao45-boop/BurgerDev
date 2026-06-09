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
