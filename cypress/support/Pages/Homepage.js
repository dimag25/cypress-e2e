import { BasePage } from './BasePage'

export default class HomePage extends BasePage {
	static navigateToLogin() {
		cy.contains('Sign in').click()
	}

	/**
	 * navigate to home page tab
	 */
	static navigateToHomeTab() {
		cy.contains('Home').click()
	}

	static navigateToGlobalFeed(){
		cy.contains('Global Feed').click()
	}

	static navigateToRegister() {
		cy.contains('Sign up').click()
	}
}
