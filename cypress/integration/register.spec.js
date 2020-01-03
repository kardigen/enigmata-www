'use strict';

describe('Enigmata register user', function() {
    it('successfully registers user on desktop', function() {
        cy.viewport('macbook-15');
        cy.visit('/');
        cy.get('button[id=btn-register-now-top-id]').click();

        cy.url().should('include', '/#/register');
        cy.focused().should('have.attr', 'id', 'nickText');
        cy.get('input[id=nickText]').type('User 1');
        cy.get('input[id=loginText]').type('user1@test.com');
        cy.get('input[id=passwordText]').type('Dupadupa1');
        cy.get('input[id=retypePasswordText]').type('Dupadupa1');
        cy.get('input[id=agreement]').check();
        cy.get('button[id=registerButton]').click();
        cy.url().should('include', '/#/home');
    })

    it('successfully registers user on desktop', function() {
        cy.viewport('iphone-6');
        cy.visit('/');
        cy.get('button[id=btn-m-register-now-top-id]').click();

        cy.url().should('include', '/#/register');
        cy.focused().should('have.attr', 'id', 'nickText');
        cy.get('input[id=nickText]').type('User 2');
        cy.get('input[id=loginText]').type('user2@test.com');
        cy.get('input[id=passwordText]').type('Dupadupa1');
        cy.get('input[id=retypePasswordText]').type('Dupadupa1');
        cy.get('input[id=agreement]').check();
        cy.get('button[id=registerButton]').click();
        cy.url().should('include', '/#/home');
    })
});
