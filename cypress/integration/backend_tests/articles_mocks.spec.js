/// <reference types="cypress" />

import HomePage from '../../support/Pages/Homepage'
import ArticlesPage from '../../support/Pages/ArticlesPage'
import TestFilters from '../../support/filterTests.js'
const faker = require('faker')

TestFilters(['Smoke'], () => {
	describe('Mocking  Articles Api data (Smoke)', () => {
		beforeEach(function() {
			HomePage.navigateToHomePage('/')
			HomePage.navigateToLogin()
			cy.login_ui(Cypress.env('username'), Cypress.env('password'))
			cy.contains('New Article').click()
		})
		it('Verify New Articles request and response', () => {
			cy.intercept('POST', '**/articles', {
				fixture: 'NewArticle.json',
			}).as('postArticles')

			cy.fixture('NewArticle').then(article => {
				const randomTitle = 'Title #' + faker.random.number()
				ArticlesPage.createNewArticle(article, randomTitle)

				//backend response check
				cy.wait('@postArticles')
				cy.get('@postArticles').then(xhr => {
					console.log(xhr)
					expect(xhr.request.body.article.title).to.equal(randomTitle)
					expect(xhr.request.body.article.body).to.equal(article.body)
					expect(xhr.request.body.article.description).to.equal(
						article.description
					)
				})
			})
		})

		it('interception and modifying the request and response', () => {
			const newDescription = 'This is a description_2'
			cy.fixture('NewArticle').then(article => {
				cy.intercept('POST', '**/articles', req => {
					req.body.article.description = newDescription
				}).as('postArticles')
				const randomTitle = 'Title #' + faker.random.number()
				ArticlesPage.createNewArticle(article, randomTitle)

				cy.wait('@postArticles')
				cy.get('@postArticles').then(xhr => {
					expect(xhr.request.body.article.description).to.equal(
						newDescription
					)
				})
			})
		})
	})
})
