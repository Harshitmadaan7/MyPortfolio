describe("Portfolio App", () => {
  it("loads home page", () => {
    cy.visit("http://localhost:5173");
    cy.contains("Welcome");
    cy.get('#root a[href="/project"]').click();
  });
});