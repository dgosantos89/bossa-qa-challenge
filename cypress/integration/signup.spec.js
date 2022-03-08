const faker = require('faker-br')

describe('User signup', () => {

  beforeEach(() => {
    cy.visit('https://dev.app.bossabox.com')
    cy.get('.align-items-center > .bbox-button').click()
  })

  it('with valid values succeeds', () => {
    cy.get('#input-fullName').type('Teste da Silva')
    cy.get('#input-email').type(faker.internet.email())
    cy.get('#input-password').type('87654321')
    cy.get('#input-confirmPassword').type('87654321')
    cy.get('.bbox-button.margin-top-big').click()
    cy.get('.font-size-huge').should('have.text', '\n\t\t\t\tOlá, Teste\n\t\t\t')
  })

  it('with empty name field gets error', () => {
    cy.get('#input-password').type('87654321')
    cy.get('#input-confirmPassword').type('87654321')
    cy.get('#input-email').type(faker.internet.email())
    cy.get('.bbox-button.margin-top-big').click()
    cy.get('.bbox-context-banner > .card').should('have.text','Lembre-se de preencher os campos')
  })

  it('with invalid email gets error', () => {
    cy.get('#input-fullName').type('Teste da Silva')
    cy.get('#input-email').type('invalid@mail')
    cy.get('#input-password').type('87654321')
    cy.get('#input-confirmPassword').type('87654321')
    cy.get('.bbox-button.margin-top-big').click()
    cy.get('.bbox-context-banner > .card').should('have.text','E-mail e/ou senha inválidos')
  })

  it('with 7 characters gets error', () => {
    cy.get('#input-fullName').type('Teste da Silva')
    cy.get('#input-email').type(faker.internet.email())
    cy.get('#input-password').type('7654321')
    cy.get('#input-confirmPassword').type('7654321')
    cy.get('.bbox-button.margin-top-big').click()
    cy.get('.bbox-context-banner > .card').should('have.text','A senha deve ter pelo menos 8 caracteres')
  })

  it('with divergent password gets error', () => {
    cy.get('#input-fullName').type('Teste da Silva')
    cy.get('#input-email').type(faker.internet.email())
    cy.get('#input-password').type('87654321')
    cy.get('#input-confirmPassword').type('differentpass')
    cy.get('.bbox-button.margin-top-big').click()
    cy.get('.bbox-context-banner > .card').should('have.text','As senhas não correspondem')
  })
})
