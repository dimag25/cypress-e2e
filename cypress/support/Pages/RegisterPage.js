import { BasePage } from './BasePage'
const faker = require('faker')
const email = faker.internet.email()
const password = faker.internet.password()
export default class RegisterPage extends BasePage {
	static registerFlow() {
		cy.get('[placeholder="Username"]').type(email)
		cy.get('[placeholder="Email"]').type(email)
		cy.get('[placeholder="Password"]').type(password)
		cy.get('[type="submit"]').click()
	}

	/**
	 * verify register success flow.
	 */
	static verifyRegisterSuccess() {
		cy.contains(email).should('be.visible')
	}
}
