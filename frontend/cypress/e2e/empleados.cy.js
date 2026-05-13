describe('Empleados CRUD', () => {
  const mockEmpleados = [
    { clave: 'admin@example.com', nombre: 'Admin User', direccion: 'Office 1', telefono: '123456', departamento: { id: 1, nombre: 'IT' } }
  ]

  beforeEach(() => {
    // Intercept Login
    cy.intercept('POST', '**/auth/login', {
      statusCode: 200,
      body: { token: 'mock-token' }
    }).as('loginRequest')

    // Intercept List
    cy.intercept('GET', '**/empleados', {
      statusCode: 200,
      body: mockEmpleados
    }).as('getEmpleados')

    // Login antes de cada test
    cy.visit('/')
    cy.get('input[type="email"]').type('admin@example.com')
    cy.get('input[type="password"]').type('admin123')
    cy.get('button').contains('Entrar').click()
    
    cy.wait('@loginRequest')
    cy.url().should('include', '#empleados')
  })

  it('should display empleados list', () => {
    cy.wait('@getEmpleados')
    cy.contains('Empleados').should('exist')
    cy.get('table').should('exist')
    cy.contains('Admin User').should('exist')
  })

  it('should create new empleado', () => {
    cy.intercept('POST', '**/empleados', {
      statusCode: 201,
      body: { clave: 'EMP001', nombre: 'John Doe' }
    }).as('createEmpleado')

    // Actualizar el mock para la siguiente carga de la lista
    cy.intercept('GET', '**/empleados', {
      statusCode: 200,
      body: [...mockEmpleados, { clave: 'EMP001', nombre: 'John Doe', direccion: 'Calle 123', telefono: '555-1234' }]
    }).as('getEmpleadosAfterCreate')

    cy.get('a').contains('Crear empleado').click()
    cy.url().should('include', '#empleado/new')
    
    cy.get('#clave').type('EMP001')
    cy.get('#nombre').type('John Doe')
    cy.get('#direccion').type('Calle 123')
    cy.get('#telefono').type('555-1234')
    cy.get('button').contains('Guardar').click()
    
    cy.wait('@createEmpleado')
    cy.url().should('include', '#empleados')
    cy.contains('John Doe').should('exist')
  })

  it('should edit empleado', () => {
    cy.intercept('GET', '**/empleados/*', {
      statusCode: 200,
      body: mockEmpleados[0]
    }).as('getEmpleadoDetail')

    cy.intercept('PUT', '**/empleados/*', {
      statusCode: 200,
      body: { ...mockEmpleados[0], nombre: 'Jane Doe' }
    }).as('updateEmpleado')

    cy.get('table tbody tr').first().within(() => {
      cy.get('a').contains('Editar').click()
    })
    
    cy.wait('@getEmpleadoDetail')
    cy.get('#nombre').clear().type('Jane Doe')
    cy.get('button').contains('Guardar').click()
    
    cy.wait('@updateEmpleado')
    cy.contains('Jane Doe').should('exist')
  })

  it('should delete empleado', () => {
    cy.intercept('DELETE', '**/empleados/*', {
      statusCode: 204
    }).as('deleteEmpleado')

    cy.get('table tbody tr').first().within(() => {
      cy.get('button').contains('Eliminar').click()
    })
    
    // Handle window:confirm
    cy.on('window:confirm', () => true)
    cy.wait('@deleteEmpleado')
  })

  it('should filter empleados by name', () => {
    cy.get('#searchInput').type('Admin')
    cy.get('table tbody tr').should('have.length', 1)
    
    cy.get('#searchInput').clear().type('Nonexistent')
    cy.get('table tbody tr:visible').should('have.length', 0)
  })
})
