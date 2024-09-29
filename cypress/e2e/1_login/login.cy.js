describe('login app', () => {

    beforeEach(() => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    })

    it('Tc-01-correct', () => {
        cy.login('Admin', 'admin123')
        cy.url().should('include', 'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index')        
    })

    it('Tc-02-error user', () => {
        cy.login('incorrectUsername', 'admin123')
        cy.get('.oxd-alert').should('have.text', 'Invalid credentials')
    })

    it('Tc-03-error password', () => {
        cy.login('Admin', 'incorrectPassword')
        cy.get('.oxd-alert').should('have.text', 'Invalid credentials')
    })

})