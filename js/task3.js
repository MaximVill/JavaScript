const URLS = {
  post:   'https://jsonplaceholder.typicode.com/posts/1',
  user:   'https://jsonplaceholder.typicode.com/users/1',
  trivia: 'https://opentdb.com/api.php?amount=1&type=boolean',
  cat:    'https://catfact.ninja/fact',
  dog:    'https://dog.ceo/api/breeds/image/random',
};

const LABELS = {
  post:   'JSONPlaceholder /posts/1',
  user:   'JSONPlaceholder /users/1',
  trivia: 'Open Trivia DB',
  cat:    'Cat Fact API',
  dog:    'Dog CEO API',
};

function log(outId, html) {
  const el = document.getElementById(outId);
  if (el.querySelector('.log-wait')) el.innerHTML = '';
  el.innerHTML += `<div class="log-line">${html}</div>`;
}

function extract(key, data) {
  if (key === 'post')   return `"${data.title}"`;
  if (key === 'user')   return `${data.name} <${data.email}>`;
  if (key === 'trivia') return data.results[0].question.slice(0, 60) + '...';
  if (key === 'cat')    return data.fact.slice(0, 70) + '...';
  if (key === 'dog')    return data.message.slice(0, 70);
  return JSON.stringify(data).slice(0, 70);
}

function switchTab(id) {
  document.querySelectorAll('.tab').forEach((t, i) => t.classList.toggle('active', ['raw','cb','promise','async'][i] === id));
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.getElementById('panel-' + id).classList.add('active');
}

// 1. Raw XHR
function runRaw() {
  const btn = document.getElementById('btn-raw');
  btn.disabled = true;
  const out = 'out-raw';
  document.getElementById(out).innerHTML = '';
  const keys = Object.keys(URLS);
  let i = 0;

  function next() {
    if (i >= keys.length) {
      log(out, `<span class="log-ok">// done: ${keys.length} requests completed</span>`);
      btn.disabled = false;
      return;
    }
    const key = keys[i++];
    log(out, `<span class="log-step">// [${i}/${keys.length}] GET ${LABELS[key]}</span>`);
    const xhr = new XMLHttpRequest();
    xhr.open('GET', URLS[key]);
    xhr.onload = function() {
      const data = JSON.parse(xhr.responseText);
      log(out, `<span class="log-ok">// 200 OK</span> <span class="log-data">=> ${extract(key, data)}</span>`);
      next();
    };
    xhr.onerror = function() {
      log(out, `<span class="log-err">// error: network error</span>`);
      next();
    };
    xhr.send();
  }
  next();
}

// 2. Callback
function request(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.onload = function() {
    try { callback(null, JSON.parse(xhr.responseText)); }
    catch(e) { callback(e); }
  };
  xhr.onerror = function() { callback(new Error('network error')); };
  xhr.send();
}

function runCallback() {
  const btn = document.getElementById('btn-cb');
  btn.disabled = true;
  const out = 'out-cb';
  document.getElementById(out).innerHTML = '';
  const keys = Object.keys(URLS);
  let i = 0;

  function next() {
    if (i >= keys.length) {
      log(out, `<span class="log-ok">// done: callback chain completed</span>`);
      btn.disabled = false;
      return;
    }
    const key = keys[i++];
    log(out, `<span class="log-step">// [${i}] GET ${LABELS[key]}</span>`);
    request(URLS[key], function(err, data) {
      if (err) { log(out, `<span class="log-err">// error: ${err.message}</span>`); }
      else     { log(out, `<span class="log-ok">// 200 OK</span> <span class="log-data">=> ${extract(key, data)}</span>`); }
      next();
    });
  }
  next();
}

// 3. Promise
function requestPromise(url) {
  return new Promise((resolve, reject) => {
    request(url, (err, data) => err ? reject(err) : resolve(data));
  });
}

function runPromise() {
  const btn = document.getElementById('btn-promise');
  btn.disabled = true;
  const out = 'out-promise';
  document.getElementById(out).innerHTML = '';
  const keys = Object.keys(URLS);

  let chain = Promise.resolve();
  keys.forEach((key, idx) => {
    chain = chain.then(() => {
      log(out, `<span class="log-step">// [${idx+1}] GET ${LABELS[key]}</span>`);
      return requestPromise(URLS[key]);
    }).then(data => {
      log(out, `<span class="log-ok">// 200 OK</span> <span class="log-data">=> ${extract(key, data)}</span>`);
    }).catch(err => {
      log(out, `<span class="log-err">// error: ${err.message}</span>`);
    });
  });
  chain.then(() => {
    log(out, `<span class="log-ok">// done: .then() chain completed</span>`);
    btn.disabled = false;
  });
}

// 4. Async/Await
async function runAsync() {
  const btn = document.getElementById('btn-async');
  btn.disabled = true;
  const out = 'out-async';
  document.getElementById(out).innerHTML = '';
  const keys = Object.keys(URLS);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    log(out, `<span class="log-step">// [${i+1}] GET ${LABELS[key]}</span>`);
    try {
      const data = await requestPromise(URLS[key]);
      log(out, `<span class="log-ok">// 200 OK</span> <span class="log-data">=> ${extract(key, data)}</span>`);
    } catch(err) {
      log(out, `<span class="log-err">// error: ${err.message}</span>`);
    }
  }
  log(out, `<span class="log-ok">// done: async/await sequence completed</span>`);
  btn.disabled = false;
}
