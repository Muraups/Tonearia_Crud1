// frontend/script.js
document.getElementById('form-servico').addEventListener('submit', async (e) => {
  e.preventDefault();

  const form = e.target;
  const dados = {
    cliente: form.cliente.value,
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

    if (!resposta.ok) throw new Error('Erro ao cadastrar serviço');
    const servicoCriado = await resposta.json();
    alert('Serviço cadastrado com sucesso!');
    form.reset();
  } catch (erro) {
    alert('Erro: ' + erro.message);
  }
});
