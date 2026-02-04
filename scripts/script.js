const avatar = document.querySelector('.avatar');
const intro = document.querySelector('#intro');
const aboutSection = document.querySelector('#about');

const aboutObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      aboutSection.classList.add('active');
    } else {
      aboutSection.classList.remove('active');
    }
  });
}, { threshold: 0.5 });

aboutObserver.observe(aboutSection);

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (y < 200) {
    avatar.style.transform = `scale(${1 - y / 600})`;
    avatar.style.opacity = `${1 - y / 300}`;
  }
});

const contactLink = document.querySelector('.contact-link');
const contacts = document.querySelector('#contacts');

const contactObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      contactLink.classList.add('show');
    } else {
      contactLink.classList.remove('show');
    }
  });
}, {
  threshold: 0.6
});

contactObserver.observe(contacts);


let ribbonInterval;

function createRibbon() {
  const ribbon = document.createElement('div');
  ribbon.className = 'ribbon';
  ribbon.style.top = Math.random() * 80 + '%';
  ribbon.style.animation = `ribbonMove ${10 + Math.random() * 6}s linear`;
  document.body.appendChild(ribbon);

  requestAnimationFrame(() => ribbon.classList.add('show'));
  setTimeout(() => ribbon.remove(), 10000);
}

function startRibbons() {
  if (!ribbonInterval) {
    ribbonInterval = setInterval(createRibbon, 5000);
  }
}

function stopRibbons() {
  clearInterval(ribbonInterval);
  ribbonInterval = null;
  document.querySelectorAll('.ribbon').forEach(r => r.remove());
}

const introObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    entry.isIntersecting ? stopRibbons() : startRibbons();
  });
}, { threshold: 0.6 });

introObserver.observe(intro);


const skillsSection = document.querySelector('#skills');
const projectsSection = document.querySelector('#projects');
const scrollBtn = document.querySelector('.scroll-down');

const skillsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      skillsSection.classList.add('active');
    } else {
      skillsSection.classList.remove('active');
    }
  });
}, { threshold: 0.5 });

skillsObserver.observe(skillsSection);

scrollBtn.addEventListener('click', () => {
  projectsSection.scrollIntoView({
    behavior: 'smooth'
  });
});

document.querySelectorAll('.lang-block').forEach(block => {
  const button = block.querySelector('.lang-toggle');
  const textEl = block.querySelector('.lang-text');

  const texts = {
    ru: `Меня зовут Арменак. Мне 18 лет, я разработчик, создаю сайты и пишу чат-боты,
объединяя фронтенд и лёгкий бэкенд в своих проектах. Сейчас я учусь на втором курсе
РТУ МИРА по направлению «Фуллстек-разработка». Мои проекты современные, смелые и всегда
выполнены с полной отдачей — я вкладываю в них максимум энергии и креатива.`,

    en: `My name is Armenak. I’m 18 years old, a developer creating websites and building
chatbots, combining frontend and light backend in my projects. I’m currently a
second-year student at RTU MIREA, studying Full-Stack Development. My projects are
modern, bold, and always executed with full dedication — I put all my energy and
creativity into each one.`
  };

  textEl.textContent = texts.ru;

  button.addEventListener('click', () => {
    const current = block.dataset.lang;
    const next = current === 'ru' ? 'en' : 'ru';

    textEl.classList.add('fade-out');

    setTimeout(() => {
      textEl.textContent = texts[next];
      textEl.classList.remove('fade-out');

      block.dataset.lang = next;
      button.textContent = next === 'ru' ? 'EN' : 'RU';
    }, 300);
  });
});
