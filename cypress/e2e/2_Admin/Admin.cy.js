const DataUsers = require("../../fixtures/username.json")

describe('Admin Page', () => {

    it('navigate to Admin page', () => {

        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        cy.login('Admin', 'admin123')
        cy.url().should('include', 'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index')

        // ไปที่หน้า Admin
        cy.get(':nth-child(1) > .oxd-main-menu-item').click()
        cy.url().should('include', 'admin/viewSystemUsers')
        cy.contains('System Users').should('be.visible')
    })

    it('navigate to Admin page + search employee', () => {

        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        cy.login('Admin', 'admin123')
        cy.url().should('include', 'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index')

        // ไปที่หน้า Admin
        cy.get(':nth-child(1) > .oxd-main-menu-item').click()
        cy.url().should('include', 'admin/viewSystemUsers')
        cy.contains('System Users').should('be.visible')

        // ค้นหา Username
        cy.get(':nth-child(2) > .oxd-input').type(DataUsers.username.id2)
        //cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text').select('ESS') // 'ESS' คือค่าที่ต้องการเลือกใน Dropdown **(ไม่สามารถใช้ .select ได้เพราะเหมือนหาตัวเลือกใน dropdown ไม่ได้)
        //cy.get(':nth-child(4) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text').select('Enabled')

        cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text').click()
        cy.contains('ESS').click(); // ใช้ contains แทนเพื่อหาค่า ESS แทน .select
        cy.get(':nth-child(4) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text').click()
        cy.contains('Enabled').click();
        cy.get('.oxd-form-actions > .oxd-button--secondary').click()

    })

    it('navigate to Admin page + Add user', () => {

        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        cy.login('Admin', 'admin123')
        cy.url().should('include', 'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index')

        // ไปที่หน้า Admin
        cy.get(':nth-child(1) > .oxd-main-menu-item').click()
        cy.url().should('include', 'admin/viewSystemUsers')
        cy.contains('System Users').should('be.visible')
        cy.get('.orangehrm-header-container > .oxd-button')

        //Add User
        cy.get('.orangehrm-header-container > .oxd-button').click()
        cy.get(':nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text').click()
        cy.get('.oxd-select-dropdown').within(() => {
            cy.contains('Admin').click();
        });
        // cy.contains('Admin').click();
        cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text').click()
        cy.contains('Enabled').click();
        cy.get('.oxd-autocomplete-text-input > input').type('piyawat', { timeout: 1000 })
        cy.contains('piyawat').click()
        cy.get(':nth-child(4) > .oxd-input-group > :nth-child(2) > .oxd-input').type('Piyawat')
        cy.get('.user-password-cell > .oxd-input-group > :nth-child(2) > .oxd-input').type('User123')
        cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type('User123')
        cy.contains('button', 'Save').click();
        cy.contains('Successfully Saved').should('be.visible')
    })

    it('navigate to Admin page + Delete Username', () => {

        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        cy.login('Admin', 'admin123')
        cy.url().should('include', 'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index')

        // ไปที่หน้า Admin
        cy.get(':nth-child(1) > .oxd-main-menu-item').click()
        cy.url().should('include', 'admin/viewSystemUsers')
        cy.contains('System Users').should('be.visible')

        // ค้นหา Username
        cy.get(':nth-child(2) > .oxd-input').type('Piyawat')
        cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text').click()
        cy.get('.oxd-select-dropdown').within(() => {
            cy.contains('Admin').click();
        });
        cy.get(':nth-child(4) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text').click()
        cy.contains('Enabled').click();
        cy.get('.oxd-form-actions > .oxd-button--secondary').click()

        //Delete
        cy.get('.oxd-table-cell-actions > :nth-child(1)').click()
        cy.get('.oxd-button--label-danger').click()
        cy.contains('Successfully Deleted').should('be.visible')
    })

})
