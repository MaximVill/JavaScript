// Элементы языка
// == Задание №1 ==
function task1() {
	let a = false
	let b = null
	let c = undefined
	let d = 1
	let e = '2'

	let result = `a = ${a}: ${typeof a}\n`
	result += `b = ${b}: ${typeof b}\n`
	result += `c = ${c}: ${typeof c}\n`
	result += `d = ${d}: ${typeof d}\n`
	result += `e = ${e}: ${typeof e}`

	console.log(`\n>> ЭЛЕМЕНТЫ ЯЗЫКА <<\n\n== Задание №1 ==\n${result}`)
}

// == Задание №2 ==
function task2() {
	let a = 69
	let b = 52.67

	let result = `a = ${a}, b = ${b}\n\n`
	result += `a == b: ${a == b}\n`
	result += `a < b: ${a < b}\n`
	result += `a <= b: ${a <= b}\n`
	result += `a > b: ${a > b}`

	console.log(`\n== Задание №2 ==\n${result}`)
}

// == Задание №3 ==
function task3() {
	let a = false
	let b = null
	let c = undefined

	console.log('\n== Задание №3 ==:')
	console.log('a:', a, typeof a)
	console.log('b:', b, typeof b)
	console.log('c:', c, typeof c)
}

// == Задание №4 ==
function task4() {
	console.log(`\n== Задание №4 ==`)
	console.log('1' + 2 + 3)
	console.log(1 + 2 + '3')
	console.log('1' - 2)
	console.log('1' + -2)
	console.log('1' + '1' - '1')
	console.log('foo' + -'bar')
	console.log(0 == '0')
	console.log(0.5 + 0.1 == 0.6)
	console.log(0.1 + 0.2 == 0.3)
	console.log(true + true + true == 3)
	console.log(true == 1)
	console.log(true === 1)
	console.log(1 < 2 < 3)
	console.log(3 > 2 > 1)
	console.log(9007199254740991 + 1 == 9007199254740991 + 2)
	console.log(Math.sqrt(-1) == Math.sqrt(-1))
}

// == Задание №5 ==
function task5() {
	let str1 = 'Кто '
	let str2 = 'ты '
	let str3 = 'такой?'

	let concatenation = str1 + str2 + str3
	let result = concatenation

	console.log(`\n== Задание №5 ==\n${result}`)
}

// == Задание №6 ==
function task6() {
	let str = '20'
	let a = 5

	console.log('\n== Задание №6 ==')
	console.log(
		'str + a: ',
		str + a,
		' - JS превращает 5 в строку, из-за мысли о конкатинации строк благодаря плюсу',
	)
	console.log(
		'str - a: ',
		str - a,
		' - JS не умеет конкатинировать строки с минуосм и превращет строку в число',
	)
	console.log(
		'str * "2": ',
		str * '2',
		' - Умножние работает только с числами, поэтому перевел строку в число',
	)
	console.log(
		'str / 2: ',
		str / 2,
		' - Деление работает только с числами, поэтому перевел строку в число',
	)
}

// == Задание №7 ==
function task7() {
	let a = '12'
	let b = '7.15'

	let result = `Ответ: ${Math.round(a % b)}`

	console.log(`\n== Задание №7 ==\n${result}`)
}

// == Задание №8 ==
function task8() {
	let x = 12.214
	let numerator = x ** (2 - 7 * x + 10)
	let denominator = x ** (2 - 8 * x + 12)
	let result = `Ответ: ${numerator / denominator}`

	console.log(`\n== Задание №8 ==\n${result}`)
}

// == Задание №9 ==
function task9() {
	let mail = 'studmaximvill06gmail.com'
	let result

	for (let i = 0; i < mail.length; i++) {
		if (mail[i] === '@') {
			result = true
			break
		} else {
			result = 'Адрес электронной почты не содержит @'
		}
	}

	console.log(`\n== Задание №9 ==\n${result}\n`)
	console.log(`\n===========================\n`)
}

// Управление потоком
// == Задание №1 ==
function task10() {
	let age = 31
	let result

	if (age >= 18 && age <= 30) {
		result = 'Для молодежи'
	} else if (age >= 1 && age <= 17) {
		result = 'Для детей'
	} else {
		result = 'Для всех возрастов'
	}

	console.log(`\n>> УПРАВЛЕНИЕ ПОТОКОМ <<\n\n== Задание №1 ==\n${result}`)
}

// == Задание №2 ==
function task11() {
	let a = 15
	let b = 27
	let max = a > b ? a : b

	console.log(`\n== Задание №2 ==\nМаксимум: ${max}`)
}

// == Задание №3 ==
function task12() {
	let crows = 4
	let ending
	let result

	switch (crows) {
		case 1:
			ending = 'ворона'
			break
		case 2:
		case 3:
		case 4:
			ending = 'вороны'
			break
		default:
			ending = 'ворон'
	}

	result = `На ветке сидит ${crows} ${ending}`

	console.log(`\n== Задание №3 ==\n${result}`)
}

// == Задание №4 ==
function task13() {
	let i = 0
	let result = 'Цикл while: '
	while (i <= 50) {
		if (i % 2 !== 0) {
			result += i + ' '
		}
		i++
	}

	result += '\nЦикл for: '
	for (let j = 0; j <= 50; j++) {
		if (j % 2 !== 0) {
			result += j + ' '
		}
	}

	console.log(`\n== Задание №4 ==\n${result}`)
}

// == Задание №5 ==
function task14() {
	let start = 0
	let result

	for (let i = 1; i <= 15; i++) {
		if (i === 5 || i === 7) {
			continue
		}
		start += i
	}

	result = `Сумма: ${start}`

	console.log(`\n== Задание №5 ==\n${result}`)
}

// == Задание №6 ==
function task15() {
	let x = 2
	let y = 3
	let start = 1
	let counter = 0
	let result

	while (counter < y) {
		start *= x
		counter++
	}

	result = `${x}^${y} = ${start}`

	console.log(`\n== Задание №6 ==\n${result}`)
}

// --- Главный исполнительный блок ---
task1()
task2()
task3()
task4()
task5()
task6()
task7()
task8()
task9()
task10()
task11()
task12()
task13()
task14()
task15()
