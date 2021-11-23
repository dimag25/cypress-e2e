import { BasePage } from './BasePage'

/// <reference types="cypress" />
// @ts-check

export default class LoginPage extends BasePage {
	/**
    * static loginFlow
    @param userName:string, 
    @param password: string 
    */
	static loginFlow(userName, password) {
		cy.login_ui(userName, password)
	}

	static clearLoginTextBoxes() {
		cy.get('[placeholder="Email"]').clear()
		cy.get('[placeholder="Password"]').clear()
	}

	/**
	 * verify login success flow.
	 */
	static verifyLoginSuccess(userName) {
		cy.contains(userName).should('be.visible')
	}

	static verifyErrorMessage(message) {
		cy.get('.error-messages')
			.should('be.visible')
			.and('contain', message)
	}

	static logoutFlow(userName) {
		cy.contains(userName).click()
		cy.contains('Edit Profile Settings').click()
		cy.contains('Or click here to logout').click()
		//verify logout
		cy.contains('Sign in').should('be.visible')
	}
}
