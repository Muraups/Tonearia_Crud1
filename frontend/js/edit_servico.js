// frontend/js/edit-servico.js

document.addEventListener('DOMContentLoaded', async () => {
    const formServicoEdicao = document.getElementById('form-servico-edicao');
    const servicoIdInput = document.getElementById('servico-id');
    const deleteButton = document.getElementById('delete-button'); // NOVO: Referência ao botão de exclusão

    const getServicoIdFromUrl = () => {
        const params = new URLSearchParams(window.location.search);
        return params.get('id');
    };

    const servicoId = getServicoIdFromUrl();
    console.log('ID do serviço na URL:', servicoId);

    if (!servicoId) {
        alert('Erro: ID do serviço não encontrado na URL para edição.');
        window.location.href = 'view_servicos.html';
        return;
    }

    servicoIdInput.value = servicoId;

    const carregarServicoParaEdicao = async (id) => {
        try {
            const apiUrl = `http://localhost:3000/api/servicos/${id}`;
            console.log('Buscando serviço em:', apiUrl);

            const response = await fetch(apiUrl);
            console.log('Resposta bruta do fetch (status):', response.status);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Resposta de erro do backend:', errorText);
                if (response.status === 404) {
                    throw new Error('Serviço não encontrado (404).');
                }
                throw new Error(`Erro ao carregar serviço: Status ${response.status}`);
            }

            const servico = await response.json();
            console.log('Dados do serviço carregado:', servico);

            document.getElementById('cliente').value = servico.cliente || '';
            document.getElementById('servico').value = servico.servico || '';
            document.getElementById('data').value = servico.data ? servico.data.split('T')[0] : '';
            document.getElementById('status').value = servico.status || '';
            document.getElementById('valorServico').value = servico.valorServico || 0;
            document.getElementById('gasto').value = servico.gasto || 0;

        } catch (error) {
            alert('Erro ao carregar serviço: ' + error.message);
            console.error('Erro ao carregar serviço para edição:', error);
            window.location.href = 'view_servicos.html';
        }
    };

    carregarServicoParaEdicao(servicoId);

    formServicoEdicao.addEventListener('submit', async (e) => {
        e.preventDefault();

        const dadosAtualizados = {
            cliente: formServicoEdicao.cliente.value,
            servico: formServicoEdicao.servico.value,
            data: formServicoEdicao.data.value,
            status: formServicoEdicao.status.value,
            valorServico: parseFloat(formServicoEdicao.valorServico.value || 0),
            gasto: parseFloat(formServicoEdicao.gasto.value || 0)
        };

        try {
            const apiUrlUpdate = `http://localhost:3000/api/servicos/${servicoId}`;
            console.log('Enviando atualização para:', apiUrlUpdate, 'com dados:', dadosAtualizados);

            const response = await fetch(apiUrlUpdate, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dadosAtualizados)
            });

            console.log('Resposta de atualização bruta (status):', response.status);

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Dados de erro da atualização:', errorData);
                throw new Error(errorData.mensagem || `Erro ao atualizar serviço: Status ${response.status}`);
            }

            alert('Serviço atualizado com sucesso!');
            window.location.href = 'view_servicos.html';
        } catch (error) {
            alert('Erro: ' + error.message);
            console.error('Erro ao atualizar serviço:', error);
        }
    });

    deleteButton.addEventListener('click', async () => {
        if (confirm('Tem certeza que deseja EXCLUIR este serviço? Esta ação é irreversível.')) {
            try {
                const apiUrlDelete = `http://localhost:3000/api/servicos/${servicoId}`; // URL para DELETE
                console.log('Enviando requisição DELETE para:', apiUrlDelete);

                const response = await fetch(apiUrlDelete, {
                    method: 'DELETE'
                });

                console.log('Resposta de exclusão bruta (status):', response.status);

                if (!response.ok) {
                    const errorData = await response.json();
                    console.error('Dados de erro da exclusão:', errorData);
                    throw new Error(errorData.mensagem || `Erro ao excluir serviço: Status ${response.status}`);
                }

                alert('Serviço excluído com sucesso!');
                window.location.href = 'view_servicos.html'; // Redireciona para a lista após a exclusão
            } catch (error) {
                alert('Erro ao excluir serviço: ' + error.message);
                console.error('Erro ao excluir serviço:', error);
            }
        }
    });
});
