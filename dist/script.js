const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');

function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', '메뉴 열기');
  navigation.classList.remove('open');
  document.body.classList.remove('menu-open');
}

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? '메뉴 열기' : '메뉴 닫기');
  navigation.classList.toggle('open', !isOpen);
  document.body.classList.toggle('menu-open', !isOpen);
});

navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index % 4, 2) * 70}ms`;
  revealObserver.observe(element);
});

const demoForm = document.querySelector('#demo-form');
const demoInput = document.querySelector('#demo-message');
const chatBody = document.querySelector('.chat-body');
const typing = document.querySelector('.typing');

demoForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const question = demoInput.value.trim();
  if (!question) return;

  const userMessage = document.createElement('div');
  userMessage.className = 'message user';
  userMessage.textContent = question;
  chatBody.insertBefore(userMessage, typing);
  demoInput.value = '';
  chatBody.scrollTop = chatBody.scrollHeight;

  window.setTimeout(() => {
    const answer = document.createElement('div');
    answer.className = 'message bot';
    answer.textContent = '좋은 질문이에요. akkoa 도입 상담에서 비즈니스 상황에 맞춰 자세히 안내해 드릴게요.';
    chatBody.insertBefore(answer, typing);
    chatBody.scrollTop = chatBody.scrollHeight;
  }, 650);
});

document.querySelector('#year').textContent = new Date().getFullYear();
