document.addEventListener('DOMContentLoaded', async () => {
    const form = document.getElementById('form-cliente');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const dados = {
            nome: form.nome.value,
            telefone: form.telefone.value,
            endereco: form.endereco.value
        };

        try{
            const resposta = await fetch('http://localhost:3000/api/clientes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dados)
            });

            if (!resposta.ok) {
                const erroData = await resposta.json();
                throw new Error(erroData.mensagem || 'Erro ao cadastrar Cliente');
            }
            
            alert('Cliente cadastrado com sucesso!');
            form.reset();
        } catch (erro) {
            alert('Erro: ' + erro.message);
        }

    });
});










