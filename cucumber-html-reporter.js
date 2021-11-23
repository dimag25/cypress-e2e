const report = require('multiple-cucumber-html-reporter');

report.generate({
	jsonDir: './cypress/cucumber-json',
	reportPath: './cypress/reports/cucumber-htmlreport.html',
	metadata:{
        browser: {
            name: 'chrome',
            version: '94'
        },
        device: 'Local test machine',
        platform: {
            name: 'windows',
            version: '10'
        }
    },
    customData: {
        title: 'Run info',
        data: [
            {label: 'Project', value: 'Custom project'},
            {label: 'Release', value: '1.1.1'},
            {label: 'Cycle', value: '1.0'},
            {label: 'Execution Start Time', value: 'Nov 17th 2021, 02:31 PM EST'},
            {label: 'Execution End Time', value: 'Nov 17th 2021, 02:56 PM EST'}
        ]
    }
});