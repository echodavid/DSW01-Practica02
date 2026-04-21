describe('Empleados CRUD', () => {
  beforeEach(() => {
    // Login antes de cada test
    cy.visit('/')
    cy.get('input[type="email"]').type('admin@example.com')
    cy.get('input[type="password"]').type('admin123')
    cy.get('button').contains('Login').click()
    cy.url().should('include', '/empleados')
  })

  it('should display empleados list', () => {
    cy.contains('Empleados').should('exist')
    cy.get('table').should('exist')
  })

  it('should create new empleado', () => {
    cy.get('button').contains('Crear Empleado').click()
    cy.url().should('include', '/empleados/new')
    
    cy.get('input[name="clave"]').type('EMP001')
    cy.get('input[name="nombre"]').type('John Doe')
    cy.get('input[name="direccion"]').type('Calle 123')
    cy.get('input[name="telefono"]').type('555-1234')
    cy.get('button').contains('Guardar').click()
    
    cy.url().should('include', '/empleados')
    cy.contains('John Doe').should('exist')
  })

  it('should edit empleado', () => {
    cy.get('table tbody tr').first().within(() => {
      cy.get('button').contains('Editar').click()
    })
    
    cy.get('input[name="nombre"]').clear().type('Jane Doe')
    cy.get('button').contains('Guardar').click()
    
    cy.contains('Jane Doe').should('exist')
  })

  it('should delete empleado', () => {
    cy.get('table tbody tr').first().within(() => {
      cy.get('button').contains('Eliminar').click()
    })
    
    cy.contains('Confirmación').should('exist')
    cy.get('button').contains('Confirmar').click()
  })

  it('should filter empleados by name', () => {
    cy.get('input[placeholder="Buscar empleado"]').type('John')
    cy.get('table tbody tr').should('have.length.greaterThan', 0)
  })
})
