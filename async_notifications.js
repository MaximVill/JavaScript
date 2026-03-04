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

const NotificationManager = {
	events: {},

	subscribe: function (event, callback) {
		if (!this.events[event]) {
			this.events[event] = []
		}
		this.events[event].push(callback)
	},

	notify: function (event, data) {
		if (this.events[event]) {
			this.events[event].forEach(callback => callback(data))
		}
	},
}

console.log('start')

NotificationManager.subscribe('configLoaded', () => {
	doQuery('select * from cities', () => {
		NotificationManager.notify('queryDone')
	})
})

NotificationManager.subscribe('queryDone', () => {
	httpGet('http://google.com', () => {
		NotificationManager.notify('httpDone')
	})
})

NotificationManager.subscribe('httpDone', () => {
	readFile('README.md', () => {
		NotificationManager.notify('fileDone')
	})
})

NotificationManager.subscribe('fileDone', () => {
	console.log('It is done!')
})

readConfig('myConfig', () => {
	NotificationManager.notify('configLoaded')
})

console.log('end')
