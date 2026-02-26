// Объекты
console.log('Объекты')
console.log('Задание 1')
user = {
	name: 'John',
	surname: 'Smith',
}
user.name = 'Pete'
delete user.name
console.log(user)

console.log('\nЗадание 2')
myBrowser = {
	name: 'Microsoft  Internet Explorer',
	version: 9.0,
}
for (let i in myBrowser) {
	console.log(i + ': ' + myBrowser[i])
}

console.log('\nЗадание 3')
function isEmpty(obj) {
	return Object.keys(obj).length === 0
}
console.log(isEmpty({}))
console.log(isEmpty({ a: 1 }))

console.log('\nЗадание 4')
console.log(`user.name = 'Pete' Будет работать!`)
console.log(`user = 123 Не будет работать!`)

console.log('\nЗадание 5')
function multiplyNumber(obj) {
	for (let i in obj) {
		obj[i] *= 2
	}
	return obj
}
console.log(multiplyNumber({ obj: 3 }))

console.log('\nЗадание 6')
calculator = {
	read(a, b) {
		this.a = a
		this.b = b
	},
	sum() {
		return this.a + this.b
	},
	mul() {
		return this.a * this.b
	},
}
calculator.read(12, 14)
console.log(calculator.sum())
console.log(calculator.mul())

console.log('\nЗадание 7')
let ladder = {
	step: 0,
	up() {
		this.step++
		return this
	},
	down() {
		this.step--
		return this
	},
	showStep: function () {
		console.log(this.step)
		return this
	},
}
ladder.up().up().down().showStep().down().showStep()

console.log('\nЗадание 8')
function Browser(name, version) {
	this.name = name
	this.version = version
	this.aboutBrowser = function () {
		console.log(this.name + ' ' + this.version)
	}
}
let myBrowser2 = new Browser('Microsoft Internet Explorer', 9.0)
console.log(`Название браузера: ${myBrowser2.name}`)
console.log(`Версия браузера: ${myBrowser2.version}`)
myBrowser2.aboutBrowser()

console.log('\nЗадание 9')
function Employee(name, department, telephone, salary) {
	;((this.name = name),
		(this.department = department),
		(this.telephone = telephone),
		(this.salary = salary),
		(this.employeeInfo = function () {
			console.log(
				`Имя: ${this.name}, Отдел: ${this.department}, Телефон: ${this.telephone}, Зарплата: ${this.salary}`,
			)
		}))
}

let employee = new Employee('John', 'IT', '+79261234567', 10000)
employee.employeeInfo()

console.log('\nЗадание 10')
function Calculator() {
	this.read = function (a, b) {
		this.a = a
		this.b = b
	}
	this.sum = function () {
		return this.a + this.b
	}
	this.mul = function () {
		return this.a * this.b
	}
}
let calculator2 = new Calculator()
calculator2.read(14, 88)
console.log(calculator2.sum())
console.log(calculator2.mul())

console.log('\nЗадание 11')
function Accumulator(startingValue) {
	this.value = startingValue
	this.read = function (a) {
		this.value += a
	}
}
let accumulator = new Accumulator(1) // начальное значение 1
accumulator.read(10) // прибавляет 10 к текущему значению
accumulator.read(5) // прибавляет 5 к текущему значению
console.log(accumulator.value) // выведет 16

// Работа с прототипами
console.log('\nРабота с прототипами')
console.log('\nЗадание 1')
{
	let animal = {
		jumps: null,
	}
	let rabbit = {
		__proto__: animal,
		jumps: true,
	}
	console.log(rabbit.jumps) // свойство jumps есть в объекте rabbit
	delete rabbit.jumps
	console.log(rabbit.jumps) // удаленное свойство jumps все равно доступно через прототип animal, поэтому  null
	delete animal.jumps
	console.log(rabbit.jumps) // удаляется свойство jumps из объекта animal, и теперь возвращается undefined, так как оно не найдено ни в rabbit, ни в его прототипе animal
}

