import { selectors } from '../support/selectors';
require('@4tw/cypress-drag-drop')
describe('UI тесты', () => {
    beforeEach(() => {
        const email = 'test@test123.te';
        const password = 'Test123';
        cy.viewport(1400, 1000);
        cy.visit('/login');
        cy.get(selectors.login.emailField).type(`${email}`);
        cy.get(selectors.login.passwordField).type(`${password}{enter}`);
    });

    it('Должно отображаться имя пользователя', () => {
        cy.get(selectors.header.personalText).should('have.text', 'Rrrrrr123');
    });

});