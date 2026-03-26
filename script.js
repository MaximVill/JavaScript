// Задание 1

// a. Создайте страницу со скриптом, на которой выводится sin(x), где значение x вводит пользователь.
function task_a() {
	const x = parseFloat(document.getElementById('x').value)
	document.getElementById('task_a').innerText = Math.sin(x)
}

// b. На координатной плоскости построили квадрат, заданный координатами двух противоположных вершин, стороны которого параллельны осям координат. Определить, принадлежит ли точка с координатами x, y квадрату. Координаты вводит пользователь.
function task_b() {
	const x1 = +document.getElementById('x1').value
	const y1 = +document.getElementById('y1').value
	const x2 = +document.getElementById('x2').value
	const y2 = +document.getElementById('y2').value
	const x = +document.getElementById('x').value
	const y = +document.getElementById('y').value

	const minX = Math.min(x1, x2),
		maxX = Math.max(x1, x2)
	const minY = Math.min(y1, y2),
		maxY = Math.max(y1, y2)

	const isInside = x >= minX && x <= maxX && y >= minY && y <= maxY
	document.getElementById('task_b').innerText = isInside
		? 'Принадлежит'
		: 'Не принадлежит'
}

// c. Скрипт должен выводить вердикт можно ли введенное натуральное число представить в виде суммы двух квадратов натуральных чисел.
function task_c() {
	const n = parseInt(document.getElementById('n').value)
	let can = false
	for (let a = 1; a * a < n; a++) {
		const b = Math.sqrt(n - a * a)
		if (Number.isInteger(b)) {
			can = true
			break
		}
	}
	document.getElementById('task_c').innerText = can ? 'Можно' : 'Нельзя'
}

// d. Проверьте, содержит ли введенный пользователем адрес электронной почты символ @, и выведите предупреждающее сообщение, если такого символа нет.
function task_d() {
	const email = document.getElementById('email').value
	document.getElementById('task_d').innerText = email.includes('@')
		? 'Верный'
		: 'Неверный'
}

// e. Пользователь вводит строку s. Определить в ней долю (в процентах) символов, являющихся буквами латинского алфавита.
function task_e() {
	const s = document.getElementById('s').value
	const letters = 'abcdefghijklmnopqrstuvwxyz'
	const count = s.split('').reduce((acc, letter) => {
		if (letters.includes(letter.toLowerCase())) {
			acc++
		}
		return acc
	}, 0)
	document.getElementById('task_e').innerText = (count / s.length) * 100
}

// f. Вводится строка s, состоящая из слов (последовательностей символов, не содержащих пробелов внутри себя), разделенных между собой одним или несколькими пробелами. Вывести на экран строку s, удалив из нее все повторные вхождения слов.
function task_f() {
	const s = document.getElementById('string').value
	const words = s.trim().split(/\s+/).filter(w => w)
	const seen = new Set()
	const unique = []

	for (const word of words) {
		const key = word.toLowerCase()
		if (!seen.has(key)) {
			seen.add(key)
			unique.push(word)
		}
	}

	document.getElementById('task_f').textContent = unique.join(' ')
}

// g. Создайте массив из n случайных чисел, n вводит пользователь. Распечатайте его по 5 чисел в строке в обратном порядке.
function task_g() {
	const n = parseInt(document.getElementById('massive').value)
	const arr = []
	for (let i = 0; i < n; i++) {
		arr.push(Math.floor(Math.random() * 100))
	}
	document.getElementById('task_g').textContent = arr.reverse().slice(0, 5).join(' ')
}

// h. Создайте действительную квадратную матрицу порядка n (n — натуральное число, вводит пользователь), заполненную случайными значениями. Заменить нулями все элементы матрицы, находящиеся на ее главной и побочной диагоналях, кроме наибольшего и наименьшего из них.
function task_h() {
    const n = parseInt(document.getElementById('matrix').value);
    if (n < 1) return;

    // Создаем матрицу
    const matrix = Array.from({length: n}, () => 
        Array.from({length: n}, () => Math.random() * 200 - 100) // [-100, 100]
    );

    // Находим min/max среди диагональных элементов
    let minVal = Infinity, maxVal = -Infinity;
    for (let i = 0; i < n; i++) {
        const val1 = matrix[i][i];
        const val2 = matrix[i][n - 1 - i];
        if (val1 < minVal) minVal = val1;
        if (val1 > maxVal) maxVal = val1;
        if (val2 < minVal) minVal = val2;
        if (val2 > maxVal) maxVal = val2;
    }

    // Копируем матрицу и зануляем диагонали, кроме min/max
    const result = matrix.map(row => [...row]);
    for (let i = 0; i < n; i++) {
        if (matrix[i][i] !== minVal && matrix[i][i] !== maxVal) result[i][i] = 0;
        if (matrix[i][n - 1 - i] !== minVal && matrix[i][n - 1 - i] !== maxVal) result[i][n - 1 - i] = 0;
    }

    // Вывод
    const html = result.map(row => row.map(cell => cell.toFixed(2)).join('\t')).join('<br>');
    document.getElementById('task_h').innerHTML = html;
}

// i. Напишите программу, которая прибавляет к текущей дате n дней и выводит ее на экран, n водит пользователь.
function task_i() {
  	const n = parseInt(document.getElementById('date').value);
		const date = new Date();
		date.setDate(date.getDate() + n);
		document.getElementById('task_i').textContent = date.toLocaleDateString();
}

// j. Напишите программу, которая выводит сколько месяцев осталось от текущей даты до 1 сентября.
function task_j() {
	const now = new Date()
	let target = new Date(now.getFullYear(), 8, 1) // 8 = сентябрь (0-индекс)
	if (now > target) target.setFullYear(target.getFullYear() + 1) // следующий год

	let months =
		(target.getFullYear() - now.getFullYear()) * 12 +
		(target.getMonth() - now.getMonth())
	if (now.getDate() > 1) months-- // уменьшаем, если день > 1

	document.getElementById('task_j').textContent = `${months} месяцев`
}

// ----------------------------------------------------------------------------------------------------------- //

// Задание 2