/*
Когда мы вызываем rabbit.eat(), метод eat устанавливает свойство full на объекте rabbit, так как this внутри метода eat ссылается на объект, который вызвал метод (в данном случае rabbit). Поэтому rabbit.full становится true.
Свойство full не устанавливается на объекте animal, так как метод eat не изменяет прототип, а только объект, который его вызвал. Поэтому animal.full остается undefined.
Проверка rabbit.hasOwnProperty('full') возвращает true, так как свойство full действительно принадлежит объекту rabbit, а не его прототипу animal.
*/
console.log('\nЗадание 2')
{
	let animal = {
		eat() {
			this.full = true
		},
	}
	let rabbit = {
		__proto__: animal,
	}
	rabbit.eat()
	console.log(rabbit.full)
	console.log(animal.full)
	console.log(rabbit.hasOwnProperty())
	console.log(rabbit.hasOwnProperty('full'))
}

/*
Проблема в том, что у хомяков нет собственного свойства stomach. Когда вызывается speedy.eat('apple'):

1) Метод eat находится в прототипе (hamster)
2) Выполняется this.stomach.push(food)
3) JS сначала ищет this.stomach в объекте speedy — не находит
4) Поднимается в hamster и находит там общий массив
5) apple пушится в hamster.stomach
Оба хомяка используют один и тот же массив из прототипа.

Нужно дать каждому хомяку собственный массив stomach:

let speedy = {
  __proto__: hamster,
  stomach: []    // ← свой собственный массив
}

let lazy = {
  __proto__: hamster,
  stomach: []    // ← свой собственный массив
}

*/
console.log('\nЗадание 3')
{
	let hamster = {
		stomach: [],
		eat(food) {
			this.stomach.push(food)
		},
	}
	let speedy = {
		__proto__: hamster,
	}
	let lazy = {
		__proto__: hamster,
	}
	speedy.eat('apple')
	console.log(speedy.stomach)
	console.log(lazy.stomach)
}

console.log('\nЗадание 4')
{
	String.prototype.color = 'black'
	String.prototype.write = stringWrite
	String.prototype.size = stringSize
	function stringWrite() {
		console.log('Цвет текста: ' + this.color)
		console.log('Текст: ' + this.toString())
		console.log('Размер: ' + this.size)
	}
	function stringSize() {
		return this.toString().length
	}
	let s = new String('Это строка')
	s.color = 'red'
	s.size = 14
	s.write()
	let s2 = new String('Вторая строка')
	s2.size = 16
	s2.write()
}

console.log('\nЗадание 5')
/*
Добавленная строка	            Результат console.log(rabbit.eats)	Причина
Rabbit.prototype = {};	        true	                              Объект ссылается на старый прототип
Rabbit.prototype.eats = false;	false	                              Меняется прототип, объект использует его
delete rabbit.eats;	            true	                              У объекта нет собственного свойства для удаления
delete Rabbit.prototype.eats;	  undefined	                          Удаляется свойство из прототипа
*/
{
	function Rabbit() {}
	Rabbit.prototype = {
		eats: true,
	}
	let rabbit = new Rabbit()
	console.log(rabbit.eats)
}

// Классы
console.log('\nКлассы')
console.log('\nЗадание 1')
{
	class Clock {
		constructor(hours, minutes, seconds) {
			this.hours = hours
			this.minutes = minutes
			this.seconds = seconds
		}
		clockRun() {
			const h = String(this.hours).padStart(2, '0')
			const m = String(this.minutes).padStart(2, '0')
			const s = String(this.seconds).padStart(2, '0')
			console.log(`${h}:${m}:${s}`)
		}
	}
	let clock = new Clock(13, 30, 0)
	clock.clockRun()
}

console.log('\nЗадание 2')
{
	class Animal {
		constructor(name) {
			this.name = name
		}
	}
	class Rabbit extends Animal {
		constructor(name) {
			super(name) // передача параметра в конструктор родителя
			this.created = Date.now()
		}
	}
	let rabbit = new Rabbit('Белый кролик')
	console.log(rabbit.name)
}
