import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'
import ArticlesPage from '../../../support/Pages/ArticlesPage'
import HomePage from '../../../support/Pages/Homepage'
const faker = require('faker')
const randomTitle = 'Title #' + faker.random.number()

Given('I can create new article', () => {
	cy.fixture('NewArticle').then(article => {
		ArticlesPage.navigateToNewArticle()
		ArticlesPage.createNewArticle(article, randomTitle)
	})
})

Given('I can delete existing article', () => {
	HomePage.navigateToHomeTab()
	HomePage.navigateToGlobalFeed()
	ArticlesPage.deleteArticleByTitle(randomTitle)
})

Then('Article created succefully', () => {
	HomePage.navigateToHomeTab()
	HomePage.navigateToGlobalFeed()
	ArticlesPage.validateArticleCreated(randomTitle)
})

Then('Article deleted succefully', () => {
	HomePage.navigateToHomeTab()
	HomePage.navigateToGlobalFeed()
	ArticlesPage.validateArticleDeleted(randomTitle)
})
