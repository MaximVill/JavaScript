function ask_password(login, password, success, failure) {
	const loginLower = login.toLowerCase()
	const passwordLower = password.toLowerCase()
	const vowels = 'aeiouy'
	const vowelCount = passwordLower
		.split('')
		.filter(ch => vowels.includes(ch)).length
	let error = null
	if (vowelCount !== 3) {
		error = 'Wrong number of vowels'
	}
	const consonantsLogin = loginLower
		.split('')
		.filter(ch => !vowels.includes(ch) && /[a-z]/.test(ch))
	const consonantsPassword = passwordLower
		.split('')
		.filter(ch => !vowels.includes(ch) && /[a-z]/.test(ch))
	if (JSON.stringify(consonantsLogin) !== JSON.stringify(consonantsPassword)) {
		if (error) {
			error = 'Everything is wrong'
		} else {
			error = 'Wrong consonants'
		}
	}
	if (error) {
		failure(login, error)
	} else {
		success(login)
	}
}

function main(login, password) {
	ask_password(
		login,
		password,
		function (login) {
			console.log('Привет, ' + login + '!')
		},
		function (login, error) {
			console.log(
				'Кто-то пытался притвориться пользователем ' +
					login +
					', но в пароле допустил ошибку: ' +
					error.toUpperCase() +
					'.',
			)
		},
	)
}

main('мной', '12345')
main('Maxim', 'miskam')
main('login', 'aaalgn')
