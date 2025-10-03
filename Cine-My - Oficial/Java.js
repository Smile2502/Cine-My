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
  const btnContinuar = document.getElementById('btnContinuar');
  const precoPorAssento = 0.00;

  // Começa desabilitado
  btnContinuar.disabled = true;

  // Gera os assentos dinamicamente
  for (let i = 1; i <= 96; i++) {
    const div = document.createElement('div');
    div.classList.add('assento');
    div.dataset.num = `${i}`;
    div.textContent = i;
    // Marca alguns assentos como ocupados para exemplo
    if (i % 13 === 0 || i % 17 === 0) div.classList.add('ocupado');
    mapa.appendChild(div);
  }

  // Inicializa o resumo
  listaAssentos.innerHTML = '<span class="vazio">Nenhum assento selecionado</span>';
  valorTotal.textContent = 'R$ 0,00';

  // Evento de clique nos assentos
  mapa.addEventListener('click', e => {
    const alvo = e.target;
    if (alvo.classList.contains('assento') && !alvo.classList.contains('ocupado')) {
      alvo.classList.toggle('selecionado');
      atualizarResumo();
    }
  });

  // Função que atualiza o resumo
  function atualizarResumo() {
    const selecionados = document.querySelectorAll('.assento.selecionado');
    listaAssentos.innerHTML = '';

    if (selecionados.length === 0) {
      const vazio = document.createElement('span');
      vazio.classList.add('vazio');
      vazio.textContent = 'Nenhum assento selecionado';
      listaAssentos.appendChild(vazio);
      valorTotal.textContent = 'R$ 0,00';
      btnContinuar.disabled = true;
      return;
    }

    selecionados.forEach(assento => {
      const num = assento.dataset.num;
      if (!num) return;
      const span = document.createElement('span');
      span.textContent = num;
      listaAssentos.appendChild(span);
    });

    valorTotal.textContent = 'R$ 0,00';
    btnContinuar.disabled = false;
  }

  // Controle do botão Continuar
  btnContinuar.addEventListener('click', e => {
    const selecionados = document.querySelectorAll('.assento.selecionado');
    if (selecionados.length === 0) {
      e.preventDefault();
      alert("Você precisa selecionar pelo menos um assento antes de continuar!");
    } else {
      // Redireciona para a próxima página
      window.location.href = "ingressos-preco.html";
    }
  });
});

//Em cartaz em Breve
const tabs = document.querySelectorAll(".tab");
const contents = document.querySelectorAll(".tab-content");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      contents.forEach(c => c.classList.remove("active"));

      tab.classList.add("active");
      document.getElementById(tab.dataset.target).classList.add("active");
    });
  });



// Javascript para aba Em breve
document.addEventListener('DOMContentLoaded', () => {
  const btnEmBreve = document.getElementById('btn-em-breve');
  const btnCartaz = document.querySelector('[data-target="cartaz"]');
  const filmes = document.querySelectorAll('.card-filme');

// Função para marcar visualmente a aba ativa
  function atualizarAbaAtiva(aba) {
// Remove a classe active de ambos os botões
    btnCartaz.classList.remove('active');
    btnEmBreve.classList.remove('active');

// Adiciona active no botão correto
    if (aba === 'embreve') {
      btnEmBreve.classList.add('active');
    } else {
      btnCartaz.classList.add('active');
    }
  }

// Função para configurar a página inicial (cartaz ativo)
  function estadoCartaz() {
    filmes.forEach(filme => {
      if (filme.querySelector('.estreia')) {
        filme.classList.add('hidden'); // Oculta os filmes de estreia
      } else {
        filme.classList.remove('hidden'); // Mostra os filmes normais
      }
    });
    atualizarAbaAtiva('cartaz');
  }

// Função para mostrar apenas os filmes de estreia
  function estadoEmBreve() {
    filmes.forEach(filme => {
      if (filme.querySelector('.estreia')) {
        filme.classList.remove('hidden'); // Mostra os filmes com estreia
      } else {
        filme.classList.add('hidden'); // Oculta os filmes normais
      }
    });
    atualizarAbaAtiva('embreve');
  }

// Verificar se existe estado salvo no localStorage
  const abaAtiva = localStorage.getItem('abaAtiva');

  if (abaAtiva === 'embreve') {
    estadoEmBreve(); // Abre na aba "Em Breve"
  } else {
    estadoCartaz(); // Abre na aba "Em Cartaz" (padrão)
  }

// Evento para "Em Breve"
  btnEmBreve.addEventListener('click', () => {
    estadoEmBreve();
    localStorage.setItem('abaAtiva', 'embreve');
  });

// Evento para "Em Cartaz"
  btnCartaz.addEventListener('click', () => {
    estadoCartaz();
    localStorage.setItem('abaAtiva', 'cartaz');
  });
});

