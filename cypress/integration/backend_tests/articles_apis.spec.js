/// <reference types="cypress" />

import HomePage from '../../support/Pages/Homepage'
import TestFilters from '../../support/filterTests.js'

const baseAPIUrl = Cypress.env('apiURL')

//body request for new article
const bodyRequest = {
	article: {
		tagList: [],
		title: 'request from API',
		description: 'API testing is easy',
		body: 'Angular is cool',
	},
}

TestFilters(['API'], () => {
	describe('API calls - flows (api)', () => {
		let articlesCount
		beforeEach(() => {
			HomePage.navigateToHomePage('/')
			// HomePage.navigateToLogin()
			cy.login_api(Cypress.env('username'), Cypress.env('password'), 200)
			//extract articles count
			cy.get('@token').then(token => {
			cy.request({
				url: `${baseAPIUrl}/articles?limit=10&offset=0`,
				headers: { Authorization: `Token ${token}` },
				method: 'GET',
			})
				.its('body')
				.then(body => {
					articlesCount = body.articlesCount
				})
		})
	})

		it('Create new article in a global feed & validate it created', () => {
			//request for login & create new articles
			cy.get('@token').then(token => {
				cy.request({
					url: `${baseAPIUrl}/articles`,
					failOnStatusCode: false,
					headers: { Authorization: `Token ${token}` },
					method: 'POST',
					body: bodyRequest,
				})

				//validate articles created
				cy.request({
					url: `${baseAPIUrl}/articles?limit=10&offset=0`,
					headers: { Authorization: `Token ${token}` },
					method: 'GET',
				})
					.its('body')
					.then(body => {
						// console.log(`BODY!!! ${body.articles.length}`)
						expect(body.articlesCount).to.equal(articlesCount + 1)
					})
			})
		})

		it('Delete a new articles in a global feed', () => {
			//request for login & create new articles
			cy.get('@token').then(token => {
				cy.request({
					url: `${baseAPIUrl}/articles`,
					failOnStatusCode: false,
					headers: { Authorization: `Token ${token}` },
					method: 'POST',
					body: bodyRequest,
				})

				//delete article
				cy.contains('Global Feed').click()
				cy.get('.article-preview')
					.first()
					.click()
				cy.get('.article-actions')
					.contains('Delete Article')
					.click()
				cy.wait(500)
				//validate articles deleted
				cy.request({
					url: `${baseAPIUrl}/articles?limit=10&offset=0`,
					headers: { Authorization: `Token ${token}` },
					method: 'GET',
				})
					.its('body')
					.then(body => {
						// console.log(`BODY!!! ${body.articles.length}`)
						expect(body.articlesCount).to.equal(articlesCount-1)
					})
			})
		})
	})
})
