const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';

function proxyFetch(url, params) {
  return fetch(CORS_PROXY + url, params);
}

let currentName = '';

function render(html) {
  const app = document.getElementById('app');
  app.innerHTML = `<div class="card">${html}</div>`;
}

// Шаг 1: приветствие
async function showWelcome(isRetry = false) {
  render(`<div class="loader"></div><p class="loading">Генерируем имя...</p>`);
  try {
    const res  = await fetch('https://randomuser.me/api/?nat=us');
    const data = await res.json();
    const u    = data.results[0];
    currentName = `${u.name.first} ${u.name.last}`;
    renderWelcomeScreen(isRetry);
  } catch (e) {
    render(`<h1>Ошибка загрузки</h1><p class="subtitle">${e.message}</p>
      <div class="btn-row"><button class="btn-primary" onclick="showWelcome()">Попробовать снова</button></div>`);
  }
}

function renderWelcomeScreen(isRetry) {
  const greeting = isRetry
    ? `<h1>Хм... Тогда что насчёт <span class="name-highlight">${currentName}</span>?</h1>`
    : `<h1>Добро пожаловать, странник!<br>Я буду звать тебя <span class="name-highlight">${currentName}</span>, ок?</h1>`;
  render(`
    ${greeting}
    <p class="subtitle">Имя сгенерировано случайно</p>
    <div class="btn-row">
      <button class="btn-primary" onclick="showChoose()">Ладно...</button>
      <button class="btn-secondary" onclick="showWelcome(true)">А может не надо?...</button>
    </div>
  `);
}

// Шаг 2: выбор животного
function showChoose() {
  render(`
    <h1>На чьей ты стороне, <span class="name-highlight">${currentName}</span>?</h1>
    <p class="subtitle" style="margin-bottom:20px">Выбери животное</p>
    <div class="animal-list">
      <button class="animal-btn" onclick="showFact('cat')">Кошки</button>
      <button class="animal-btn" onclick="showFact('dog')">Собаки</button>
      <button class="animal-btn" onclick="showFact('fox')">Лисы</button>
    </div>
  `);
}

// Шаг 3: факт
const FOX_FACTS = [
  "Foxes use the Earth's magnetic field to judge distance when hunting.",
  "A group of foxes is called a 'skulk' or 'earth'.",
  "Foxes are the only member of the dog family that can climb trees.",
  "Red foxes can run up to 45 km/h and jump over 2 metres high.",
  "Foxes have vertically-slit pupils, like cats, which help them see in low light.",
  "A fox's thick tail (called a 'brush') helps it keep warm in winter.",
  "Foxes communicate using over 40 different sounds.",
  "Baby foxes are called kits, pups, or cubs — born blind and deaf.",
  "Foxes are omnivores: they eat berries, insects, birds, and small mammals.",
  "Urban foxes tend to have shorter snouts than rural ones.",
];

async function showFact(animal) {
  const labels = { cat: 'Кошка', dog: 'Собака', fox: 'Лиса' };
  render(`<div class="loader"></div><p class="loading">Загружаем факт о: ${labels[animal]}...</p>`);

  try {
    let fact, image;

    if (animal === 'cat') {
      const [factRes, imgRes] = await Promise.all([
        fetch('https://catfact.ninja/fact'),
        fetch('https://api.thecatapi.com/v1/images/search'),
      ]);
      const factData = await factRes.json();
      const imgData  = await imgRes.json();
      fact  = factData.fact;
      image = imgData[0].url;

    } else if (animal === 'dog') {
      const [factRes, imgRes] = await Promise.all([
        fetch('https://dogapi.dog/api/v2/facts?number=1'),
        fetch('https://dog.ceo/api/breeds/image/random'),
      ]);
      const factData = await factRes.json();
      const imgData  = await imgRes.json();
      fact  = factData.data[0].attributes.body;
      image = imgData.message;

    } else {
      const imgRes = await fetch('https://randomfox.ca/floof/');
      const imgData = await imgRes.json();
      fact  = FOX_FACTS[Math.floor(Math.random() * FOX_FACTS.length)];
      image = imgData.image;
    }

    renderFact(animal, fact, image, labels[animal]);
    translateFact(fact);
  } catch (e) {
    render(`<h1>Ошибка загрузки</h1>
      <p class="subtitle">${e.message}</p>
      <div class="btn-row">
        <button class="btn-primary" onclick="showFact('${animal}')">Повторить</button>
        <button class="btn-secondary" onclick="showChoose()">Назад</button>
      </div>`);
  }
}

function renderFact(animal, fact, image, label) {
  render(`
    <img class="animal-img" src="${image}" alt="${label}" referrerpolicy="no-referrer">
    <p class="fact-label">Факт (en)</p>
    <div class="fact-text" id="fact-en">${fact}</div>
    <p class="fact-label">Перевод (ru)</p>
    <div id="translation"><p class="loading">Перевожу...</p></div>
    <div class="btn-row" style="margin-top:16px">
      <button class="btn-primary" onclick="showFact('${animal}')">Ещё факт</button>
      <button class="btn-secondary" onclick="showChoose()">Назад</button>
    </div>
  `);
}

async function translateFact(text) {
  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|ru`;
    const res  = await fetch(url);
    const data = await res.json();
    const translated = data.responseData?.translatedText;
    const el = document.getElementById('translation');
    if (el && translated) {
      el.innerHTML = `<div class="translated-text">${translated}</div>`;
    }
  } catch {
    const el = document.getElementById('translation');
    if (el) el.innerHTML = `<p class="loading">Перевод недоступен</p>`;
  }
}

showWelcome();
