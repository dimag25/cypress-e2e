import { BasePage } from './BasePage'

export default class ArticlesPage extends BasePage {
	static navigateToNewArticle() {
		cy.contains('New Article').click()
	}
	static createNewArticle(article, title) {
		cy.get('[formcontrolname="title"]').type(title)
		cy.get('[formcontrolname="description"]').type(article.description)
		cy.get('[formcontrolname="body"]').type(article.body)
		cy.get('[type="button"]').click()
	}

	static deleteArticleByTitle(title) {
		cy.contains(title).click()
		cy.contains('Delete Article').click()
	}

	static validateArticleCreated(title) {
		cy.contains(title).should('be.visible')
	}

	static validateArticleDeleted(title) {
		cy.contains(title).should('not.be.visible')
	}
}
