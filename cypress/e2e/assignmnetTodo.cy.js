/// <reference types="cypress" />

import { createList } from "../support/addListItem";

describe("example to-do app", () => {
  Cypress.on("uncaught:exception", () => false);

  before(() => {
    cy.clearCookies();
    window.sessionStorage.clear();
  });

  beforeEach(() => {
    cy.visit("https://todomvc.com/examples/angular2/");
  });

  after(() => {
    window.sessionStorage.clear();
  });

  it("Verify user is able to  add new todo items", () => {
    createList();

    cy.get(".todo-list li label")
      .should("have.length", 1)
      .first()
      .should("have.text", "Make Test plan");
  });

  it("Should not be able to create empty todo item", () => {
    createList();
    cy.get(".new-todo").type("{enter}");
    cy.get(".todo-list li").should("have.length", 1);
  });

  it("should edit task on todo list", () => {
    createList();

    cy.contains("Make Test plan").dblclick();
    cy.get(".edit").type(" (edited){enter}");
    cy.get("label").should("have.text", "Make Test plan (edited)");
  });

  it("Trying to perform edit on empty list", () => {
    cy.get(".todo-list li").should("not.exist");
  });

  it("Can check if an item is checked off", () => {
    createList();
    cy.contains("Make Test plan").parent().find("input[type=checkbox]").check();
    cy.contains("Make Test plan")
      .parents("li")
      .should("have.class", "completed");
  });

  it("Can check if an item is Not checked off", () => {
    createList();

    cy.contains("Make Test plan")
      .parents("li")
      .should("not.have.class", "completed");
  });

  it("can delete item from list", () => {
    createList();

    cy.get(".todo-list li .destroy").click({ force: true });
    cy.get(".todo-list li").should("not.exist");
  });

  it("Trying to perform delete on empty list", () => {
    cy.get(".todo-list li").should("not.exist");
  });
});
