export class BasePage {
	/**
	 * navigate to home page url
	 * @param url
	 */
	static navigateToHomePage(url) {
		cy.visit(url)
	}

	/**
	 * wait for milisecond time.
	 * @param ms
	 */
	static waitMiliSeconds(ms) {
		cy.wait(ms)
	}
}
