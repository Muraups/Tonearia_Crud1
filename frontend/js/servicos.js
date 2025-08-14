document.addEventListener('DOMContentLoaded', async () => {
    const form = document.getElementById('form-servico');
    const clienteSelect = document.getElementById('clienteId');

    // Função para carregar clientes no select
    const carregarClientes = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/clientes');
            if (!response.ok) throw new Error('Falha ao buscar clientes.');
            
            const clientes = await response.json();
            
            clienteSelect.innerHTML = '<option value="">Selecione o cliente</option>'; // Limpa opções antigas
            clientes.forEach(cliente => {
                const option = document.createElement('option');
                option.value = cliente.id;
                option.textContent = cliente.nome;
                clienteSelect.appendChild(option);
            });
        } catch (error) {
            clienteSelect.innerHTML = '<option value="">Erro ao carregar</option>';
            alert('Erro: ' + error.message);
        }
    };

    // Carrega os clientes ao iniciar a página
    await carregarClientes();

    // Evento de submit do formulário
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const dados = {
            clienteId: form.clienteId.value, // Envia o ID do cliente
            servico: form.servico.value,
            data: form.data.value,
            status: form.status.value,
            valorServico: parseFloat(form.valorServico.value || 0),
            gasto: parseFloat(form.gasto.value || 0)
        };

        try {
            const resposta = await fetch('http://localhost:3000/api/servicos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dados)
            });

            if (!resposta.ok) {
                const erroData = await resposta.json();
                throw new Error(erroData.mensagem || 'Erro ao cadastrar serviço');
            }
            
            alert('Serviço cadastrado com sucesso!');
            form.reset();
            // Recarrega o valor padrão do select de clientes
            clienteSelect.selectedIndex = 0; 
        } catch (erro) {
            alert('Erro: ' + erro.message);
        }
    });
});