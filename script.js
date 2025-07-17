// Определение языка
function getLang() {
  const lang = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
  return lang.startsWith('ru') ? 'ru' : 'en';
}

// Тексты на двух языках
const texts = {
  ru: {
    title: 'Добро пожаловать!',
    desc: 'После нажатия на кнопку ниже вас перекинет на актуального бота',
    button: 'Перейти в бота'
  },
  en: {
    title: 'Welcome!',
    desc: 'After clicking the button below, you will be redirected to the current bot',
    button: 'Go to Bot'
  }
};

// Получение ссылки на бота из bot.json
async function getBotUrl() {
  try {
    const res = await fetch('bot.json', {cache: 'no-store'});
    if (!res.ok) throw new Error('No bot.json');
    const data = await res.json();
    return data.bot_url || '';
  } catch {
    return '';
  }
}

// Основная логика
(async function main() {
  const visited = localStorage.getItem('visited');
  const lang = getLang();
  const { title, desc, button } = texts[lang];
  const botUrl = await getBotUrl();

  if (visited && botUrl) {
    window.location.href = botUrl;
    return;
  }

  // Рендер приветствия
  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="welcome-card">
      <h1>${title}</h1>
      <p>${desc}</p>
      <button id="go-bot">${button}</button>
    </div>
  `;

  document.getElementById('go-bot').onclick = () => {
    if (botUrl) {
      localStorage.setItem('visited', 'true');
      window.location.href = botUrl;
    } else {
      alert(lang === 'ru' ? 'Ссылка на бота не найдена' : 'Bot link not found');
    }
  };
})(); 