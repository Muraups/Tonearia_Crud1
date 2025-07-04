// frontend/js/view-servicos.js

document.addEventListener('DOMContentLoaded', () => {
    const loadingMessage = document.getElementById('loading-message');
    const errorMessage = document.getElementById('error-message');
    const noServicesMessage = document.getElementById('no-services-message');
    const servicosTableBody = document.querySelector('#servicos-table tbody');

    const fetchServices = async () => {
        loadingMessage.style.display = 'block'; // Mostra mensagem de carregamento
        errorMessage.style.display = 'none';    // Esconde mensagem de erro
        noServicesMessage.style.display = 'none'; // Esconde mensagem de "nenhum serviço"
        servicosTableBody.innerHTML = '';       // Limpa a tabela antes de carregar novos dados

        try {
            const apiUrl = 'http://localhost:3000/api/servicos'; 

            const response = await fetch(apiUrl);

            if (!response.ok) {
                throw new Error(`Erro HTTP! Status: ${response.status}`);
            }

            const servicos = await response.json();

            loadingMessage.style.display = 'none'; // Esconde mensagem de carregamento

            if (servicos.length === 0) {
                noServicesMessage.style.display = 'block'; // Mostra mensagem de "nenhum serviço"
                return; // Sai da função se não houver serviços
            }

            servicos.forEach(servico => {
                const row = servicosTableBody.insertRow(); // Insere uma nova linha na tabela

                row.insertCell().textContent = servico.id || 'N/A';
                row.insertCell().textContent = servico.cliente || 'N/A';
                row.insertCell().textContent = servico.servico || 'N/A';
                row.insertCell().textContent = servico.data ? new Date(servico.data).toLocaleDateString('pt-BR') : 'N/A';
                row.insertCell().textContent = servico.status || 'N/A';
                row.insertCell().textContent = `R$ ${parseFloat(servico.valorServico || 0).toFixed(2).replace('.', ',')}`;
                row.insertCell().textContent = `R$ ${parseFloat(servico.gasto || 0).toFixed(2).replace('.', ',')}`;

                const acoesCell = row.insertCell();
                const editButton = document.createElement('a');
                editButton.onclick = () => console.log('Editando serviço com ID:', servico.id);                
                editButton.href = `edit_servico.html?id=${servico.id}`; // Passa o ID na URL
                editButton.textContent = 'Editar';
                editButton.classList.add('edit-button'); // Adiciona uma classe para estilização
                acoesCell.appendChild(editButton);
            });
        } catch (error) {
            loadingMessage.style.display = 'none'; // Esconde mensagem de carregamento
            errorMessage.textContent = `Falha ao carregar serviços: ${error.message}. Verifique se o backend está rodando e a URL da API está correta.`;
            errorMessage.style.display = 'block'; // Mostra mensagem de erro
            console.error('Erro ao buscar serviços:', error);
        }
    };

    fetchServices();
});
