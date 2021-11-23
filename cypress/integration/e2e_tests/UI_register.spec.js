/// <reference types="cypress" />

import HomePage from '../../support/Pages/Homepage'
import RegisterPage from '../../support/Pages/RegisterPage'
import TestFilters from '../../support/filterTests.js'

TestFilters(['E2E'], () => {
	describe('Register flow UI- (E2E)', () => {
		beforeEach(function() {})

		it('should try to register with valid data', () => {
			HomePage.navigateToHomePage('/')
			HomePage.navigateToRegister()
			RegisterPage.registerFlow()
		})

		it('validate registeration succeeded', () => {
			RegisterPage.verifyRegisterSuccess()
		})
	})
})
