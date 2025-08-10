describe('App E2E Tests', () => {
  it('should load the app and display the root message', () => {
    cy.visit('http://localhost:3000');
    cy.contains('learn react').should('be.visible');
  });
});
