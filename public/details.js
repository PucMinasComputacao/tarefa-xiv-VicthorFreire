const detailsContainer = document.getElementById("details");
const API_URL = "http://localhost:3000/produtos";

function formatPrice(preco) {
    return "R$ " + Number(preco).toFixed(2).replace(".", ",");
}

function renderError(message) {
    detailsContainer.innerHTML = `<p class="error">${message}</p>`;
}

function renderDetails(produto) {
    detailsContainer.innerHTML = `
        <img src="${produto.imagem}" alt="Imagem de ${produto.nome}">
        <div class="details-content">
            <span class="category">${produto.categoria}</span>
            <h2>${produto.nome}</h2>
            <p><strong>Preço:</strong> ${formatPrice(produto.preco)}</p>
            <p><strong>Estoque:</strong> ${produto.emEstoque ? "Disponível" : "Indisponível"}</p>
            <p>${produto.descricaoCompleta}</p>
            <div class="tags">
                ${produto.tags.map(tag => `<span>${tag}</span>`).join("")}
            </div>
        </div>
    `;
}

async function fetchProductById(id) {
    const response = await fetch(`${API_URL}/${id}`);

    if (!response.ok) {
        throw new Error("Produto não encontrado");
    }

    return await response.json();
}

async function initDetails() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) {
        renderError("Nenhum ID foi informado na URL.");
        return;
    }

    try {
        const produto = await fetchProductById(id);
        renderDetails(produto);
    } catch (error) {
        renderError("Produto não encontrado ou servidor indisponível.");
    }
}

initDetails();
