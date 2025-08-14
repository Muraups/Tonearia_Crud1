document.addEventListener('DOMContentLoaded', async () => {
    const formServicoEdicao = document.getElementById('form-servico-edicao');
    const servicoIdInput = document.getElementById('servico-id');
    const deleteButton = document.getElementById('delete-button');
    const clienteSelect = document.getElementById('clienteId');

    const getServicoIdFromUrl = () => {
        const params = new URLSearchParams(window.location.search);
        return params.get('id');
    };

    const servicoId = getServicoIdFromUrl();

    if (!servicoId) {
        alert('Erro: ID do serviço não encontrado na URL.');
        window.location.href = 'view_servicos.html';
        return;
    }

    servicoIdInput.value = servicoId;

    // 1. Função para carregar todos os clientes no select
    const carregarClientes = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/clientes');
            if (!response.ok) throw new Error('Falha ao buscar clientes.');
            const clientes = await response.json();
            
            clienteSelect.innerHTML = '<option value="">Selecione o cliente</option>';
            clientes.forEach(cliente => {
                const option = document.createElement('option');
                option.value = cliente.id;
                option.textContent = cliente.nome;
                clienteSelect.appendChild(option);
            });
        } catch (error) {
            clienteSelect.innerHTML = '<option value="">Erro ao carregar</option>';
            console.error(error);
        }
    };

    // 2. Função para carregar os dados do serviço específico
    const carregarServicoParaEdicao = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/api/servicos/${id}`);
            if (!response.ok) {
                if (response.status === 404) throw new Error('Serviço não encontrado (404).');
                throw new Error(`Erro ao carregar serviço: Status ${response.status}`);
            }

            const servico = await response.json();

            // Popula os campos do formulário
            document.getElementById('servico').value = servico.servico || '';
            document.getElementById('data').value = servico.data ? servico.data.split('T')[0] : '';
            document.getElementById('status').value = servico.status || '';
            document.getElementById('valorServico').value = servico.valorServico || 0;
            document.getElementById('gasto').value = servico.gasto || 0;
            
            // Pré-seleciona o cliente correto no select
            if (servico.clienteId) {
                clienteSelect.value = servico.clienteId;
            }

        } catch (error) {
            alert('Erro ao carregar serviço: ' + error.message);
            window.location.href = 'view_servicos.html';
        }
    };

    // 3. Execução em ordem: primeiro carrega clientes, depois os dados do serviço
    await carregarClientes();
    await carregarServicoParaEdicao(servicoId);

    // Evento para ATUALIZAR (PUT)
    formServicoEdicao.addEventListener('submit', async (e) => {
        e.preventDefault();

        const dadosAtualizados = {
            clienteId: formServicoEdicao.clienteId.value,
            servico: formServicoEdicao.servico.value,
            data: formServicoEdicao.data.value,
            status: formServicoEdicao.status.value,
            valorServico: parseFloat(formServicoEdicao.valorServico.value || 0),
            gasto: parseFloat(formServicoEdicao.gasto.value || 0)
        };

        try {
            const response = await fetch(`http://localhost:3000/api/servicos/${servicoId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dadosAtualizados)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.mensagem || 'Erro ao atualizar serviço.');
            }

            alert('Serviço atualizado com sucesso!');
            window.location.href = 'view_servicos.html';
        } catch (error) {
            alert('Erro: ' + error.message);
        }
    });

    // Evento para DELETAR
    deleteButton.addEventListener('click', async () => {
        if (confirm('Tem certeza que deseja EXCLUIR este serviço?')) {
            try {
                const response = await fetch(`http://localhost:3000/api/servicos/${servicoId}`, {
                    method: 'DELETE'
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.mensagem || 'Erro ao excluir serviço.');
                }

                alert('Serviço excluído com sucesso!');
                window.location.href = 'view_servicos.html';
            } catch (error) {
                alert('Erro ao excluir serviço: ' + error.message);
            }
        }
    });
});