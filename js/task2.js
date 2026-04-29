// ─── Module: humansData ─────────────────────────────────────────────────────
const humansData = (() => {
  const firstNames = {
    М: ['Александр','Дмитрий','Максим','Сергей','Андрей','Алексей','Иван','Николай','Михаил','Пётр'],
    Ж: ['Анна','Мария','Елена','Ольга','Наталья','Татьяна','Юлия','Екатерина','Светлана','Ирина'],
  };
  const lastNames = ['Иванов','Смирнов','Кузнецов','Попов','Васильев','Петров','Соколов','Михайлов','Новиков','Фёдоров'];
  const cities    = ['Москва','Санкт-Петербург','Новосибирск','Кемерово','Екатеринбург','Казань','Омск','Томск'];
  const streets   = ['Ленина','Советская','Мира','Победы','Садовая','Школьная','Лесная','Молодёжная'];

  function rnd(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
  function rndInt(a, b) { return Math.floor(Math.random() * (b - a + 1)) + a; }

  function makeHuman(id) {
    const gender  = Math.random() > 0.5 ? 'М' : 'Ж';
    const surname = rnd(lastNames) + (gender === 'Ж' ? 'а' : '');
    return {
      id,
      name:    rnd(firstNames[gender]),
      surname,
      age:     rndInt(5, 80),
      gender,
      address: `г. ${rnd(cities)}, ул. ${rnd(streets)}, д. ${rndInt(1, 120)}`,
      phone:   `+7 (${rndInt(900,999)}) ${rndInt(100,999)}-${rndInt(10,99)}-${rndInt(10,99)}`,
    };
  }

  async function getData() {
    await new Promise(r => setTimeout(r, 400));
    const count = rndInt(8, 20);
    return Array.from({ length: count }, (_, i) => makeHuman(i + 1));
  }

  return { getData };
})();

// ─── State ──────────────────────────────────────────────────────────────────
let allPeople    = [];
let nextId       = 1;
let genderFilter = 'all';
let editingId    = null;

function ageClass(age) {
  if (age < 18)  return 'age-young';
  if (age <= 60) return 'age-mid';
  return 'age-old';
}

function renderTable() {
  const filtered = genderFilter === 'all'
    ? allPeople
    : allPeople.filter(p => p.gender === genderFilter);

  const selected = getSelected();
  const wrap = document.getElementById('table-wrap');

  if (!allPeople.length) {
    wrap.innerHTML = `<div class="empty-state"><p>Нажмите «Загрузить» для заполнения таблицы</p></div>`;
    updateStatus();
    return;
  }

  if (!filtered.length) {
    wrap.innerHTML = `<div class="empty-state"><p>Нет записей по выбранному фильтру</p></div>`;
    updateStatus();
    return;
  }

  const rows = filtered.map(p => `
    <tr class="${ageClass(p.age)} ${selected.has(p.id) ? 'selected' : ''}" id="row-${p.id}">
      <td><input type="checkbox" ${selected.has(p.id) ? 'checked' : ''} onchange="toggleSelect(${p.id})"></td>
      <td>${p.name}</td>
      <td>${p.surname}</td>
      <td>${p.age}</td>
      <td><span class="badge badge-${p.gender === 'М' ? 'm' : 'f'}">${p.gender}</span></td>
      <td>${p.address}</td>
      <td>${p.phone}</td>
      <td><div class="actions">
        <button class="btn-outline btn-sm" onclick="openEditModal(${p.id})">Изм.</button>
        <button class="btn-danger btn-sm" onclick="deleteSingle(${p.id})">Удал.</button>
      </div></td>
    </tr>
  `).join('');

  wrap.innerHTML = `
    <table>
      <thead>
        <tr>
          <th><input type="checkbox" id="chk-all" onchange="toggleAll(this)"></th>
          <th>Имя</th><th>Фамилия</th><th>Возраст</th><th>Пол</th>
          <th>Адрес</th><th>Телефон</th><th>Действия</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>`;
  updateStatus(filtered.length);
}

function updateStatus(shown) {
  const sb  = document.getElementById('statusbar');
  const sel = getSelected().size;
  sb.textContent = allPeople.length
    ? `Записей: ${allPeople.length} | Показано: ${shown ?? allPeople.length}${sel ? ` | Выбрано: ${sel}` : ''}`
    : '';
}

function getSelected() {
  const set = new Set();
  document.querySelectorAll('tbody input[type=checkbox]:checked').forEach(cb => {
    const id = parseInt(cb.closest('tr').id.replace('row-', ''));
    set.add(id);
  });
  return set;
}

window.loadData = async function() {
  document.getElementById('table-wrap').innerHTML = `<div class="empty-state"><p>Загрузка...</p></div>`;
  allPeople = await humansData.getData();
  nextId = Math.max(...allPeople.map(p => p.id)) + 1;
  renderTable();
};

window.toggleSelect = function() {
  const sel = getSelected().size;
  document.getElementById('btn-delete-sel').style.display = sel ? 'inline-flex' : 'none';
  updateStatus();
};

window.toggleAll = function(chk) {
  document.querySelectorAll('tbody input[type=checkbox]').forEach(cb => { cb.checked = chk.checked; });
  document.getElementById('btn-delete-sel').style.display = chk.checked ? 'inline-flex' : 'none';
  updateStatus();
};

window.deleteSingle = function(id) {
  allPeople = allPeople.filter(p => p.id !== id);
  renderTable();
};

window.deleteSelected = function() {
  const sel = getSelected();
  allPeople = allPeople.filter(p => !sel.has(p.id));
  document.getElementById('btn-delete-sel').style.display = 'none';
  renderTable();
};

window.setFilter = function(gender, btn) {
  genderFilter = gender;
  document.querySelectorAll('.filter-group button').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderTable();
};

function fillModal(p) {
  document.getElementById('f-name').value    = p?.name    ?? '';
  document.getElementById('f-surname').value = p?.surname ?? '';
  document.getElementById('f-age').value     = p?.age     ?? '';
  document.getElementById('f-gender').value  = p?.gender  ?? 'М';
  document.getElementById('f-address').value = p?.address ?? '';
  document.getElementById('f-phone').value   = p?.phone   ?? '';
}

window.openAddModal = function() {
  editingId = null;
  document.getElementById('modal-title').textContent = 'Добавить запись';
  fillModal(null);
  document.getElementById('modal').style.display = 'flex';
};

window.openEditModal = function(id) {
  editingId = id;
  const p = allPeople.find(x => x.id === id);
  document.getElementById('modal-title').textContent = 'Редактировать запись';
  fillModal(p);
  document.getElementById('modal').style.display = 'flex';
};

window.closeModal = function(e) {
  if (e && e.target !== document.getElementById('modal')) return;
  document.getElementById('modal').style.display = 'none';
  editingId = null;
};

window.saveModal = function() {
  const p = {
    id:      editingId ?? nextId++,
    name:    document.getElementById('f-name').value.trim()    || 'Имя',
    surname: document.getElementById('f-surname').value.trim() || 'Фамилия',
    age:     parseInt(document.getElementById('f-age').value)  || 25,
    gender:  document.getElementById('f-gender').value,
    address: document.getElementById('f-address').value.trim() || 'Адрес',
    phone:   document.getElementById('f-phone').value.trim()   || '+7',
  };

  if (editingId !== null) {
    const idx = allPeople.findIndex(x => x.id === editingId);
    allPeople[idx] = p;
  } else {
    allPeople.push(p);
  }

  document.getElementById('modal').style.display = 'none';
  editingId = null;
  renderTable();
};
