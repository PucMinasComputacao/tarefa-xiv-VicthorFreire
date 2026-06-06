const API_URL = "http://localhost:3000/produtos";

async function carregarGrafico() {

    const response = await fetch(API_URL);
    const produtos = await response.json();

    const categorias = {};

    produtos.forEach(produto => {

        if(categorias[produto.categoria]) {
            categorias[produto.categoria]++;
        } else {
            categorias[produto.categoria] = 1;
        }

    });

    const labels = Object.keys(categorias);
    const valores = Object.values(categorias);

    new Chart(
        document.getElementById("graficoCategorias"),
        {
            type: "pie",
            data: {
                labels: labels,
                datasets: [{
                    data: valores
                }]
            }
        }
    );
}

carregarGrafico();