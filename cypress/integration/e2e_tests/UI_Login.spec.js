/// <reference types="cypress" />

import HomePage from '../../support/Pages/Homepage'
import LoginPage from '../../support/Pages/LoginPage'
import TestFilters from '../../support/filterTests.js'

TestFilters(['E2E'], () => {
	describe('Login / Logout Tests - (E2E)', () => {
		beforeEach(function() {
			HomePage.navigateToHomePage('/')
			HomePage.navigateToLogin()
			LoginPage.clearLoginTextBoxes()
		})

		it('should try to login with invalid data', () => {
			LoginPage.loginFlow('invalid username', 'invalid password')
			LoginPage.verifyErrorMessage('email or password is invalid')
		})

		it('should login & logout  application', () => {
			LoginPage.loginFlow(
				Cypress.env('username'),
				Cypress.env('password')
			)
			LoginPage.verifyLoginSuccess(Cypress.env('username'))
			LoginPage.logoutFlow(Cypress.env('username'))
		})
	})
})
