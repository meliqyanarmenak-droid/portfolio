const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');
let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

document.addEventListener('mousemove', e => {
    mouseX = e.clientX; mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
});

function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    follower.style.left = followerX + 'px';
    follower.style.top = followerY + 'px';
    requestAnimationFrame(animateFollower);
}
animateFollower();

document.querySelectorAll('a, button, .pill').forEach(el => {
    el.addEventListener('mouseenter', () => { cursor.classList.add('hover'); follower.classList.add('hover'); });
    el.addEventListener('mouseleave', () => { cursor.classList.remove('hover'); follower.classList.remove('hover'); });
});

const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
        else entry.target.classList.remove('active');
    });
}, { threshold: 0.3 });

sections.forEach(s => observer.observe(s));

const avatar = document.querySelector('.avatar');
const intro = document.querySelector('#intro');
window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < 400 && avatar) {
        avatar.style.transform = `scale(${1 - y / 800})`;
        avatar.style.opacity = `${1 - y / 350}`;
    }
});

const scrollBtn = document.querySelector('.scroll-down');
const projectsSection = document.querySelector('#projects');
if (scrollBtn) {
    scrollBtn.addEventListener('click', () => {
        projectsSection.scrollIntoView({ behavior: 'smooth' });
    });
}

document.querySelectorAll('.lang-block').forEach(block => {
    const button = block.querySelector('.lang-toggle');
    const textEl = block.querySelector('.lang-text');

    const texts = {
        ru: `Меня зовут Арменак. Мне 18 лет, я разработчик, создаю сайты и пишу чат-боты, объединяя фронтенд и лёгкий бэкенд в своих проектах. Сейчас я учусь на втором курсе РТУ МИРА по направлению «Фуллстек-разработка». Мои проекты современные, смелые и всегда выполнены с полной отдачей — я вкладываю в них максимум энергии и креатива.`,
        en: `My name is Armenak. I'm 18 years old, a developer creating websites and building chatbots, combining frontend and light backend in my projects. I'm currently a second-year student at RTU MIREA, studying Full-Stack Development. My projects are modern, bold, and always executed with full dedication — I put all my energy and creativity into each one.`
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

document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.querySelector('.card-glow').style.background = 
            `radial-gradient(circle at ${x}% ${y}%, rgba(232,64,42,0.12) 0%, transparent 60%)`;
    });
});

const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    header.style.background = window.scrollY > 50 
        ? 'rgba(8,8,8,0.9)' 
        : 'rgba(8,8,8,0.7)';
});

document.querySelectorAll('.blog-card').forEach((card, index) => {
    card.addEventListener('click', () => {
        if(index === 0) window.open('https://t.me/Go_mench', '_blank');
        if(index === 1) window.open('https://t.me/AURIX_Studio', '_blank');
    });
});