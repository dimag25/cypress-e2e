import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'
import HomePage from '../../../support/Pages/Homepage'
import LoginPage from '../../../support/Pages/LoginPage'

Given('I open login page', () => {
	HomePage.navigateToHomePage('/')
	HomePage.navigateToLogin()
})

When(
	'I fill username with {string} and password with {string} and click submit',
	(username, password) => {
		LoginPage.loginFlow(username, password)
	}
)


Then('I should see homepage and User logged in', () => {
	LoginPage.verifyLoginSuccess(Cypress.env('username'))
})

Then('I should seee error message',()=>{
  LoginPage.verifyErrorMessage('email or password is invalid')
})
