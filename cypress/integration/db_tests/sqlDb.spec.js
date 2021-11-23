/// <reference types="cypress" />

describe('db sql flow tests', () => {
	it('database sql server interaction', () => {
		cy.sqlServer('SELECT  top 10 * FROM [TBL_Stories]').then(function(res) {
			const projectName = res[0][8]
			console.log(projectName)
			expect(projectName).to.eq('ABSA')
		})
	})
})
