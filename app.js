// Задание 1
// Promise может быть выполнен только один раз, поэтому второй resolve игнорируется
// =========================================================
function task1() {
	console.log('\n=== Задание 1 ===')

	let promise = new Promise(function (resolve, reject) {
		resolve(1)
		setTimeout(() => resolve(2), 1000)
	})
	promise.then(console.log)
}

// =========================================================
// Задание 2
// =========================================================
function readConfig(name) {
	console.log('\n=== Задание 2 ===')
	return new Promise(resolve => {
		setTimeout(
			() => {
				console.log('(1) config from ' + name + ' loaded')
				resolve()
			},
			Math.floor(Math.random() * 1000),
		)
	})
}

function doQuery(statement) {
	return new Promise(resolve => {
		setTimeout(
			() => {
				console.log('(2) SQL query executed: ' + statement)
				resolve()
			},
			Math.floor(Math.random() * 1000),
		)
	})
}

function httpGet(url) {
	return new Promise(resolve => {
		setTimeout(
			() => {
				console.log('(3) Page retrieved: ' + url)
				resolve()
			},
			Math.floor(Math.random() * 1000),
		)
	})
}

function readFile(path) {
	return new Promise(resolve => {
		setTimeout(
			() => {
				console.log('(4) Readme file from ' + path + ' loaded')
				resolve()
			},
			Math.floor(Math.random() * 1000),
		)
	})
}

function done() {
	console.log('It is done!')
}

function runWithPromises() {
	console.log('start promises')
	return readConfig('myConfig')
		.then(() => doQuery('select * from cities'))
		.then(() => httpGet('http://google.com'))
		.then(() => readFile('README.md'))
		.then(() => {
			done()
			console.log('end promises')
		})
}

// =========================================================
// Задание 3
// =========================================================
function makeAsyncFi(name, fn) {
	return x =>
		new Promise(resolve => {
			setTimeout(
				() => {
					const value = fn(x)
					console.log(`${name}(${x}) = ${value}`)
					resolve(value)
				},
				Math.floor(Math.random() * 500),
			)
		})
}

const f1 = makeAsyncFi('f1', x => x * x)
const f2 = makeAsyncFi('f2', x => 2 * x)
const f3 = makeAsyncFi('f3', () => -2)
const f4 = makeAsyncFi('f4', x => x - 1)
const f5 = makeAsyncFi('f5', () => 3)
const f6 = makeAsyncFi('f6', x => -x)

function calcFSequentialPromise(x, funcs) {
	let sum = 0

	return funcs
		.reduce((chain, fi, idx) => {
			return chain
				.then(() => fi(x))
				.then(value => {
					sum += value
					console.log(`Промежуточный результат после f${idx + 1}: ${sum}`)
				})
		}, Promise.resolve())
		.then(() => sum)
}

async function task3() {
	console.log('\n=== задание 3 ===')

	const r2 = await calcFSequentialPromise(3, [f1, f2])
	console.log('Ответ для n=2:', r2)

	const r4 = await calcFSequentialPromise(3, [f1, f2, f3, f4])
	console.log('Ответ для n=4:', r4)

	const r6 = await calcFSequentialPromise(3, [f1, f2, f3, f4, f5, f6])
	console.log('Ответ для n=6:', r6)
}

// =========================================================
// Задание 4
// =========================================================
function periodicSum(a, b) {
	return new Promise((resolve, reject) => {
		if (typeof a !== 'number' || typeof b !== 'number') {
			reject(new Error('Оба аргумента должны быть числами (number)'))
			return
		}

		let current = a
		let calls = 0

		const timer = setInterval(() => {
			calls += 1
			current = current + b
			console.log(`Вызов ${calls}, сумма: ${current}`)

			if (calls === 5) {
				clearInterval(timer)
				resolve({ sum: current, calls })
			}
		}, 2000)
	})
}

async function task4() {
	console.log('\n=== Задание 4 ===')

	try {
		const ok = await periodicSum(2, 3)
		console.log('Успешное выполнение:', ok)
	} catch (e) {
		console.log('Ошибка (неожиданно):', e.message)
	}

	try {
		const bad = await periodicSum(2, 'x')
		console.log('Успешное выполнение (неожиданно):', bad)
	} catch (e) {
		console.log('Ожидаемая ошибка:', e.message)
	}
}

