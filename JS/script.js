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

if (valid) {
  // Envio bem-sucedido
  showModal();
  this.reset();
}


// CONFIRMAÇÃO DE ENVIO
// Funções para abrir e fechar o modal
const modal = document.getElementById("confirmationModal");
const closeModal = document.getElementById("closeModal");
const confirmBtn = document.getElementById("confirmBtn");

// Mostrar o modal
function showModal() {
  modal.style.display = "flex";
}

// Fechar o modal
function hideModal() {
  modal.style.display = "none";
}

// Eventos
closeModal.addEventListener("click", hideModal);
confirmBtn.addEventListener("click", hideModal);

// Fechar ao clicar fora do conteúdo
window.addEventListener("click", function (e) {
  if (e.target === modal) hideModal();
});

// Tecla ESC fecha o modal
window.addEventListener("keydown", function (e) {
  if (e.key === "Escape") hideModal();
});
