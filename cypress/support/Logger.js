const fs = require('fs-extra')
const logsPath = 'logs/combined.log'
function Logger(log) {
	if (!fs.existsSync(logsPath)) {
		fs.mkdirSync('logs')
	}
	fs.writeFileSync(
		'logs/combined.log',
		`${getCurrentTimeFormatted()} ${log} \n`,
		{
			flag: 'a+',
		}
	)
}

/**
 *
 * @returns  date & time in YYYY-MM-DD HH:MM:SS format
 */
function getCurrentTimeFormatted() {
	let date_ob = new Date()

	// current date
	// adjust 0 before single digit date
	let date = ('0' + date_ob.getDate()).slice(-2)
	// current month
	let month = ('0' + (date_ob.getMonth() + 1)).slice(-2)
	// current year
	let year = date_ob.getFullYear()
	// current hours
	let hours = date_ob.getHours()
	// current minutes
	let minutes = date_ob.getMinutes()
	// current seconds
	let seconds = date_ob.getSeconds()

	// return date & time in YYYY-MM-DD HH:MM:SS format
	return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`
}

module.exports = {
	Logger,
}
