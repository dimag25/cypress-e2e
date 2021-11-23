// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('login_ui', (username, password) => {
	cy.get('[placeholder="Email"]').type(username)
	cy.get('[placeholder="Password"]').type(password)
	// cy.get('#user_remember_me').click()
	cy.get('[type="submit"]').click()
})

Cypress.Commands.add('login_api', (email, password, expectedStatus) => {
	cy.request({
		method: 'POST',
		url: 'https://conduit.productionready.io/api/users/login',
		failOnStatusCode: false,
		headers: {
			// 'X-CSRF-Token': Cypress.$("meta[name=csrf-token]").attr("content")
		},
		body: { user: { email: email, password: password } },
	}).as('signInRequest')
	// console.log('X-CSRF-Token	!!!!' + Cypress.$("meta[name=csrf-token]").attr("content"))
	cy.get('@signInRequest')
		.its('status')
		.should('equal', expectedStatus)

		cy.get('@signInRequest').its('body').then(body=>{
			if(body.user !== undefined){
				const token = body.user.token
				cy.wrap(token).as('token')
				cy.visit('/',{
					onBeforeLoad(win){
						win.localStorage.setItem('jwtToken',token)
					}
				})
			}
		
		})
})
