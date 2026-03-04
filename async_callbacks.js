function readConfig(name, callback) {
	setTimeout(
		() => {
			console.log('(1) config from ' + name + ' loaded')
			callback()
		},
		Math.floor(Math.random() * 1000),
	)
}

function doQuery(statement, callback) {
	setTimeout(
		() => {
			console.log('(2) SQL query executed: ' + statement)
			callback()
		},
		Math.floor(Math.random() * 1000),
	)
}

function httpGet(url, callback) {
	setTimeout(
		() => {
			console.log('(3) Page retrieved: ' + url)
			callback()
		},
		Math.floor(Math.random() * 1000),
	)
}

function readFile(path, callback) {
	setTimeout(
		() => {
			console.log('(4) Readme file from ' + path + ' loaded')
			callback()
		},
		Math.floor(Math.random() * 1000),
	)
}

console.log('start')
readConfig('myConfig', () => {
	doQuery('select * from cities', () => {
		httpGet('http://google.com', () => {
			readFile('README.md', () => {
				console.log('It is done!')
			})
		})
	})
})
console.log('end')
