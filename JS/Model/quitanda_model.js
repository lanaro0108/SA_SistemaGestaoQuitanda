export class Produto { // Exporta a classe Produto para ser usada em outros arquivos
    constructor(nome, categoria, preco, quantidade) {
        this.id = Date.now();
        this.nome = nome;
        this.categoria = categoria;
        this.preco = parseFloat(preco);
        this.quantidade = parseInt(quantidade, 10);
    }
}

// Exporta a classe QuitandaModel para ser usada em outros arquivos
export class QuitandaModel {
    constructor() {
        this.produtos = [];
        this.historico = [];
    }

    // Cadastra um novo produto ou atualiza a quantidade e preço se já existir
    cadastrar(dados) {
        const index = this.produtos.findIndex(p => p.nome.toLowerCase() === dados.nome.toLowerCase() && p.categoria.toLowerCase() === dados.categoria.toLowerCase());
        
        if (index !== -1) {
            this.produtos[index].quantidade += dados.quantidade;
            this.produtos[index].preco = dados.preco;
            this._registrarMovimentacao('Entrada', this.produtos[index], dados.quantidade);
        } else {
            const novo = new Produto(dados.nome, dados.categoria, dados.preco, dados.quantidade);
            this.produtos.push(novo);
            this._registrarMovimentacao('Entrada', novo, novo.quantidade);
        }
    }

    // Realiza a venda de um produto, reduz a quantidade em estoque
    vender(nome, categoria) {
        const produto = this.produtos.find(p => p.nome === nome && p.categoria === categoria);
        if (produto && produto.quantidade > 0) {
            produto.quantidade -= 1;
            this._registrarMovimentacao('Venda', produto, 1);
            return true;
        }
        return false;
    }

    // Registra uma movimentações de entradas e vendas no histórico
    _registrarMovimentacao(tipo, produto, quantidade) {
        const movimentacao = {
            tipo,
            nome: produto.nome,
            categoria: produto.categoria,
            quantidade,
            preco: produto.preco,
            data: new Date().toLocaleString()
        };
        this.historico.unshift(movimentacao);
    }
}