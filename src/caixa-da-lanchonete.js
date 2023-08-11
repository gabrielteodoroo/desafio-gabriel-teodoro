import { itensCardapio } from "./cardapio.js";

class CaixaDaLanchonete {
  cardapio;
  formasDePagamento = [];

  constructor() {
    this.cardapio = itensCardapio;
    this.formasDePagamento = ["credito", "debito", "dinheiro"];
  }

  calcularValorDaCompra(metodoDePagamento, itens) {
    let valorTotal = 0;
    let pedidos = itens.map((item) => item.split(","));

    if (itens.length === 0) {
      return `Não há itens no carrinho de compra!`;
    }

    if (!this.formasDePagamento.includes(metodoDePagamento)) {
      return `Forma de pagamento inválida!`;
    }

    for (const [codigo, qtd] of pedidos) {
      if (!this.cardapio[codigo]) {
        return `Item inválido!`;
      }
      if (parseInt(qtd) === 0) {
        return `Quantidade inválida!`;
      }
      if (
        codigo === "queijo" &&
        !pedidos.some((pedido) => pedido.includes("sanduiche"))
      ) {
        return `Item extra não pode ser pedido sem o principal`;
      }
      if (
        codigo === "chantily" &&
        !pedidos.some((pedido) => pedido.includes("cafe"))
      ) {
        return `Item extra não pode ser pedido sem o principal`;
      }
    }

    for (const [codigo, qtd] of pedidos) {
      valorTotal += this.cardapio[codigo].valor * parseInt(qtd);
    }

    if (metodoDePagamento === "dinheiro") {
      valorTotal -= valorTotal * 0.05;
    }
    if (metodoDePagamento === "credito") {
      valorTotal += valorTotal * 0.03;
    }

    return `R$ ${(valorTotal / 100).toFixed(2).replace(".", ",")}`;
  }
}

const exemplo1 = new CaixaDaLanchonete().calcularValorDaCompra("debito", [
  "chantily,1",
]);

const exemplo2 = new CaixaDaLanchonete().calcularValorDaCompra("debito", [
  "cafe,1",
  "chantily,1",
]);

const exemplo3 = new CaixaDaLanchonete().calcularValorDaCompra("credito", [
  "combo1,1",
  "cafe,2",
]);

console.log(exemplo1);
console.log(exemplo2);
console.log(exemplo3);

export { CaixaDaLanchonete };
