describe("Learnprogress", () => {
  it("Learnprogress Student", () => {
    // cy.pause();
    cy.visit("http://localhost:8080/learnprogress");
    cy.url().should("exist").should("include", "/learnprogress");
  });

  it("Page content and structure", () => {
    cy.get("[data-cy='legend-question']")
      .contains("Bewerte deinen allgemeinen Lernfortschritt")
      .should("exist");
    cy.get("[data-cy='legend-question']")
      .contains("Wie fit und wohl fühlst du dich in HTML?")
      .should("exist");
    cy.get("[data-cy='legend-question']")
      .contains("Wie fit und wohl fühlst du dich in CSS?")
      .should("exist");
    cy.get("[data-cy='legend-question']")
      .contains("Wie fit und wohl fühlst du dich in JavaScript?")
      .should("exist");
    cy.get("[data-cy='legend-question']")
      .contains("Was lief deiner Meinung nach gut für dich?")
      .should("exist");
    cy.get("[data-cy='legend-question']")
      .contains("Was würdest du gerne besser machen?")
      .should("exist");
    cy.get("[data-cy='legend-question']")
      .contains("Was läuft gut im Kurs?")
      .should("exist");
    cy.get("[data-cy='legend-question']")
      .contains("Was würdest du gerne verbessert sehen?")
      .should("exist");

    cy.get("[data-cy='textarea-text-valuation']").should("exist", {
      multiple: true,
    });
    cy.get("[data-cy='textarea-text-valuation']").eq(0).type("Test 1");
    cy.get("[data-cy='textarea-text-valuation']").eq(1).type("Test 1");
    cy.get("[data-cy='textarea-text-valuation']").eq(2).type("Test 1");
    cy.get("[data-cy='textarea-text-valuation']").eq(3).type("Test 1");
    cy.get("[data-cy='textarea-text-valuation']").eq(4).type("Test 1");
    cy.get("[data-cy='textarea-text-valuation']").eq(5).type("Test 1");
    cy.get("[data-cy='textarea-text-valuation']").eq(6).type("Test 1");
    cy.get("[data-cy='textarea-text-valuation']").eq(7).type("Test 1");

    cy.get("[data-cy='input-range-valuation']").should("exist", {
      multiple: true,
    });
    cy.get("[data-cy='textarea-reset-btn']").should("be.visible");
    cy.contains("Abschicken").should("be.visible");
  });
});
