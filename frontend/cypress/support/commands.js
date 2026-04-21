// Custom commands for Cypress tests

Cypress.Commands.add('login', (email, password) => {
  cy.visit('/')
  cy.get('input[type="email"]').type(email)
  cy.get('input[type="password"]').type(password)
  cy.get('button').contains('Login').click()
  cy.url().should('include', '/empleados')
})

Cypress.Commands.add('logout', () => {
  cy.get('button').contains('Logout').click()
  cy.url().should('include', '/')
})

Cypress.Commands.add('createEmpleado', (data) => {
  cy.get('button').contains('Crear Empleado').click()
  cy.get('input[name="clave"]').type(data.clave)
  cy.get('input[name="nombre"]').type(data.nombre)
  cy.get('input[name="direccion"]').type(data.direccion)
  cy.get('input[name="telefono"]').type(data.telefono)
  cy.get('button').contains('Guardar').click()
})
