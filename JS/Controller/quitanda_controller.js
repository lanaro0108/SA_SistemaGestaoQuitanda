import { Produto } from '../Model/quitanda_model.js';

// Exporta a classe QuitandaController para ser usada em outros arquivos
export class QuitandaController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    // Inicializa a aplicação renderizando os produtos e o histórico
    init() {
        this.view.render(this.model.produtos);
        this.view.renderHistorico(this.model.historico);
    }

    // Adiciona um novo produto ou atualiza um existente, validando os dados de entrada
    adicionar() {
        const nome = document.getElementById('nome').value.trim();
        const categoria = document.getElementById('categoria').value.trim();
        const preco = parseFloat(document.getElementById('preco').value);
        const qtd = parseInt(document.getElementById('quantidade').value, 10);

        if (!nome) {
            this.view.showMessage('Nome do produto é obrigatório.', 'erro');
            return;
        }

        if (!categoria) {
            this.view.showMessage('Categoria é obrigatória.', 'erro');
            return;
        }

        if (isNaN(preco) || preco <= 0) {
            this.view.showMessage('Preço deve ser maior que zero.', 'erro');
            return;
        }

        if (isNaN(qtd) || qtd <= 0) {
            this.view.showMessage('Quantidade deve ser maior que zero.', 'erro');
            return;
        }

        // Cria um novo produto e cadastra no modelo, depois atualiza a view
        const novoProduto = new Produto(nome, categoria, preco, qtd);
        this.model.cadastrar(novoProduto);
        this.view.render(this.model.produtos);
        this.view.renderHistorico(this.model.historico);
        this.view.showMessage('Produto cadastrado/atualizado com sucesso.', 'sucesso');
        this.limparCampos();
    }

    // Realiza a venda de um produto, atualizando o estoque e o histórico e exibindo mensagens de sucesso ou erro
    vender(nome, categoria) {
        if (this.model.vender(nome, categoria)) {
            this.view.render(this.model.produtos);
            this.view.renderHistorico(this.model.historico);
            this.view.showMessage('Venda realizada com sucesso.', 'sucesso');
        } else {
            this.view.showMessage('Estoque insuficiente para venda.', 'erro');
        }
    }

    // Limpa os campos do formulário após o cadastro de um produto
    limparCampos() {
        document.getElementById('nome').value = '';
        document.getElementById('categoria').value = '';
        document.getElementById('preco').value = '';
        document.getElementById('quantidade').value = '';
    }
}