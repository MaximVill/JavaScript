console.log('\n>> ФУНКЦИИ <<\n')
// Задание 1
console.log('== Задание 1 ==')
function differencePrint(a, b) {
	console.log(`Вывод из функции: ${a - b}`)
}
function differenceReturn(a, b) {
	return a - b
}
differencePrint(22, 8)
console.log(`Возврат из функции: ${differenceReturn(22, 8)}`)

// Задание 2
console.log('\n== Задание 2 ==')
function greet(age) {
	if (age < 18) {
		console.log('Привет, малыш!')
	} else {
		console.log('Здравствуйте, юноша!')
	}
}
const myAge = 19
console.log(`Ваш возраст: ${myAge}`)
greet(myAge)

// Задание 3
console.log('\n== Задание 3 ==')
function maxOfThree(a, b, c) {
	return Math.max(a, b, c)
}
const x = 42,
	y = 69,
	z = 228
console.log(`Числа: ${x}, ${y}, ${z}`)
console.log('Наибольшее:', maxOfThree(x, y, z))

// Задание 4
console.log('\n== Задание 4 ==')
let variable = 'Глобальная переменная'
function f() {
	let variable = 'Локальная переменная'
	console.log(variable) // Локальная переменная
}
f()
console.log(variable) // Глобальная переменная

// Задание 5
console.log('\n== Задание 5 ==')
function calculateU(x, y, z) {
	const numerator = Math.max(x, y) + Math.max(x + y, z)
	const denominator = Math.max(0.5, x + z) ** 2
	return numerator / denominator
}
console.log('u =', calculateU(1, 2, 3))

// Задание 6
console.log('\n== Задание 6 ==')
function perimeter(...coords) {
	let p = 0
	const n = coords.length
	for (let i = 0; i < n; i += 2) {
		const x1 = coords[i]
		const y1 = coords[i + 1]
		const x2 = coords[(i + 2) % n]
		const y2 = coords[(i + 3) % n]
		p += Math.hypot(x2 - x1, y2 - y1)
	}
	return p
}
console.log('Периметр квадрата:', perimeter(1, 3, 3, 7, 2, 0, 2, 6))
console.log('Периметр треугольника:', perimeter(2, 2, 8, 3, 3, 2))

// Задание 7
console.log('\n== Задание 7 ==')
function sequenceMember(n) {
	if (n === 1) return 1
	function sumPrevious(k) {
		if (k === 1) return sequenceMember(1)
		return sequenceMember(k) + sumPrevious(k - 1)
	}
	return Math.sin(sumPrevious(n - 1))
}
const N = 4
console.log(`N = ${N}`)
for (let i = 1; i <= N; i++) {
	console.log(`${i}-й член: ${sequenceMember(i).toFixed(6)}`)
}

console.log('\n__________________________________________')
console.log('>> МАССИВЫ <<\n')

// Задание 1
console.log('== Задание 1 ==')
const arr = ['Первый', 'Второй', 'Третий']
console.log(`Элемент с индексом 2: "${arr[2]}"`)
console.log(`Количество элементов: ${arr.length}`)
arr.splice(1, 1)
console.log('После удаления:')
for (let i = 0; i < arr.length; i++) {
	console.log(arr[i])
}

// Задание 2
console.log('\n== Задание 2 ==')
function showCountries() {
	const countries = ['Россия', 'Китай', 'США', 'Индия', 'Бразилия']
	const population = ['146 млн', '1.41 млрд', '345 млн', '1.45 млрд', '218 млн']
	console.log('for:')
	for (let i = 0; i < countries.length; i++) {
		console.log(`${i + 1}. ${countries[i]} — ${population[i]}`)
	}
	console.log('\nfor in:')
	for (let idx in countries) {
		console.log(`${Number(idx) + 1}. ${countries[idx]} — ${population[idx]}`)
	}
}
showCountries()

// Задание 3
console.log('\n== Задание 3 ==')
let months = ['January', 'February', 'March', 'April', 'May', 'June']
let len = months.pop()
console.log('Массив:', months.join(' '))
console.log('Удалённый элемент:', len)

// Задание 4
console.log('\n== Задание 4 ==')

let a = [1, 2, 3, 4, 5, 6, 7]
let t = a.slice(0, 3)
console.log(t)

// Задание 5
console.log('\n== Задание 5 ==')
let b = [1, 2, 3, 4, 5, 6, 7]
let d = b.splice(1, 3)
console.log(b)

