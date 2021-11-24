/// <reference types="cypress" />
const allureWriter = require('@shelex/cypress-allure-plugin/writer')
const cucumber = require('cypress-cucumber-preprocessor').default
const sqlServer = require('cypress-sql-server')
const dbConfig = require('../../cypress.json')
const fs = require('fs-extra')
const path = require('path')
import { Logger } from '../support/Logger'

function getConfigurationByFile(file) {
	const pathToConfigFile = path.resolve('cypress', 'config', `${file}.json`)
	if (!fs.existsSync(pathToConfigFile)) {
		return {}
	}
	return fs.readJson(pathToConfigFile)
}

function writeAllureEnvironmentConfig(browser) {
	const propertiesFilePath = './allure-results/environment.properties'
	const allureResultsPath = 'allure-results'
	const cypressJson = JSON.parse(fs.readFileSync('cypress.json'))
	const envConfigs = `browser=${browser}\n url=${cypressJson.baseUrl}\n userName=${cypressJson.env.username}\n`
	//clean previous allure-results
	if (fs.existsSync(allureResultsPath)) {
		fs.rmdirSync(allureResultsPath, { recursive: true })
	}
	//create new results folder
	fs.mkdirSync(allureResultsPath)
	//write new properties file to allure-results.
	fs.writeFileSync(propertiesFilePath, envConfigs)
}
/**
 * @type {Cypress.PluginConfig}
 */
// module.exports = (on, config) => {
// 	//db config
// 	const tasks = sqlServer.loadDBPlugin(dbConfig.db)
// 	on('task', tasks)
// }
module.exports = (on, config) => {
	on('before:run', details => {
		if (details.specs && details.browser) {
			//write allure env details
			writeAllureEnvironmentConfig(details.browser.name)

			// details.specs and details.browser will be undefined in interactive mode
			Logger(
				'Running: ' +
					details.specs.length +
					' specs in ' +
					details.browser.name
			)
		}
	})

	on('before:spec', spec => {
		Logger('Running: ' + spec.relative)
	})

	on('after:spec', (spec, results) => {
		Logger('Finished running:' + spec.relative)
	})

	on('after:run', results => {
		if (results) {
			// results will be undefined in interactive mode
			Logger(
				results.totalPassed +
					' out of:' +
					results.totalTests +
					' passed'
			)
		}
	})

	//config files :qa,etc..
	const file = config.env.configFile

	//allure config plugin
	allureWriter(on, config)

	//cucumber plugin
	on('file:preprocessor', cucumber())

	return getConfigurationByFile(file)
}
