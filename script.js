const btnsAdicionarCarrinho = document.querySelectorAll(
  ".btn-adicionar-carrinho"
);
const ulCarrinho = document.querySelector(".carrinho");
const valorTotalElement = document.querySelector("#valor-total");

btnsAdicionarCarrinho.forEach(function (btnAdicionarCarrinho) {
  btnAdicionarCarrinho.addEventListener("click", function (evento) {
    const divPai = evento.target.parentElement;
    const nomeProduto = divPai.querySelector(".nome-produto").innerText;
    const produtosNoCarrinho = ulCarrinho.querySelectorAll("li");

    let itemExistente = false;
    produtosNoCarrinho.forEach(function (item) {
      if (item.innerText.includes(nomeProduto)) {
        const quantidadeAtual = parseInt(item.innerText.split("x")[1]);
        item.innerText = `${nomeProduto} x${quantidadeAtual + 1}`;
        itemExistente = true;
      }
    });

    if (!itemExistente) {
      const liProduto = document.createElement("li");
      liProduto.innerText = `${nomeProduto} x1`;
      ulCarrinho.appendChild(liProduto);
    }

    const valorTotal = calcularValorTotal();
    valorTotalElement.textContent = `Valor: R$ ${valorTotal.toFixed(2)}`;
  });
});

const btnLimparCompras = document.querySelector(".btn-limpar-compras");

btnLimparCompras.addEventListener("click", function () {
  ulCarrinho.innerHTML = "";
  valorTotalElement.textContent = "";
});

function calcularValorTotal() {
  const produtosNoCarrinho = ulCarrinho.querySelectorAll("li");
  let valorTotal = 0;
  produtosNoCarrinho.forEach(function (item) {
    const nomeProduto = item.innerText.split("x")[0].trim();
    const quantidade = parseInt(item.innerText.split("x")[1]);
    const valorProduto = parseFloat(getValorProduto(nomeProduto));
    valorTotal += valorProduto * quantidade;
  });
  return valorTotal;
}

function getValorProduto(nomeProduto) {
  const caixasProdutos = document.querySelectorAll(".caixa");
  for (let i = 0; i < caixasProdutos.length; i++) {
    const caixaProduto = caixasProdutos[i];
    const nome = caixaProduto.querySelector(".nome-produto").innerText;
    const valor = caixaProduto.querySelector("h2").innerText.replace("R$ ", "");
    if (nome === nomeProduto) {
      return valor;
    }
  }
}
