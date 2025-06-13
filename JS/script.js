// Função para alternar o modo escuro
// Verifica se o localStorage está disponível
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById('darkModeToggle');

  if (!toggle) return;

  // Carregar estado salvo
  if (localStorage.getItem('dark-mode') === 'enabled') {
    document.body.classList.add('dark-mode');
    toggle.checked = true;
  }

  toggle.addEventListener('change', () => {
    if (toggle.checked) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('dark-mode', 'enabled');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('dark-mode', 'disabled');
    }
  });
});


// Função para expandir/recolher descrição
document.querySelectorAll('.toggle-desc').forEach(button => {
  button.addEventListener('click', () => {
    const card = button.closest('.team-card');
    const desc = card.querySelector('.team-desc');

    if (desc.classList.contains('collapsed')) {
      desc.classList.remove('collapsed');
      desc.classList.add('expanded');
      button.textContent = 'Ver menos';
      button.setAttribute('aria-label', `Ver menos ${card.querySelector('.team-name').textContent}`);
    } else {
      desc.classList.remove('expanded');
      desc.classList.add('collapsed');
      button.textContent = 'Ver mais';
      button.setAttribute('aria-label', `Ver mais ${card.querySelector('.team-name').textContent}`);
    }
  });
});


// fale conosco
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const message = document.getElementById('message');
  const successMsg = document.getElementById('formSuccess');

  let valid = true;

  // Validação básica
  if (name.value.trim() === '') {
    showError('error-name', 'Por favor, preencha seu nome.');
    valid = false;
  } else {
    clearError('error-name');
  }

  if (!validateEmail(email.value)) {
    showError('error-email', 'Digite um e-mail válido.');
    valid = false;
  } else {
    clearError('error-email');
  }

  if (message.value.trim().length < 10) {
    showError('error-message', 'A mensagem deve ter ao menos 10 caracteres.');
    valid = false;
  } else {
    clearError('error-message');
  }

  if (valid) {
    // Aqui você pode enviar os dados por AJAX/fetch
    successMsg.style.display = 'block';

    // Limpar campos
    this.reset();
    setTimeout(() => {
      successMsg.style.display = 'none';
    }, 5000);
  }
});

function showError(id, msg) {
  const el = document.getElementById(id);
  el.textContent = msg;
  el.style.display = 'block';
}

function clearError(id) {
  const el = document.getElementById(id);
  el.textContent = '';
  el.style.display = 'none';
}

function validateEmail(email) {
  const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return regex.test(email);
}


// Função para rolar suavemente para o topo
const btnVoltarTopo = document.getElementById('btnVoltarTopo');

// Mostrar botão após rolar 300px para baixo
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    btnVoltarTopo.style.display = 'block';
  } else {
    btnVoltarTopo.style.display = 'none';
  }
});

// Ao clicar, rolar suavemente para o topo
btnVoltarTopo.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

 // Conteúdo detalhado de cada serviço
  const servicosDetalhes = {
    consultoria: `
      <h3>Consultoria Estratégica</h3>
      <p>Oferecemos análise de mercado, definição de metas, planejamento estratégico e acompanhamento personalizado. Nosso objetivo é potencializar o crescimento do seu negócio, promovendo inovação, inclusão e sustentabilidade em todas as etapas.</p>
    `,
    identidade: `
      <h3>Identidade Visual Acessível</h3>
      <p>Desenvolvemos logotipos, paletas de cores e materiais gráficos com foco em acessibilidade. Garantimos contraste adequado, fontes legíveis e versões adaptadas para diferentes necessidades, tornando sua marca inclusiva e reconhecível.</p>
    `,
    sites: `
      <h3>Adaptação de Sites</h3>
      <p>Avaliamos e adaptamos seu site para atender às normas de acessibilidade digital (WCAG). Implementamos recursos como navegação por teclado, textos alternativos, contraste de cores e responsividade, melhorando a experiência de todos os usuários.</p>
    `,
    manual: `
      <h3>Manual de Identidade Visual</h3>
      <p>Criamos um guia completo com diretrizes para uso correto da marca: aplicações do logotipo, cores, tipografia, elementos gráficos e exemplos práticos. O manual garante consistência visual e facilita a comunicação da sua marca em todos os canais.</p>
    `,
    redes: `
      <h3>Gerenciamento de Redes Sociais</h3>
      <p>Planejamos, produzimos e publicamos conteúdos acessíveis e estratégicos. Monitoramos resultados, interagimos com o público e ajustamos as ações para fortalecer a presença digital da sua marca e ampliar seu alcance.</p>
    `
  };

  // Abrir modal
  document.querySelectorAll('.btn-mais-info').forEach(btn => {
    btn.addEventListener('click', function() {
      const servico = this.getAttribute('data-servico');
      document.getElementById('modal-text').innerHTML = servicosDetalhes[servico];
      document.getElementById('modal-servico').style.display = 'flex';
    });
  });

  // Fechar modal
  document.getElementById('closeModal').onclick = function() {
    document.getElementById('modal-servico').style.display = 'none';
  };

  // Fechar modal ao clicar fora do conteúdo
  window.onclick = function(event) {
    const modal = document.getElementById('modal-servico');
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  };

//MENU HAMBURGUER 
  document.addEventListener('DOMContentLoaded', () => {
    const btnToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    btnToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
/*
      if (navLinks.classList.contains('active')) {
        btnToggle.setAttribute('aria-label', 'Fechar menu');
      } else {
        btnToggle.setAttribute('aria-label', 'Abrir menu');
      }*/
    });
  });