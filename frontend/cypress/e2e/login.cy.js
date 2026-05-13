describe('Smoke Test', () => {
  it('should load the frontend and show login page', () => {
    cy.visit('/')
    cy.contains('Iniciar sesión').should('exist')
    cy.get('#loginForm').should('exist')
  })
})
