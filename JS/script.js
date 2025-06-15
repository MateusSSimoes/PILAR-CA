// ------------------- DARK MODE -------------------
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById('darkModeToggle');
  if (!toggle) return;

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

// ------------------- EXPANDIR DESCRIÇÃO -------------------
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

// ------------------- ENVIO DE FORMULÁRIO -------------------
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');

  if (form) {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();
      const successMsg = document.getElementById('formSuccess');

      let valid = true;

      if (name === '') {
        showError('error-name', 'Por favor, preencha seu nome.');
        valid = false;
      } else {
        clearError('error-name');
      }

      if (!validateEmail(email)) {
        showError('error-email', 'Digite um e-mail válido.');
        valid = false;
      } else {
        clearError('error-email');
      }

      if (message.length < 10) {
        showError('error-message', 'A mensagem deve ter ao menos 10 caracteres.');
        valid = false;
      } else {
        clearError('error-message');
      }

      if (!valid) return;

      try {
        const response = await fetch('https://backend-pilar.onrender.com', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, subject, message }),
        });

        const result = await response.json();

        if (response.ok && result.success !== false) {
          successMsg.style.display = 'block';
          this.reset();
          setTimeout(() => {
            successMsg.style.display = 'none';
          }, 5000);
        } else {
          alert(result.error || 'Erro ao enviar a mensagem.');
        }
      } catch (error) {
        console.error('[Erro ao enviar o formulário]', error);
        alert('Erro de conexão com o servidor.');
      }
    });
  }
});

function showError(id, msg) {
  const el = document.getElementById(id);
  if (el) {
    el.textContent = msg;
    el.style.display = 'block';
  }
}

function clearError(id) {
  const el = document.getElementById(id);
  if (el) {
    el.textContent = '';
    el.style.display = 'none';
  }
}

function validateEmail(email) {
  const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return regex.test(email);
}


// ------------------- BOTÃO VOLTAR AO TOPO -------------------
const btnVoltarTopo = document.getElementById('btnVoltarTopo');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    btnVoltarTopo.style.display = 'block';
  } else {
    btnVoltarTopo.style.display = 'none';
  }
});

btnVoltarTopo.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ------------------- MODAL DE SERVIÇOS -------------------
const servicosDetalhes = {
  consultoria: `<h3>Consultoria Estratégica</h3><p>Oferecemos análise de mercado...</p>`,
  identidade: `<h3>Identidade Visual Acessível</h3><p>Desenvolvemos logotipos...</p>`,
  sites: `<h3>Adaptação de Sites</h3><p>Avaliamos e adaptamos seu site...</p>`,
  manual: `<h3>Manual de Identidade Visual</h3><p>Criamos um guia completo...</p>`,
  redes: `<h3>Gerenciamento de Redes Sociais</h3><p>Planejamos conteúdos acessíveis...</p>`
};

document.querySelectorAll('.btn-mais-info').forEach(btn => {
  btn.addEventListener('click', function() {
    const servico = this.getAttribute('data-servico');
    document.getElementById('modal-text').innerHTML = servicosDetalhes[servico];
    document.getElementById('modal-servico').style.display = 'flex';
  });
});

document.getElementById('closeModal').onclick = function() {
  document.getElementById('modal-servico').style.display = 'none';
};

window.onclick = function(event) {
  const modal = document.getElementById('modal-servico');
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};

// ------------------- MENU HAMBURGUER -------------------
document.addEventListener('DOMContentLoaded', () => {
  const btnToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  btnToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
});