// =========================================================
// Задание 5
// =========================================================
function readConfigP(name) {
	return readConfig(name)
}

function doQueryP(statement) {
	return doQuery(statement)
}

function httpGetP(url) {
	return httpGet(url)
}

function readFileP(path) {
	return readFile(path)
}

async function task2_asyncAwait() {
	console.log('\n=== Задание 5.2 ===')
	console.log('start')
	await readConfigP('myConfig')
	await doQueryP('select * from cities')
	await httpGetP('http://google.com')
	await readFileP('README.md')
	console.log('It is done!')
	console.log('end')
}

async function calcFSequentialAsync(x, funcs) {
	let sum = 0
	for (let i = 0; i < funcs.length; i++) {
		const value = await funcs[i](x)
		sum += value
		console.log(`Промежуточный результат после f${i + 1}: ${sum}`)
	}
	return sum
}

async function task3_asyncAwait() {
	console.log('\n=== задание 5.3 ===')

	const r2 = await calcFSequentialAsync(3, [f1, f2])
	console.log('Ответ для n=2:', r2)

	const r4 = await calcFSequentialAsync(3, [f1, f2, f3, f4])
	console.log('Ответ для n=4:', r4)

	const r6 = await calcFSequentialAsync(3, [f1, f2, f3, f4, f5, f6])
	console.log('Ответ для n=6:', r6)
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms))
}

async function periodicSumAsync(a, b) {
	if (typeof a !== 'number' || typeof b !== 'number') {
		throw new Error('Оба аргумента должны быть числами (number)')
	}

	let current = a
	for (let i = 1; i <= 5; i++) {
		await sleep(2000)
		current += b
		console.log(`Вызов ${i}, сумма: ${current}`)
	}

	return { sum: current, calls: 5 }
}

async function task4_asyncAwait() {
	console.log('\n=== Задание 5.4 ===')

	try {
		const ok = await periodicSumAsync(5, 2)
		console.log('Успешное выполнение:', ok)
	} catch (e) {
		console.log('Ошибка (неожиданно):', e.message)
	}

	try {
		await periodicSumAsync(undefined, 2)
	} catch (e) {
		console.log('Ожидаемая ошибка:', e.message)
	}
}

// =========================================================
// задание 6
// =========================================================
async function wait() {
	await new Promise(resolve => setTimeout(resolve, 1000))
	return 10
}

function f() {
	// здесь нельзя await, поэтому работаем как с Promise
	wait()
		.then(result => {
			console.log('Result from wait():', result)
		})
		.catch(err => {
			console.log('Error from wait():', err.message)
		})
}

function task6() {
	console.log('\n=== Задание 6 ===')
	f()
}

// =========================================================
// Задание 7
// =========================================================
const UNIT = 1000 //1 единица времени это 1 секунда

function delay(units) {
	return new Promise(resolve => setTimeout(resolve, units * UNIT))
}

async function runTask(name, taskNo, prepTime, defenseTime) {
	console.log(`${name} started the ${taskNo} task.`)
	await delay(prepTime)

	console.log(`${name} moved on to the defense of the ${taskNo} task.`)
	await delay(defenseTime)

	console.log(`${name} completed the ${taskNo} task.`)
}

async function processCandidate(candidate) {
	const [name, prep1, def1, prep2, def2] = candidate

	await runTask(name, 1, prep1, def1)

	console.log(`${name} is resting.`)
	await delay(5)

	await runTask(name, 2, prep2, def2)
}

async function interviews(candidates) {
	await Promise.all(candidates.map(processCandidate))
}

async function task7() {
	console.log('\n=== Задание 7 ===')

	await interviews([
		['Ivan', 5, 2, 7, 2],
		['John', 3, 4, 5, 1],
		['Sophia', 4, 2, 5, 1],
	])
}

// =========================================================
// Общий запуск всех пунктов
// =========================================================
async function runAll() {
	task1()
	await sleep(1200)

	await runWithPromises()

	await task3()

	await task4()

	await task2_asyncAwait()
	await task3_asyncAwait()
	await task4_asyncAwait()

	task6()
	await sleep(1200)

	await task7()

	console.log('\n=== Все задания выполнены ===')
}

runAll().catch(err => {
	console.error('Unhandled error:', err)
})
