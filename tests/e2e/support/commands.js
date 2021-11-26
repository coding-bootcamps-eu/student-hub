// Learnprogress.spec.js
Cypress.Commands.add("LearnprogressStudent", () => {
  cy.visit("http://localhost:8080/learnprogress");
  cy.url().should("exist").should("include", "/learnprogress");
});

// LearnprogressTeacher.spec.js
Cypress.Commands.add("FeedbackTeacher", () => {
  // Problem --> Keine Testarea, hier direkter Aufruf der Seite mit lpKey
  cy.visit("http://localhost:8080/ypBmKQGcR2gfRtE25kTW");
  cy.url().should("exist").should("include", "/ypBmKQGcR2gfRtE25kTW");
});

// Are all questions in the form
Cypress.Commands.add("AreAllQuestionsInTheForm", () => {
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
});

// Teacher-Login hier ergänzen
