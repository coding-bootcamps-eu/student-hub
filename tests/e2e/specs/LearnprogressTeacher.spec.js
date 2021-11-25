describe("LearnprogressTeacher", () => {
  it("FeedbackTeacher", () => {
    // cy.visit("http://localhost:8080/testArea");
    // cy.url().should("exist").should("include", "/testArea");

    // Problem --> Keine Testarea, hier direkter Aufruf der Seite mit lpKey
    cy.visit("http://localhost:8080/ypBmKQGcR2gfRtE25kTW");
    cy.url().should("exist").should("include", "/ypBmKQGcR2gfRtE25kTW");
  });

  // it("Open true form to answer", () => {
  //   cy.get("li").should("exist");
  // });

  // Aus Learnprogress importieren und in TeacherFeedback einbinden, wenn das Problem mit dem Range gesolved ist.
});
