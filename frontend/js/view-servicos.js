document.addEventListener('DOMContentLoaded', () => {
    const loadingMessage = document.getElementById('loading-message');
    const errorMessage = document.getElementById('error-message');
    const noServicesMessage = document.getElementById('no-services-message');
    const servicosTableBody = document.querySelector('#servicos-table tbody');

    const fetchServices = async () => {
        loadingMessage.style.display = 'block';
        errorMessage.style.display = 'none';
        noServicesMessage.style.display = 'none';
        servicosTableBody.innerHTML = '';

        try {
            const apiUrl = '/api/servicos';
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error(`Erro HTTP! Status: ${response.status}`);
            
            const servicos = await response.json();
            loadingMessage.style.display = 'none';

            if (servicos.length === 0) {
                noServicesMessage.style.display = 'block';
                return;
            }

            servicos.forEach(servico => {
                const row = servicosTableBody.insertRow();
                
                row.insertCell().textContent = servico.id;
                // A API agora retorna um objeto 'cliente' aninhado
                row.insertCell().textContent = servico.cliente ? servico.cliente.nome : 'N/A';
                row.insertCell().textContent = servico.servico || 'N/A';
                // Adiciona 1 dia à data para corrigir problema de fuso horário na exibição
                const dataCorrigida = new Date(servico.data);
                dataCorrigida.setMinutes(dataCorrigida.getMinutes() + dataCorrigida.getTimezoneOffset());
                row.insertCell().textContent = dataCorrigida.toLocaleDateString('pt-BR');

                row.insertCell().textContent = servico.status || 'N/A';
                row.insertCell().textContent = `R$ ${parseFloat(servico.valorServico || 0).toFixed(2).replace('.', ',')}`;
                row.insertCell().textContent = `R$ ${parseFloat(servico.gasto || 0).toFixed(2).replace('.', ',')}`;

                const acoesCell = row.insertCell();
                const editButton = document.createElement('a');
                editButton.href = `edit_servico.html?id=${servico.id}`;
                editButton.textContent = 'Editar';
                editButton.classList.add('edit-button');
                acoesCell.appendChild(editButton);
            });
        } catch (error) {
            loadingMessage.style.display = 'none';
            errorMessage.textContent = `Falha ao carregar serviços: ${error.message}.`;
            errorMessage.style.display = 'block';
            console.error('Erro ao buscar serviços:', error);
        }
    };

    fetchServices();
});