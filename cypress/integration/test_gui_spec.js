describe("My First Test", () => {
  it('clicking "type" navigates to a new url', () => {
    cy.visit("http://localhost:4200");

    cy.contains("Corona-Tracker");
    cy.contains("Fürth (Stadt)");
    cy.contains("Ungeglättete Rohdaten der letzten 50 Tage:");
  });
});
