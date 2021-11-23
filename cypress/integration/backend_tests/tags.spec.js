import HomePage from '../../support/Pages/Homepage'

import TestFilters from '../../support/filterTests.js'

TestFilters(['Smoke'], () => {
describe('Mocking  tags api data (Smoke)', () => {
	beforeEach(function() {
		HomePage.navigateToHomePage('/')
		cy.intercept('GET', '**/tags', { fixture: 'tags.json' })
	})
	it('should have tags list with routing object', () => {
		cy.get('.tag-list')
			.should('contain', 'cypress')
			.and('contain', 'test')
			.and('contain', 'automation')
	})
})
})