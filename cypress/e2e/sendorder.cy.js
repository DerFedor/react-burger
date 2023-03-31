import { selectors } from '../support/selectors';
require('@4tw/cypress-drag-drop')


describe('Отправка заказа', () => {
  beforeEach(() => {
    const email = 'test@test123.te';
    const password = 'Test123';
    cy.viewport(1400, 1000);
    cy.visit('/login');
    cy.get(selectors.login.emailField).type(`${email}`);
    cy.get(selectors.login.passwordField).type(`${password}{enter}`);
  });

  it('Заказ должен отправляться', () => {
    cy.get(selectors.ingredients.ingredient).eq(0).drag('[class^="burger-constructor"]');
    cy.get(selectors.ingredients.ingredient).eq(2).drag('[class^="burger-constructor"]');
    cy.get(selectors.ingredients.ingredient).eq(6).drag('[class^="burger-constructor"]');
    cy.get('button').contains('Оформить заказ').click();

    cy.get(selectors.modal.container,{ timeout: 20000 }).should('exist');
    cy.get(selectors.modal.orderNumber, { timeout: 20000 }).should('not.be.empty');
    cy.get(selectors.modal.closeButton, { timeout: 20000 }).click();

    cy.get(selectors.modal.container).should('not.exist');
    cy.get(selectors.constructor.bunTop).should('not.exist');
    cy.get(selectors.constructor.bunBottom).should('not.exist');
    cy.get(selectors.constructor.innerItems).should('not.exist');
  });
});
