// https://docs.cypress.io/api/introduction/api.html

describe("My First Test", () => {
  it("Visits the app root url", () => {
    cy.visit("/");
    // cy.visit("http://localhost:8080");
    cy.contains("h2", "Willkommen bei Coding-Bootcamps-EU!");
    // cy.get(".btn-git-logout").click();
  });
});
