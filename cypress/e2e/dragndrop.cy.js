import { selectors } from '../support/selectors';
require('@4tw/cypress-drag-drop')
describe("Drag'n'Drop", () => {
  beforeEach(() => {
    cy.visit('/');
    cy.viewport(1400, 1000);
  });

  describe('Перетаскивание ингредиентов в конструктор', () => {
    it('Перетаскивание ингредиентов в конструктор', function() {
      cy.get(selectors.ingredients.ingredient).eq(0).drag(selectors.constructor.burgerContainer);
      cy.get(selectors.ingredients.ingredient).eq(2).drag(selectors.constructor.burgerContainer);
      cy.get(selectors.ingredients.ingredient).eq(6).drag(selectors.constructor.burgerContainer);
      // cy.get('button').contains('Оформить заказ').click();
    });
  });
});
