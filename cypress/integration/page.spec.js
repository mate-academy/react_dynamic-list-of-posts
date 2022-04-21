const commentBody = Math.random();

const postComment = () => {
  cy.get('[placeholder="Your name"]')
    .type('test');

  cy.get('[placeholder="Your email"]')
    .type('test@com');

  cy.get('[placeholder="Type comment here"]')
    .type(commentBody);

  cy.get('button')
    .contains('Add a comment')
    .click();
};

describe('Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('only the posts of the selected user are shown after selecting user', () => {
    cy.intercept('**/posts?userId=3', { fixture: 'post' });
    cy.intercept('**/users', { fixture: 'users' });

    cy.get('select')
      .select('Clementine Bauch');

    cy.getByDataCy('postsList')
      .find('li')
      .should('have.length', 1)
      .should('contain', 'nostrum quis quasi placeat');
  });

  it('"Open" button turns into "Close" after clicking it', () => {
    cy.get('button')
      .contains('Open')
      .click();

    cy.get('button')
      .contains('Close')
      .should('be.visible');
  });

  it('post details are closed after clicking "Close" button', () => {
    cy.get('button')
      .contains('Open')
      .click();

    cy.getByDataCy('postDetails')
      .should('be.visible');

    cy.get('button')
      .contains('Close')
      .click();

    cy.getByDataCy('postDetails')
      .should('not.exist');
  });

  it('"PostDetails" component should be visible only after selecting a "post"', () => {
    cy.getByDataCy('postDetails')
      .should('not.exist');

    cy.get('button')
      .contains('Open')
      .click();

    cy.getByDataCy('postDetails')
      .should('be.visible');
  });

  it('User can delete comment by clicking "X"', () => {
    cy.intercept('POST', '**/comments').as('postComment');
    cy.intercept('DELETE', `**/comments/*`).as('deleteComment');

    cy.get('button')
      .contains('Open')
      .click();

    postComment();

    cy.wait('@postComment')
      .its('response.statusCode')
      .should('eq', 201);

    cy.getByDataCy('postDetails')
      .should('contain', commentBody);

    cy.contains('li', commentBody)
      .find('button')
      .contains('X')
      .click();

    cy.wait('@deleteComment')
      .its('response.statusCode')
      .should('eq', 200);

    cy.getByDataCy('postDetails')
      .should('not.contain', commentBody);
  });

  it('User can add comment to post using comment adding form', () => {
    cy.intercept('**/comments').as('comment');

    cy.get('button')
      .contains('Open')
      .click();

    postComment();

    cy.getByDataCy('postDetails')
      .should('contain', commentBody);

    cy.wait('@comment')
      .its('response.statusCode')
      .should('eq', 201);
  });

  it('User can show/hide comments by clicking correspondent button', () => {
    cy.intercept('**/posts', { fixture: 'post' });
    cy.intercept('**/comments?postId=87', { fixture: 'comments' })
      .as('comment');

    cy.get('button')
      .contains('Open')
      .click();

    cy.wait('@comment');

    cy.wait(400);

    cy.get('button')
      .contains('Hide')
      .click();

    cy.getByDataCy('postDetails')
      .should('not.contain', 'Lorem ipsum dolor sit amet');

    cy.get('button')
      .contains('Show')
      .click();

    cy.getByDataCy('postDetails')
      .should('contain', 'Lorem ipsum dolor sit amet');
  });
});
