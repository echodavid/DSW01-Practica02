describe('Empleados CRUD', () => {
  beforeEach(() => {
    // Login antes de cada test
    cy.visit('/')
    cy.get('input[type="email"]').type('admin@example.com')
    cy.get('input[type="password"]').type('admin123')
    cy.get('button').contains('Entrar').click()
    cy.url().should('include', '/empleados')
  })

  it('should display empleados list', () => {
    cy.contains('Empleados').should('exist')
    cy.get('table').should('exist')
  })

  it('should create new empleado', () => {
    cy.get('a').contains('Crear empleado').click()
    cy.url().should('include', '#empleado/new')
    
    cy.get('#clave').type('EMP001')
    cy.get('#nombre').type('John Doe')
    cy.get('#direccion').type('Calle 123')
    cy.get('#telefono').type('555-1234')
    cy.get('button').contains('Guardar').click()
    
    cy.url().should('include', '/empleados')
    cy.contains('John Doe').should('exist')
  })

  it('should edit empleado', () => {
    cy.get('table tbody tr').first().within(() => {
      cy.get('a').contains('Editar').click()
    })
    
    cy.get('#nombre').clear().type('Jane Doe')
    cy.get('button').contains('Guardar').click()
    
    cy.contains('Jane Doe').should('exist')
  })

  it('should delete empleado', () => {
    cy.get('table tbody tr').first().within(() => {
      cy.get('button').contains('Eliminar').click()
    })
    
    // Handle window:confirm
    cy.on('window:confirm', () => true)
  })

  it('should filter empleados by name', () => {
    cy.get('input[placeholder="Buscar empleado"]').type('John')
    cy.get('table tbody tr').should('have.length.greaterThan', 0)
  })
})