// Задание 6
console.log('\n== Задание 6 ==')
const nums = [1, 2, 3, 4, 5]
console.log(nums.toReversed())

// Задание 7
console.log('\n== Задание 7 ==')
const mixed = ['c', 5, 2, 'b', 3, 1, 4, 'a']
console.log(mixed.toSorted())

// Задание 8
console.log('\n== Задание 8 ==')
const digits = [1, 2, 3, 4, 5]
console.log(digits.join('+'))

// Задание 9
console.log('\n== Задание 9 ==')
function findMedian(a, b) {
	const merged = [...a, ...b].sort((x, y) => x - y)
	const n = merged.length
	const mid = Math.floor(n / 2)
	return n % 2 === 1 ? merged[mid] : (merged[mid - 1] + merged[mid]) / 2
}
const left = [1, 2, 5, 4, 6]
const right = [8, 2, 5, 9, 5]
console.log('Медиана двух массивов:', findMedian(left, right))

// Задание 10
console.log('\n== Задание 10 ==')
function swapMaxMin() {
	const arr = Array.from(
		{ length: 10 },
		() => Math.floor(Math.random() * 100) - 20,
	)
	console.log('Исходный массив:', arr)
	let minIdx = 0,
		maxIdx = 0
	for (let i = 1; i < arr.length; i++) {
		if (arr[i] < arr[minIdx]) minIdx = i
		if (arr[i] > arr[maxIdx]) maxIdx = i
	}
	;[arr[minIdx], arr[maxIdx]] = [arr[maxIdx], arr[minIdx]]
	console.log('После обмена min и max:', arr)
}
swapMaxMin()

// Задание 11
console.log('\n== Задание 11 ==')
function checkDescendingOrder(arr) {
	for (let i = 1; i < arr.length; i++) {
		if (arr[i - 1] < arr[i]) {
			console.log('Нарушение на индексе:', i)
			return
		}
	}
	console.log('Массив в обратном порядке:', arr.toReversed().join(' '))
}
checkDescendingOrder([5, 4, 4, 2, 1])
checkDescendingOrder([9, 6, 8, 4, 3])

// Задание 12
console.log('\n== Задание 12 ==')
function modifyByIndexAndSign(arr) {
	for (let i = 0; i < arr.length; i++) {
		if (i % 2 === 1 && arr[i] > 0) arr[i] *= 3
		if (i % 2 === 0 && arr[i] < 0) arr[i] /= 5
	}
	return arr
}
console.log(modifyByIndexAndSign([10, -4, 7, 2, -16, 8, -8, 0]))
console.log(modifyByIndexAndSign([-2, -6, -10, -12]))

// Задание 13
console.log('\n== Задание 13 ==')
const matrix5x5 = [
	[4, -2, 8, 1, -6],
	[-3, 5, 0, 7, 9],
	[12, -1, -4, 3, -8],
	[6, 2, -5, 10, 4],
	[-7, 11, 1, -9, 5],
]
for (let i = 0; i < 5; i++) {
	for (let j = 0; j < 5; j++) {
		const val = matrix5x5[i][j]
		if (val >= -5 && val <= 7) {
			console.log(`[${i}][${j}] = ${val}`)
		}
	}
}

// Задание 14
console.log('\n== Задание 14 ==\n')
const matrix = [
	[4, -1, 7, 2, 0],
	[-3, 5, 0, 8, -2],
	[12, -2, 3, -5, 9],
	[1, 6, -4, 9, 4],
]
let sumRowMax = 0
for (let row of matrix) {
	sumRowMax += Math.max(...row)
}
let prodColMin = 1
const cols = matrix[0].length
for (let j = 0; j < cols; j++) {
	let colMin = Infinity
	for (let row of matrix) {
		colMin = Math.min(colMin, row[j])
	}
	prodColMin *= colMin
}
console.log('Сумма максимумов строк:', sumRowMax)
console.log('Произведение минимумов столбцов:', prodColMin)

// Задание 15
console.log('\n== Задание 15 ==\n(ассоциативный массив книг)')
const booksByAuthor = {
	'А.С. Пушкин': ['Евгений Онегин', 'Руслан и Людмила', 'Капитанская дочка'],
	'С.А. Есенин': ['Письмо к женщине', 'Письмо матери', 'Чёрный человек'],
	'Дарья Донцова': ['Филе из золотого петушка', 'Дама с коготками'],
}
for (const author in booksByAuthor) {
	console.log(author + ':')
	booksByAuthor[author].forEach(book => {
		console.log('  - ' + book)
	})
	console.log('')
}
