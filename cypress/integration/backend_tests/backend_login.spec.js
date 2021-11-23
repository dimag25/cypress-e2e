/// <reference types="cypress" />
import HomePage from '../../support/Pages/Homepage'
import LoginPage from '../../support/Pages/LoginPage'
import TestFilters from '../../support/filterTests.js'

TestFilters(['Smoke'], () => {
	describe('Login via backend (Smoke)', () => {
		beforeEach(function() {
			HomePage.navigateToHomePage('/')
		})

		it('login via backend api - Success flow ', function() {
			cy.login_api(Cypress.env('username'), Cypress.env('password'), 200)
			LoginPage.verifyLoginSuccess(Cypress.env('username'))
		})

		it('login via backend api - Fail flow ', function() {
			cy.login_api('fakeuser', Cypress.env('password'), 403)
		})
	})
})
