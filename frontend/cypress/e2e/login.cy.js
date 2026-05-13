describe('Login Flow', () => {
  beforeEach(() => {
    cy.intercept('POST', '**/auth/login', {
      statusCode: 200,
      body: { token: 'mock-token' }
    }).as('loginRequest')
    cy.visit('/')
  })

  it('should display login page', () => {
    cy.contains('Iniciar sesión').should('exist')
    cy.get('input[type="email"]').should('exist')
    cy.get('input[type="password"]').should('exist')
  })

  it('should login with valid credentials', () => {
    cy.get('input[type="email"]').type('admin@example.com')
    cy.get('input[type="password"]').type('admin123')
    cy.get('button').contains('Entrar').click()
    
    cy.wait('@loginRequest')
    cy.url().should('include', '#empleados')
    cy.contains('Empleados').should('exist')
  })

  it('should display error with invalid credentials', () => {
    cy.intercept('POST', '**/auth/login', {
      statusCode: 401,
      body: { message: 'Invalid credentials' }
    }).as('loginError')
    
    cy.get('input[type="email"]').type('invalid@example.com')
    cy.get('input[type="password"]').type('wrongpass')
    cy.get('button').contains('Entrar').click()
    
    cy.wait('@loginError')
    cy.contains('Credenciales inválidas').should('exist')
  })

  it('should store auth token in localStorage', () => {
    cy.get('input[type="email"]').type('admin@example.com')
    cy.get('input[type="password"]').type('admin123')
    cy.get('button').contains('Entrar').click()
    
    cy.wait('@loginRequest')
    cy.window().then((win) => {
      expect(win.localStorage.getItem('empleados_token')).to.exist
    })
  })
})
