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

// Inicializa mostrando apenas o dia ativo
window.addEventListener('DOMContentLoaded', () => {
  const diaAtivo = document.querySelector('.dia.ativo').getAttribute('data-dia');
  sessoes.forEach(sessao => {
    if (sessao.getAttribute('data-dia') === diaAtivo) {
      sessao.style.display = 'block';
    } else {
      sessao.style.display = 'none';
    }
  });
});
