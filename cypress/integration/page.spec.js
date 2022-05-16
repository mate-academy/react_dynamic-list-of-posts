const commentBody = Math.random();

const page = {
  clickButton(value) {
    cy.get('button')
      .contains(value)
      .click();
  },

  postComment() {
    cy.get('[placeholder="Your name"]')
      .type('test');

    cy.get('[placeholder="Your email"]')
      .type('test@test.com');

    cy.get('[placeholder="Type comment here"]')
      .type(commentBody);

    cy.get('button')
      .contains('Add a comment')
      .click();
  },
}

describe('Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should show only the posts of the selected user', () => {
    cy.intercept('**/posts', { fixture: 'post' });
    cy.intercept('**/posts?userId=3', { fixture: 'post' });
    cy.intercept('**/users', { fixture: 'users' });

    cy.visit('/');

    cy.get('select')
      .select('Clementine Bauch');

    cy.getByDataCy('postsList')
      .find('li')
      .should('have.length', 1)
      .should('contain', 'nostrum quis quasi placeat');
  });

  it('should turn "Open" button into "Close" after clicking it', () => {
    page.clickButton('Open');

    cy.get('button')
      .contains('Close')
      .should('be.visible');
  });

  it('should close post details after clicking "Close" button', () => {
    page.clickButton('Open');

    cy.getByDataCy('postDetails')
      .should('be.visible');

    page.clickButton('Close');

    cy.getByDataCy('postDetails')
      .should('not.exist');
  });

  it('should show "PostDetails" component only after selecting a "post"', () => {
    cy.getByDataCy('postDetails')
      .should('not.exist');

    page.clickButton('Open');

    cy.getByDataCy('postDetails')
      .should('be.visible');
  });

  it('should have an option to delete comment by clicking "X"', () => {
    cy.intercept('POST', '**/comments').as('postComment');
    cy.intercept('DELETE', `**/comments/*`).as('deleteComment');

    cy.visit('/');

    page.clickButton('Open');

    page.postComment();

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

  it('should have option to add comment to post using comment adding form', () => {
    cy.intercept('**/comments').as('comment');

    cy.visit('/');

    page.clickButton('Open');

    page.postComment();

    cy.getByDataCy('postDetails')
      .should('contain', commentBody);

    cy.wait('@comment')
      .its('response.statusCode')
      .should('eq', 201);
  });

  it.only('should have option to show/hide comments by clicking correspondent button', () => {
    cy.intercept('**/posts', { fixture: 'post' });
    cy.intercept('**/posts/87', { fixture: 'post' });
    cy.intercept('**/comments?postId=87', { fixture: 'comments' })
      .as('comment');

    cy.visit('/');

    page.clickButton('Open');

    cy.wait('@comment');

    cy.wait(400);

    page.clickButton('Hide');

    cy.getByDataCy('postDetails')
      .should('not.contain', 'Lorem ipsum dolor sit amet');

    page.clickButton('Show');

    cy.getByDataCy('postDetails')
      .should('contain', 'Lorem ipsum dolor sit amet');
  });
});
