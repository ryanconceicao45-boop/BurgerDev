const listProducts = [
  {
    nome: "X-Salada",
    prince: 30,
    vegan: false,
    src: "xsalada",
    ingredients: [
      "Pão de hambúrguer",
      "Hambúrguer bovino",
      "Queijo mussarela",
      "Alface",
      "Tomate",
      "Maionese",
      "Ketchup",
      "Mostarda"
    ]
  },
  {
    nome: "X-Bacon",
    prince: 35,
    vegan: false,
    src: "xbacon",
    ingredients: [
      "Pão de hambúrguer",
      "Hambúrguer bovino",
      "Bacon crocante",
      "Queijo mussarela",
      "Alface",
      "Tomate",
      "Maionese",
      "Ketchup"
    ]
  },
  {
    nome: "X-Egg Bacon",
    prince: 38,
    vegan: false,
    src: "xeggbacon",
    ingredients: [
      "Pão de hambúrguer",
      "Hambúrguer bovino",
      "Ovo",
      "Bacon crocante",
      "Queijo mussarela",
      "Alface",
      "Tomate",
      "Maionese"
    ]
  },
  {
    nome: "X-Tudo",
    prince: 39.90,
    vegan: false,
    src: "xtudo",
    ingredients: [
      "Pão de hambúrguer",
      "Hambúrguer bovino",
      "Ovo",
      "Bacon crocante",
      "Queijo mussarela",
      "Alface",
      "Tomate",
      "Cebola",
      "Maionese",
      "Ketchup",
      "Mostarda"
    ]
  },
  {
    nome: "Chicken Crispy",
    prince: 32,
    vegan: false,
    src: "ChickenCrispy",
    ingredients: [
      "Pão de hambúrguer",
      "Frango empanado crocante",
      "Queijo mussarela",
      "Alface",
      "Tomate",
      "Maionese",
      "Ketchup"
    ]
  },
  {
    nome: "Green Burger",
    prince: 28,
    vegan: true,
    src: "GreenBurger",
    ingredients: [
      "Pão integral",
      "Hambúrguer de grão de bico",
      "Alface",
      "Rúcula",
      "Tomate",
      "Abacate",
      "Maionese verde"
    ]
  },
  {
    nome: "Nature Burger",
    prince: 31,
    vegan: true,
    src: "NatureBurger",
    ingredients: [
      "Pão integral",
      "Hambúrguer de cogumelo e grão de bico",
      "Alface",
      "Tomate",
      "Cenoura ralada",
      "Maionese natural",
      "Gergelim"
    ]
  },
  {
    nome: "Veggie Supreme",
    prince: 36,
    vegan: true,
    src: "VeggieSupreme",
    ingredients: [
      "Pão integral",
      "Hambúrguer vegetariano premium",
      "Queijo vegano",
      "Alface",
      "Rúcula",
      "Tomate",
      "Cenoura",
      "Abacate",
      "Maionese vegana"
    ]
  }
]


const listDiscont = [
  {
    title: "DESCONTO DE 5%",
    description: "Economize agora!",
    aboveDescont: 100,
    valueDescont: 5,
  },
  {
    title: "DESCONTO DE 10%",
    description: "Economize ainda mais!",
    aboveDescont: 200,
    valueDescont: 10,
  },
  {
    title: "DESCONTO DE 15%",
    description: "Melhor oferta disponível!",
    aboveDescont: 300,
    valueDescont: 15,
  },
];

const formatarMoeda = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL"
});
