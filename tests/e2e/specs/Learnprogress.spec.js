describe("Learnprogress", () => {
  it("Learnprogress Student", () => {
    cy.visit("http://localhost:8080/learnprogress");
    cy.url().should("exist").should("include", "/learnprogress");
  });

  // Are all questions in the form
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

    // Fill Textarea
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

    // Slider Test
    // The Range Value does not jump to the value
    // Test for chanded value should be installed
    cy.get("[data-cy='input-range-valuation']")
      .eq(0)
      .invoke("val", 8)
      .trigger("change", { timeout: 10000 });
    cy.get("[data-cy='input-range-valuation']")
      .eq(1)
      .invoke("val", 8)
      .trigger("change", { timeout: 10000 });
    cy.get("[data-cy='input-range-valuation']")
      .eq(2)
      .invoke("val", 8)
      .trigger("change", { timeout: 10000 });
    cy.get("[data-cy='input-range-valuation']")
      .eq(3)
      .invoke("val", 8)
      .trigger("change", { timeout: 10000 });

    // Testing Reset Button, and if Textarea is empty, fill again
    // Slider should also be 0, test should be installed
    cy.get("[data-cy='textarea-reset-btn']").should("be.visible").click();
    cy.get("[data-cy='textarea-text-valuation']").should("not.have.value", {
      multiple: true,
    });
    cy.get("[data-cy='textarea-text-valuation']")
      .eq(0)
      .type("Test" + Math.floor(Math.random() * 1000));
    cy.get("[data-cy='textarea-text-valuation']")
      .eq(1)
      .type("Test" + Math.floor(Math.random() * 1000));
    cy.get("[data-cy='textarea-text-valuation']")
      .eq(2)
      .type("Test" + Math.floor(Math.random() * 1000));
    cy.get("[data-cy='textarea-text-valuation']")
      .eq(3)
      .type("Test" + Math.floor(Math.random() * 1000));
    cy.get("[data-cy='textarea-text-valuation']")
      .eq(4)
      .type("Test" + Math.floor(Math.random() * 1000));
    cy.get("[data-cy='textarea-text-valuation']")
      .eq(5)
      .type("Test" + Math.floor(Math.random() * 1000));
    cy.get("[data-cy='textarea-text-valuation']")
      .eq(6)
      .type("Test" + Math.floor(Math.random() * 1000));
    cy.get("[data-cy='textarea-text-valuation']")
      .eq(7)
      .type("Test" + Math.floor(Math.random() * 1000));

    // Send formular
    cy.get("[data-cy='form-send-button']")
      .contains("Abschicken")
      .should("exist")
      .click();
  });
});
