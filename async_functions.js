// f1(x) = x^2
function f1(x, notification) {
	setTimeout(() => {
		const result = x * x
		console.log(`f1(${x}) = ${x}² = ${result}`)
		notification(result)
	}, 100)
}

// f2(x) = 2x
function f2(x, notification) {
	setTimeout(() => {
		const result = 2 * x
		console.log(`f2(${x}) = 2 * ${x} = ${result}`)
		notification(result)
	}, 100)
}

// f3(x) = -2
function f3(x, notification) {
	setTimeout(() => {
		const result = -2
		console.log(`f3(${x}) = -2 = ${result}`)
		notification(result)
	}, 100)
}

// f4(x) = x + 1
function f4(x, notification) {
	setTimeout(() => {
		const result = x + 1
		console.log(`f4(${x}) = ${x} + 1 = ${result}`)
		notification(result)
	}, 100)
}

// f5(x) = 3x
function f5(x, notification) {
	setTimeout(() => {
		const result = 3 * x
		console.log(`f5(${x}) = 3 * ${x} = ${result}`)
		notification(result)
	}, 100)
}

// f6(x) = -5
function f6(x, notification) {
	setTimeout(() => {
		const result = -5
		console.log(`f6(${x}) = -5 = ${result}`)
		notification(result)
	}, 100)
}

const functions = [f1, f2, f3, f4, f5, f6]

/**
 * Последовательное вычисление суммы асинхронных функций
 * @param {number} x - значение x
 * @param {number} n - количество функций для вычисления
 * @param {Function} callback - callback для получения результата
 */
function calculateF(x, n, callback) {
	let intermediateResult = 0
	let currentIndex = 1

	console.log(`\n=== Начало вычисления F(${x}) с n = ${n} ===`)
	console.log(`Начальное значение: ${intermediateResult}\n`)

	function notification(value) {
		intermediateResult += value
		console.log(`→ Промежуточный результат: ${intermediateResult}\n`)

		if (currentIndex < n) {
			currentIndex++
			functions[currentIndex - 1](x, notification)
		} else {
			console.log(
				`=== Конечный результат: F(${x}) = ${intermediateResult} ===\n`,
			)
			callback(intermediateResult)
		}
	}

	if (n >= 1) {
		functions[0](x, notification)
	} else {
		callback(0)
	}
}

function runTests() {
	const x = 3

	console.log('='.repeat(50))
	console.log('ПРИМЕР a: n = 2')
	console.log('Функции: f1(x) = x², f2(x) = 2x')
	console.log('Ожидаемый результат: 9 + 6 = 15')
	console.log('='.repeat(50))

	calculateF(x, 2, result => {
		console.log('='.repeat(50))
		console.log('ПРИМЕР b: n = 4')
		console.log('Функции: f1(x) = x², f2(x) = 2x, f3(x) = -2, f4(x) = x + 1')
		console.log('Ожидаемый результат: 9 + 6 + (-2) + 4 = 17')
		console.log('='.repeat(50))

		calculateF(x, 4, result => {
			console.log('='.repeat(50))
			console.log('ПРИМЕР c: n = 6')
			console.log(
				'Функции: f1(x) = x², f2(x) = 2x, f3(x) = -2, f4(x) = x + 1, f5(x) = 3x, f6(x) = -5',
			)
			console.log('Ожидаемый результат: 9 + 6 + (-2) + 4 + 9 + (-5) = 21')
			console.log('='.repeat(50))

			calculateF(x, 6, result => {
				console.log('Все примеры выполнены!')
			})
		})
	})
}

runTests()
