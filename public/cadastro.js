const formProduto = document.getElementById("formProduto");
const message = document.getElementById("message");
const API_URL = "http://localhost:3000/produtos";

formProduto.addEventListener("submit", async (event) => {
    event.preventDefault();

    const produto = {
        nome: document.getElementById("nome").value,
        descricaoCurta: document.getElementById("descricaoCurta").value,
        descricaoCompleta: document.getElementById("descricaoCompleta").value,
        imagem: document.getElementById("imagem").value,
        categoria: document.getElementById("categoria").value,
        preco: Number(document.getElementById("preco").value),
        tags: document.getElementById("tags").value.split(",").map(tag => tag.trim()),
        destaque: document.getElementById("destaque").checked,
        emEstoque: document.getElementById("emEstoque").checked
    };

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(produto)
        });

        if (!response.ok) {
            throw new Error("Erro ao cadastrar produto");
        }

        message.textContent = "Produto cadastrado com sucesso!";
        message.className = "success";
        formProduto.reset();
    } catch (error) {
        message.textContent = "Erro ao cadastrar. Verifique se o JSON Server está rodando.";
        message.className = "error";
    }
});
