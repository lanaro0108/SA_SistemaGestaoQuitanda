export class QuitandaView {
    // Renderiza/Atualiza a lista de produtos
    render(produtos) {
        const lista = document.getElementById('lista-estoque');
        lista.innerHTML = '';

        produtos.forEach(p => {
            lista.innerHTML += `
                <tr>
                    <td>${p.id}</td>
                    <td>${p.nome}</td>
                    <td>${p.categoria}</td>
                    <td>R$ ${p.preco.toFixed(2)}</td>
                    <td>${p.quantidade}</td>
                    <td><button onclick="window.controller.vender('${p.nome}', '${p.categoria}')">Vender 1 un.</button></td>
                </tr>
            `;
        });
    }

    // Renderiza/Atualiza o histórico de movimentações
    renderHistorico(historico) {
        const lista = document.getElementById('lista-historico');
        lista.innerHTML = '';

        historico.forEach(item => {
            // HTML para cada movimentação no histórico
            lista.innerHTML += `
                <tr>
                    <td>${item.tipo}</td>
                    <td>${item.nome}</td>
                    <td>${item.categoria}</td>
                    <td>${item.quantidade}</td>
                    <td>R$ ${item.preco.toFixed(2)}</td>
                    <td>${item.data}</td>
                </tr>
            `;
        });
    }

    // Exibe mensagens de sucesso ou erro
    showMessage(texto, tipo) {
        const mensagem = document.getElementById('mensagem');
        if (!mensagem) return; // Verifica se o elemento existe
        mensagem.textContent = texto;
        mensagem.className = `mensagem ${tipo}`;
        setTimeout(() => {
            mensagem.textContent = '';
            mensagem.className = 'mensagem';
        }, 3000); // Limpa a mensagem após 3 segundos
    }
}