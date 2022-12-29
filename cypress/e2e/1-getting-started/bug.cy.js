/// <reference types="cypress" />

context("Foo", () => {
  for (let i = 0; i < 20; i++) {
    it(`should work ${i}`, () => {
      cy.log().then(() => console.log(`==== test ${i} ====`, new Date().toISOString()))
      cy.clock(null, ['setTimeout']);
      cy.intercept("foobar*", { body: {} }).as("fetch");
      cy.visit("http://localhost:8080/bug");
      cy.tick(500);
      cy.wait("@fetch");
      cy.tick(500);
      cy.log().then(() => console.log('going to assert', new Date().toISOString()))
      cy.get("#foo").contains("Bar");
    });
  }

  /*
  Example failure:
    ==== test 1 ==== 2022-12-29T14:47:43.305Z
    going to assert 2022-12-29T14:47:43.400Z
    got response 2022-12-29T14:47:43.406Z

  Example success:
    ==== test 2 ==== 2022-12-29T14:47:47.514Z
    got response 2022-12-29T14:47:47.582Z
    modifying h1 2022-12-29T14:47:47.591Z
    going to assert 2022-12-29T14:47:47.596Z
  */
});
