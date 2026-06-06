const API_URL = "http://localhost:3000/produtos";

const productList = document.getElementById("product-list");
const searchInput = document.getElementById("search");
const categorySelect = document.getElementById("category");
const btnRender = document.getElementById("btnRender");

let produtos = [];

function formatPrice(preco) {
    return "R$ " + Number(preco).toFixed(2).replace(".", ",");
}

async function fetchItems() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Erro ao buscar produtos");
        }

        return await response.json();
    } catch (error) {
        productList.innerHTML = "<p>Não foi possível carregar os produtos. Verifique se o JSON Server está rodando.</p>";
        return [];
    }
}

function createCard(produto) {
    const card = document.createElement("article");
    card.classList.add("card");
    card.setAttribute("data-id", produto.id);

    if (produto.destaque) {
        card.classList.add("highlight");
    }

    card.innerHTML = `
        <img src="${produto.imagem}" alt="Imagem de ${produto.nome}">
        <div class="card-content">
            <span class="category">${produto.categoria}</span>
            <h2>${produto.nome}</h2>
            <p>${produto.descricaoCurta}</p>
            <strong>${formatPrice(produto.preco)}</strong>
            <p class="stock">${produto.emEstoque ? "Disponível" : "Indisponível"}</p>
            <a class="btn" href="details.html?id=${produto.id}">Ver detalhes</a>
        </div>
    `;

    return card;
}

function renderCards(items) {
    productList.innerHTML = "";

    if (items.length === 0) {
        productList.innerHTML = "<p>Nenhum produto encontrado.</p>";
        return;
    }

    items.forEach(item => {
        const card = createCard(item);
        productList.appendChild(card);
    });
}

function renderCategories() {
    const categorias = ["Todas"];

    produtos.forEach(produto => {
        if (!categorias.includes(produto.categoria)) {
            categorias.push(produto.categoria);
        }
    });

    categorySelect.innerHTML = "";

    categorias.forEach(categoria => {
        const option = document.createElement("option");
        option.value = categoria;
        option.textContent = categoria;
        categorySelect.appendChild(option);
    });
}

function filterProducts() {
    const texto = searchInput.value.toLowerCase();
    const categoria = categorySelect.value;

    const filtrados = produtos.filter(produto => {
        const nomeOk = produto.nome.toLowerCase().includes(texto);
        const categoriaOk = categoria === "Todas" || produto.categoria === categoria;
        return nomeOk && categoriaOk;
    });

    renderCards(filtrados);
}

async function init() {
    produtos = await fetchItems();
    renderCategories();
    renderCards(produtos);
}

searchInput.addEventListener("input", filterProducts);
categorySelect.addEventListener("change", filterProducts);

btnRender.addEventListener("click", () => {
    searchInput.value = "";
    categorySelect.value = "Todas";
    renderCards(produtos);
});

init();
