// JavaScript para seleção de dias e assentos
const botoesDia = document.querySelectorAll('.dia');
const sessoes = document.querySelectorAll('.sessao-cinema');

botoesDia.forEach(botao => {
  botao.addEventListener('click', () => {
    // Remove classe ativo de todos os botões
    botoesDia.forEach(b => b.classList.remove('ativo'));
    botao.classList.add('ativo');

    const diaSelecionado = botao.getAttribute('data-dia');

    // Mostrar apenas sessões do dia selecionado
    sessoes.forEach(sessao => {
      if (sessao.getAttribute('data-dia') === diaSelecionado) {
        sessao.style.display = 'block';
      } else {
        sessao.style.display = 'none';
      }
    });
  });
});

// --- ADICIONE ESTE BLOCO ABAIXO ---
window.addEventListener('DOMContentLoaded', () => {
  let botaoAtivo = document.querySelector('.dia.ativo') || botoesDia[0];
  if (botaoAtivo) botaoAtivo.click();
});


// Mapa de assentos
document.addEventListener('DOMContentLoaded', () => {
  const mapa = document.getElementById('mapaAssentos');
  const listaAssentos = document.getElementById('listaAssentos');
  const valorTotal = document.getElementById('valorTotal');
  const precoPorAssento = 10.00;

  // Gera os assentos dinamicamente
  for (let i = 1; i <= 96; i++) {
    const div = document.createElement('div');
    div.classList.add('assento');
    div.dataset.num = `G${i}`;
    div.textContent = i;
    if (i % 13 === 0 || i % 17 === 0) div.classList.add('ocupado');
    mapa.appendChild(div);
  }

  // Inicializa o resumo
  listaAssentos.innerHTML = '<li class="vazio">Nenhum assento selecionado</li>';
  valorTotal.textContent = 'R$ 0,00';

  // Evento de clique nos assentos
  mapa.addEventListener('click', e => {
    const alvo = e.target;
    if (alvo.classList.contains('assento') && !alvo.classList.contains('ocupado')) {
      alvo.classList.toggle('selecionado');
      atualizarResumo();
    }
  });

  function atualizarResumo() {
  const selecionados = document.querySelectorAll('.assento.selecionado');
  listaAssentos.innerHTML = '';
  let total = 0;

  if (selecionados.length === 0) {
    const vazio = document.createElement('li');
    vazio.classList.add('vazio');
    vazio.textContent = 'Nenhum assento selecionado';
    listaAssentos.appendChild(vazio);
    valorTotal.textContent = 'R$ 0,00';
    return;
  }

  selecionados.forEach(assento => {
    const num = assento.dataset.num;
    if (!num) return; // ignora assentos sem número definido
    const item = document.createElement('li');
    item.textContent = `Assento ${num} - R$ ${precoPorAssento.toFixed(2)}`;
    listaAssentos.appendChild(item);
    total += precoPorAssento;
  });

  valorTotal.textContent = `R$ ${total.toFixed(2)}`;
} 
});
