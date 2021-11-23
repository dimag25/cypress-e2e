import HomePage from '../../../support/Pages/Homepage'

beforeEach(() => {
	HomePage.navigateToHomePage('/')
	HomePage.navigateToLogin()
	cy.login_ui(Cypress.env('username'), Cypress.env('password'))
})
