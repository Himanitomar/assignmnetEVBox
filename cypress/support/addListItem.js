
export function createList(){

    const newItem = "Make Test plan";
    cy.get(".new-todo").type(`${newItem}{enter}`);
}