/// <reference types="cypress" />
/// <reference types="../support" />

const page = {
  mockUsers: () => cy.intercept('**/users', { fixture: 'users' }).as('usersRequest'),
  mockUser1Posts: () => cy.intercept('**/posts?userId=1', { fixture: 'user1Posts' }).as('user1PostsRequest'),
  mockUser2Posts: () => cy.intercept('**/posts?userId=2', { fixture: 'user2Posts' }).as('user2PostsRequest'),
  mockPost1Comments: () => cy.intercept('**/comments?postId=1', { fixture: 'post1Comments' }).as('post1CommentsRequest'),
  mockPost2Comments: () => cy.intercept('**/comments?postId=2', { fixture: 'post2Comments' }).as('post2CommentsRequest'),

  mockError: (url, requestAlias = '') => {
    const errorResponse = {
      statusCode: 404,
      body: '404 Not Found!',
    };

    return cy.intercept(url, errorResponse).as(requestAlias);
  },

  spyOn: (url, spyAlias, response = { body: [] }) => {
    const spy = cy.stub()
      .callsFake(req => req.reply(response))
      .as(spyAlias);

    cy.intercept(url, spy).as(`${spyAlias}Request`);
  },

  spyOnCommentsDelete: (id) => {
    const options = { method: 'DELETE', url: `**/comments/${id}` };
    const spy = cy.stub()
      .callsFake(req => req.reply({ statusCode: 200, body: '1' }))
      .as(`comments${id}Delete`);

    cy.intercept(options, spy).as(`comments${id}DeleteRequest`);
  },

  spyOnCommentsPost: () => {
    const options = { method: 'POST', url: '**/comments' };
    const spy = cy.stub()
      .callsFake(req => req.reply({
        statusCode: 201,
        body: Object.assign(req.body, { id: Math.random() }),
      }))
      .as('commentsPost');

    cy.intercept(options, spy).as('commentsPostRequest');
  },

  mockCommentPostError: () => {
    const options = { method: 'POST', url: '**/comments' };
    const errorResponse = {
      statusCode: 404,
      body: '404 Not Found!',
    };

    cy.intercept(options, errorResponse).as('commentsPostRequest');
  },

  waitForRequest: requestAlias => {
    cy.wait(requestAlias);

    // To guarantee that React handled the response
    cy.wait(50);
  },

  mainContent: () => cy.byDataCy('MainContent'),
  sidebar: () => cy.byDataCy('Sidebar'),
  noSelectedUserMessage: () => cy.byDataCy('NoSelectedUser'),
  postsLoader: () => page.mainContent().byDataCy('Loader'),
  noPostsYetMessage: () => cy.byDataCy('NoPostsYet'),
  postsLoadingError: () => cy.byDataCy('PostsLoadingError'),
  postsList: () => cy.byDataCy('PostsList'),
  posts: () => cy.byDataCy('Post'),

  postButton: index => page.posts().eq(index).byDataCy('PostButton'),

  assertPostSelected: index => {
    page.postButton(index)
      .should('have.text', 'Close')
      .and('not.have.class', 'is-light');
  },

  assertSelectedPostsCount: count => {
    cy.get('[data-cy="PostButton"]:not(.is-light)').should('have.length', count);
  },
};

const userSelector = {
  el: () => cy.byDataCy('UserSelector'),
  button: () => userSelector.el().find('button'),
  users: () => userSelector.el().find('a.dropdown-item'),
  selectedUser: () => userSelector.el().find('a.dropdown-item.is-active'),

  select: index => {
    userSelector.button().click();
    userSelector.users().eq(index).click();
  },
};

const postDetails = {
  el: () => cy.byDataCy('PostDetails'),
  postTitle: () => postDetails.el().byDataCy('PostTitle'),
  postBody: () => postDetails.el().byDataCy('PostBody'),
  commentsError: () => postDetails.el().byDataCy('CommentsError'),
  noCommentsMessage: () => postDetails.el().byDataCy('NoCommentsMessage'),
  commentsLoader: () => postDetails.el().byDataCy('Loader'),
  comments: () => postDetails.el().byDataCy('Comment'),
  deleteCommentButton: index => postDetails.comments().eq(index).find('button.delete'),
  commentBody: index => postDetails.comments().eq(index).byDataCy('CommentBody'),
  writeCommentButton: () => postDetails.el().byDataCy('WriteCommentButton'),
}

const newCommentForm = {
  el: () => cy.byDataCy('NewCommentForm'),

  nameInput: () => newCommentForm.el().byDataCy('NameField').find('input'),
  nameErrorMessage: () => newCommentForm.el().byDataCy('NameField').byDataCy('ErrorMessage'),
  nameErrorIcon: () => newCommentForm.el().byDataCy('NameField').byDataCy('ErrorIcon'),

  emailInput: () => newCommentForm.el().byDataCy('EmailField').find('input'),
  emailErrorMessage: () => newCommentForm.el().byDataCy('EmailField').byDataCy('ErrorMessage'),
  emailErrorIcon: () => newCommentForm.el().byDataCy('EmailField').byDataCy('ErrorIcon'),

  bodyArea: () => newCommentForm.el().byDataCy('BodyField').find('textarea'),
  bodyErrorMessage: () => newCommentForm.el().byDataCy('BodyField').byDataCy('ErrorMessage'),

  submitButton: () => newCommentForm.el().find('button[type=submit]'),
  resetButton: () => newCommentForm.el().find('button[type=reset]'),

  assertNameError: (hasError) => {
    if (hasError) {
      newCommentForm.nameErrorIcon().should('exist');
      newCommentForm.nameErrorMessage().should('exist');
      newCommentForm.nameInput().should('have.class', 'is-danger');
    } else {
      newCommentForm.nameErrorIcon().should('not.exist');
      newCommentForm.nameErrorMessage().should('not.exist');
      newCommentForm.nameInput().should('not.have.class', 'is-danger');
    }
  },

  assertEmailError: (hasError) => {
    if (hasError) {
      newCommentForm.emailErrorIcon().should('exist');
      newCommentForm.emailErrorMessage().should('exist');
      newCommentForm.emailInput().should('have.class', 'is-danger');
    } else {
      newCommentForm.emailErrorIcon().should('not.exist');
      newCommentForm.emailErrorMessage().should('not.exist');
      newCommentForm.emailInput().should('not.have.class', 'is-danger');
    }
  },

  assertBodyError: (hasError) => {
    if (hasError) {
      newCommentForm.bodyErrorMessage().should('exist');
      newCommentForm.bodyArea().should('have.class', 'is-danger');
    } else {
      newCommentForm.bodyErrorMessage().should('not.exist');
      newCommentForm.bodyArea().should('not.have.class', 'is-danger');
    }
  },
};

let failed = false;

Cypress.on('fail', (e) => {
  failed = true;
  throw e;
});

describe('', () => {
  beforeEach(() => {
    if (failed) Cypress.runner.stop();
  });

  describe('Page by default', () => {
    describe('', () => {
      beforeEach(() => {
        page.mockUsers();
        cy.visit('/');
      });

      it('should have a UserSelector', () => {
        userSelector.el().should('exist');
      });

      it('should show NoSelectedUser message', () => {
        page.noSelectedUserMessage().should('exist');
      });

      it('should not show posts', () => {
        page.postsList().should('not.exist');
        page.posts().should('not.exist');
      });

      it('should not show posts error message', () => {
        page.postsLoadingError().should('not.exist');
      });

      it('should not show no posts yet message', () => {
        page.noPostsYetMessage().should('not.exist');
      });

      it('should not show posts loader', () => {
        page.postsLoader().should('not.exist');
      });
    });

    describe('', () => {
      it('should request users from API', () => {
        page.spyOn('**/users', 'users');

        cy.visit('/');

        cy.get('@users').should('have.been.called');
      });

      it('should request users only once', () => {
        page.spyOn('**/users', 'users');

        cy.visit('/');
        cy.wait(1000);

        cy.get('@users').should('have.callCount', 1);
      });

      it('should not request posts from API', () => {
        page.mockUsers();
        page.spyOn('**/posts**', 'posts');

        cy.visit('/');
        cy.waitFor('@usersRequest');
        cy.wait(500);

        cy.get('@posts').should('not.be.called');
      });

      it('should not request comments from API', () => {
        page.mockUsers();
        page.mockUser1Posts();
        page.spyOn('**/comments**', 'comments');

        cy.visit('/');
        cy.waitFor('@usersRequest');
        cy.wait(500);

        cy.get('@comments').should('not.be.called');
      });
    });
  })

  describe('UserSelector', () => {
    const { el, button, users, selectedUser } = userSelector;

    describe('', () => {
      it('should have all the loaded users', () => {
        page.mockUsers();
        cy.visit('/');

        users().should('have.length', 10);
      });

      it('should not have users hardcoded', () => {
        cy.intercept('**/users', { fixture: 'someUsers' })
        cy.visit('/');

        users().should('have.length', 3);
      });

      it('should not have users before they are loaded', () => {
        cy.clock();
        page.mockUsers();
        cy.visit('/');
        users().should('have.length', 0);

        cy.tick(1000);
        page.waitForRequest('@usersRequest');
        users().should('have.length', 10);
      });
    });

    describe('after users are loaded', () => {
      beforeEach(() => {
        page.mockUsers();
        cy.visit('/');
        page.waitForRequest('@usersRequest');
      });

      it('should should empty text by default', () => {
        button().should('have.text', 'Choose a user');
      });

      it('should not show users list by default', () => {
        el().should('not.have.class', 'is-active');
        el().find('.dropdown-menu').should('not.be.visible');
      });

      it('should not have a hightlighted user by default', () => {
        selectedUser().should('not.exist');
      });

      it('should show users on button click', () => {
        button().click();

        el().should('have.class', 'is-active');
        el().find('.dropdown-menu').should('be.visible');
        users().eq(0).should('be.visible');
      });

      it('should have names in the list', () => {
        users().eq(0).should('have.text', 'Leanne Graham')
        users().eq(3).should('have.text', 'Patricia Lebsack')
        users().eq(9).should('have.text', 'Clementina DuBuque')
      });

      it('should close dropdown after selecting a user', () => {
        button().click();
        users().eq(3).click();

        el().should('not.have.class', 'is-active');
        el().find('.dropdown-menu').should('not.be.visible');
      });

      it('should select a user on click', () => {
        button().click();
        users().eq(3).click();

        button().should('have.text', 'Patricia Lebsack');
      });

      it('should highlight a selected user', () => {
        button().click();
        users().eq(3).click();

        users().eq(3).should('have.class', 'is-active');
        selectedUser().should('have.length', 1);
      });

      it('should highlight only one user', () => {
        button().click();
        users().eq(3).click();

        button().click();
        users().eq(0).click();

        users().eq(0).should('have.class', 'is-active');
        selectedUser().should('have.length', 1);
      });

      it('should close dropdown on selected user click', () => {
        button().click();
        users().eq(3).click();

        button().click();
        users().eq(3).click();

        el().should('not.have.class', 'is-active');
        el().find('.dropdown-menu').should('not.be.visible');
      });

      it('should close dropdown on outside click', () => {
        button().click();
        cy.get('body').click();

        el().should('not.have.class', 'is-active');
        el().find('.dropdown-menu').should('not.be.visible');
      });
    });
  });

  describe('Page after selecting a user', () => {
    describe('', () => {
      beforeEach(() => {
        page.mockUsers();
      });

      it('should load user posts', () => {
        page.spyOn('**/posts?userId=1', 'user1Posts');

        cy.visit('/');
        userSelector.select(0);
        cy.wait(500);

        cy.get('@user1Posts').should('be.calledOnce');
      });

      it('should not load all posts', () => {
        page.spyOn('**/posts', 'allPosts');

        cy.visit('/');
        userSelector.select(0);
        cy.wait(500);

        cy.get('@allPosts').should('not.be.called');
      });

      it('should show posts loader while waiting for API response', () => {
        page.mockUser1Posts()
        cy.visit('/');
        cy.wait(500);
        cy.clock();

        userSelector.select(0);

        page.postsLoader().should('exist');
      });

      it('should show not hardcoded user posts', () => {
        page.mockUser2Posts();
        cy.visit('/');
        userSelector.select(1);

        page.postsList().should('exist');
        page.posts().should('have.length', 3);
        page.posts().eq(0).byDataCy('PostId').should('have.text', '11');
        page.posts().eq(2).byDataCy('PostId').should('have.text', '13');
      });
    });

    describe('if posts are loaded successfully', () => {
      beforeEach(() => {
        page.mockUsers();
        page.mockUser1Posts()
        cy.visit('/');

        userSelector.select(0);
        page.waitForRequest('@user1PostsRequest');
      });

      it('should show user posts loaded from API', () => {
        page.postsList().should('exist');
        page.posts().should('have.length', 10)
        page.posts().eq(0).byDataCy('PostId').should('have.text', '1');
        page.posts().eq(9).byDataCy('PostId').should('have.text', '10');
      });

      it('should hide posts loader', () => {
        page.postsLoader().should('not.exist');
      });

      it('should not show NoPostsYet message', () => {
        page.noPostsYetMessage().should('not.exist');
      });

      it('should not show PostsLoadingError', () => {
        page.postsLoadingError().should('not.exist');
      });

      it('should have a UserSelector', () => {
        userSelector.el().should('exist');
      });
    });

    describe('on posts loading error', () => {
      beforeEach(() => {
        page.mockUsers();
        page.mockError('**/posts?userId=1', 'user1PostsRequest')
        cy.visit('/');

        userSelector.select(0);
        page.waitForRequest('@user1PostsRequest');
      });

      it('should hide posts loader', () => {
        page.postsLoader().should('not.exist');
      });

      it('should not show NoPostsYet message', () => {
        page.noPostsYetMessage().should('not.exist');
      });

      it('should show PostsLoadingError', () => {
        page.postsLoadingError().should('exist');
      });

      it('should have a UserSelector', () => {
        userSelector.el().should('exist');
      });
    });

    describe('if API send no posts', () => {
      beforeEach(() => {
        page.mockUsers();
        cy.intercept('**/posts?userId=1', { body: [] }).as('user1PostsRequest');
        cy.visit('/');

        userSelector.select(0);
        page.waitForRequest('@user1PostsRequest');
      });

      it('should hide posts loader', () => {
        page.postsLoader().should('not.exist');
      });

      it('should show NoPostsYet message', () => {
        page.noPostsYetMessage().should('exist');
      });

      it('should not show PostsLoadingError', () => {
        page.postsLoadingError().should('not.exist');
      });

      it('should have a UserSelector', () => {
        userSelector.el().should('exist');
      });
    });

    describe('if the other user is selected', () => {
      beforeEach(() => {
        page.mockUsers();
        page.mockUser1Posts()
        cy.visit('/');

        userSelector.select(0);
        page.waitForRequest('@user1PostsRequest');

        page.mockUser2Posts().as('user2Posts');
      });

      it('should show posts loader again', () => {
        cy.clock();

        userSelector.select(1);

        page.postsLoader().should('exist');
      });

      it('should hide posts', () => {
        cy.clock();

        userSelector.select(1);

        page.postsList().should('not.exist');
      });

      it('should hide posts loader', () => {
        userSelector.select(1);
        page.waitForRequest('@user2PostsRequest');

        page.postsLoader().should('not.exist');
      });

      it('should show user posts loaded from API', () => {
        userSelector.select(1);
        page.waitForRequest('@user2PostsRequest');

        page.postsList().should('exist');
        page.posts().should('have.length', 3);
        page.posts().eq(0).byDataCy('PostId').should('have.text', '11');
        page.posts().eq(2).byDataCy('PostId').should('have.text', '13');
      });
    });
  });

  describe('Posts List', () => {
    beforeEach(() => {
      page.mockUsers();
      page.mockUser1Posts()
      cy.visit('/');

      userSelector.select(0);
      page.waitForRequest('@user1PostsRequest');
    });

    it('should not have posts with Close buttons', () => {
      cy.contains('[data-cy="PageButton"]', 'Close').should('not.exist')
    });

    it('should not have post buttons without `is-light` class', () => {
      cy.get('[data-cy="PageButton"]:not(.is-light)').should('not.exist')
    });

    describe('after selecting one', () => {
      beforeEach(() => {
        page.mockPost1Comments();
        page.postButton(0).click();
      })

      it('should remove `is-light` class from the selected post button', () => {
        page.postButton(0).should('not.have.class', 'is-light');
      });

      it('should change selected button text to Close', () => {
        page.posts().eq(0).byDataCy('PostButton').should('have.text', 'Close');
      });

      it('should keep all posts visible', () => {
        page.posts().should('have.length', 10);
        page.posts().eq(0).byDataCy('PostId').should('have.text', '1');
        page.posts().eq(9).byDataCy('PostId').should('have.text', '10');
      });

      it('should have only one selected post', () => {
        page.assertSelectedPostsCount(1);
      });

      it('should have not selected posts after clicking Close', () => {
        page.postButton(0).click();

        page.assertSelectedPostsCount(0);
      });

      it('should have only the last post selected after selecting another one', () => {
        page.mockPost2Comments();
        page.postButton(1).click();

        page.assertPostSelected(1);
        page.assertSelectedPostsCount(1);
      });

      it('should not have selected posts after user change', () => {
        page.mockUser2Posts();
        userSelector.select(1);

        page.assertSelectedPostsCount(0);
      });
    });
  });

  describe('Sidebar', () => {
    beforeEach(() => {
      page.mockUsers();
      page.mockUser1Posts();
      page.mockPost1Comments();
      cy.visit('/');
    });

    describe('', () => {
      it('should not be open by default', () => {
        page.sidebar().should('not.have.class', 'Sidebar--open');
      });

      it('should not be open after user is selected', () => {
        userSelector.select(0);
        page.waitForRequest('@user1PostsRequest');

        page.sidebar().should('not.have.class', 'Sidebar--open');
      });
    });

    describe('after selecting a post', () => {
      beforeEach(() => {
        userSelector.select(0);
        page.postButton(0).click();
      })

      it('should be open', () => {
        page.sidebar().should('have.class', 'Sidebar--open');
      });

      it('should be closed after closing a selected post', () => {
        page.postButton(0).click();

        page.sidebar().should('not.have.class', 'Sidebar--open');
      });

      it('should stay open after selecting another post', () => {
        page.mockPost2Comments();
        page.postButton(1).click();

        page.sidebar().should('have.class', 'Sidebar--open');
      });

      it('should be closed after selecting another user', () => {
        page.mockUser2Posts();
        userSelector.select(1);

        page.sidebar().should('not.have.class', 'Sidebar--open');
      });
    });
  });

  describe('PostDetails', () => {
    beforeEach(() => {
      page.mockUsers();
      page.mockUser1Posts();

      cy.visit('/');
      userSelector.select(0);
    });

    it('should not exist before selecting a post', () => {
      postDetails.el().should('not.exist');
    });

    describe('after selecting a post while loading comments', () => {
      beforeEach(() => {
        page.mockPost1Comments();
        cy.clock();
        page.postButton(0).click();
      });

      it('should appear immediately', () => {
        postDetails.el().should('exist');
      });

      it('should have post id, title and body', () => {
        postDetails.postTitle().should('have.text', '#1: sunt aut facere repellat provident occaecati excepturi optio reprehenderit')
        postDetails.postBody().should('have.text', 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto');
      });

      it('should show loader', () => {
        postDetails.commentsLoader().should('exist');
      });

      it('should not show comments error', () => {
        postDetails.commentsError().should('not.exist');
      });

      it('should not show no comments message', () => {
        postDetails.noCommentsMessage().should('not.exist');
      });

      it('should not show comments', () => {
        postDetails.comments().should('not.exist');
      });

      it('should not show WriteCommentButton', () => {
        postDetails.writeCommentButton().should('not.exist');
      });

      it('should not show NewCommentForm', () => {
        newCommentForm.el().should('not.exist')
      });
    });

    describe('after comments are loaded', () => {
      beforeEach(() => {
        page.mockPost1Comments();
        page.postButton(0).click();
        page.waitForRequest('@post1CommentsRequest');
      });

      it('should hide comments loader', () => {
        postDetails.commentsLoader().should('not.exist');
      });

      it('should not show comments error', () => {
        postDetails.commentsError().should('not.exist');
      });

      it('should not show no comments message', () => {
        postDetails.noCommentsMessage().should('not.exist');
      });

      it('should show all loaded comments', () => {
        postDetails.comments().should('have.length', 5);
      });

      it('should show WriteCommentButton', () => {
        postDetails.writeCommentButton().should('exist');
      });

      it('should not show NewCommentForm', () => {
        newCommentForm.el().should('not.exist');
      });

      it('should hide WriteCommentButton after clicking it', () => {
        postDetails.writeCommentButton().click();
        postDetails.writeCommentButton().should('not.exist');
      });

      it('should show NewCommentForm after clicking WriteCommentButton', () => {
        postDetails.writeCommentButton().click();
        newCommentForm.el().should('exist');
      });

      it('should show comment author names as links', () => {
        postDetails.comments().eq(0).byDataCy('CommentAuthor')
          .should('have.text', 'id labore ex et quam laborum')
          .and('have.attr', 'href', 'mailto:Eliseo@gardner.biz');

        postDetails.comments().eq(4).byDataCy('CommentAuthor')
          .should('have.text', 'vero eaque aliquid doloribus et culpa')
          .and('have.attr', 'href', 'mailto:Hayden@althea.biz')
      });

      it('should show comment bodies', () => {
        postDetails.comments().eq(0).byDataCy('CommentBody')
          .should('have.text', 'laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium');

        postDetails.comments().eq(4).byDataCy('CommentBody')
          .should('have.text', 'harum non quasi et ratione\ntempore iure ex voluptates in ratione\nharum architecto fugit inventore cupiditate\nvoluptates magni quo et');
      });

      it('should disappear after selecting another user', () => {
        page.mockPost1Comments();
        page.postButton(0).click();

        page.mockUser2Posts();
        userSelector.select(1);

        postDetails.el().should('not.exist');
      });
    });

    describe('after comments loading error', () => {
      beforeEach(() => {
        page.mockError('**/comments?postId=1', 'post1CommentsRequest');
        page.postButton(0).click();
        page.waitForRequest('@post1CommentsRequest');
      });

      it('should hide comments loader', () => {
        postDetails.commentsLoader().should('not.exist');
      });

      it('should show comments error', () => {
        postDetails.commentsError().should('exist');
      });

      it('should not show no comments message', () => {
        postDetails.noCommentsMessage().should('not.exist');
      });

      it('should not show WriteCommentButton', () => {
        postDetails.writeCommentButton().should('not.exist');
      });

      it('should not show NewCommentForm', () => {
        newCommentForm.el().should('not.exist')
      });
    });

    describe('after empty comments received', () => {
      beforeEach(() => {
        cy.intercept('**/comments?postId=1', { body: [] }).as('post1CommentsRequest');
        page.postButton(0).click();
        page.waitForRequest('@post1CommentsRequest');
      });

      it('should show no comments message', () => {
        postDetails.noCommentsMessage().should('exist');
      });

      it('should hide comments loader', () => {
        postDetails.commentsLoader().should('not.exist');
      });

      it('should not show comments error', () => {
        postDetails.commentsError().should('not.exist');
      });

      it('should show WriteCommentButton', () => {
        postDetails.writeCommentButton().should('exist');
      });

      it('should not show NewCommentForm', () => {
        newCommentForm.el().should('not.exist')
      });
    });

    describe('after selecting another post', () => {
      beforeEach(() => {
        page.mockPost1Comments();
        page.postButton(0).click();
        page.waitForRequest('@post1CommentsRequest');
      });

      describe('', () => {
        beforeEach(() => {
          cy.clock();
          page.spyOn('**/comments?postId=2', 'post2Coments', { fixture: 'post2Comments' });
          page.postButton(1).click();
        });

        it('should stay visible', () => {
          postDetails.el().should('exist');
        });

        it('should show comments loader again', () => {
          postDetails.commentsLoader().should('exist');
        });

        it('should show new post data', () => {
          postDetails.postTitle().should('have.text', '#2: qui est esse')
          postDetails.postBody().should('have.text', 'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla');
        });

        it('should send a request for the selected post comments', () => {
          cy.tick(1000);
          page.waitForRequest('@post2ComentsRequest');
          cy.get('@post2Coments').should('be.calledOnce');
        });

        it('should show new loaded comments', () => {
          cy.tick(1000);
          page.waitForRequest('@post2ComentsRequest');

          postDetails.comments().should('have.length', 1);

          postDetails.comments().eq(0).byDataCy('CommentAuthor')
            .should('have.text', 'et fugit eligendi deleniti quidem qui sint nihil autem')
            .and('have.attr', 'href', 'mailto:Presley.Mueller@myrl.com')

          postDetails.comments().eq(0).byDataCy('CommentBody')
            .should('have.text', 'doloribus at sed quis culpa deserunt consectetur qui praesentium\naccusamus fugiat dicta\nvoluptatem rerum ut voluptate autem\nvoluptatem repellendus aspernatur dolorem in')
        });
      });

      describe('if NewCommentForm was open', () => {
        beforeEach(() => {
          postDetails.writeCommentButton().click();
          page.mockPost2Comments();
          page.postButton(1).click();
          page.waitForRequest('@post2CommentsRequest');
        });

        it('should hide NewCommentForm', () => {
          newCommentForm.el().should('not.exist')
        });

        it('should show WriteCommentButton', () => {
          postDetails.writeCommentButton().should('exist');
        });
      });
    });
  });

  describe('NewCommentForm', () => {
    beforeEach(() => {
      page.mockUsers();
      page.mockUser1Posts();
      page.mockPost1Comments();

      cy.visit('/');

      userSelector.select(0);
      page.waitForRequest('@user1PostsRequest');

      page.postButton(0).click();
      page.waitForRequest('@post1CommentsRequest');

      postDetails.writeCommentButton().click();
      cy.wait(50);
    });

    it('should be empty by default', () => {
      newCommentForm.nameInput().should('be.empty');
      newCommentForm.emailInput().should('be.empty');
      newCommentForm.bodyArea().should('be.empty');
    });

    it('should not have errors be default', () => {
      newCommentForm.assertNameError(false);
      newCommentForm.assertEmailError(false);
      newCommentForm.assertBodyError(false);
    });

    it('should allow to enter an author name', () => {
      newCommentForm.nameInput().type('Some name')
      newCommentForm.nameInput().should('have.value', 'Some name');
    });

    it('should allow to enter an author email', () => {
      newCommentForm.emailInput().type('some@email.com')
      newCommentForm.emailInput().should('have.value', 'some@email.com');
    });

    it('should allow to enter a comment body', () => {
      newCommentForm.bodyArea().type('Some comment body')
      newCommentForm.bodyArea().should('have.text', 'Some comment body');
    });

    it('should show only name error if name is empty', () => {
      newCommentForm.emailInput().type('some@email.com');
      newCommentForm.bodyArea().type('Some comment body')
      newCommentForm.submitButton().click();

      newCommentForm.assertNameError(true);
      newCommentForm.assertEmailError(false);
      newCommentForm.assertBodyError(false);
    });

    it('should show only email error if email is empty', () => {
      newCommentForm.nameInput().type('Some name');
      newCommentForm.bodyArea().type('Some comment body')
      newCommentForm.submitButton().click();

      newCommentForm.assertNameError(false);
      newCommentForm.assertEmailError(true);
      newCommentForm.assertBodyError(false);
    });

    it('should show only body error if body is empty', () => {
      newCommentForm.nameInput().type('Some name');
      newCommentForm.emailInput().type('some@email.com');
      newCommentForm.submitButton().click();

      newCommentForm.assertNameError(false);
      newCommentForm.assertEmailError(false);
      newCommentForm.assertBodyError(true);
    });

    it('should show all errors after submitting an empty form', () => {
      newCommentForm.submitButton().click();

      newCommentForm.assertNameError(true);
      newCommentForm.assertEmailError(true);
      newCommentForm.assertBodyError(true);
    });

    it('should clear the form with reset button', () => {
      newCommentForm.nameInput().type('Some name');
      newCommentForm.emailInput().type('some@email.com');
      newCommentForm.bodyArea().type('Some comment body');

      newCommentForm.resetButton().click();

      newCommentForm.nameInput().should('be.empty');
      newCommentForm.emailInput().should('be.empty');
      newCommentForm.bodyArea().should('be.empty');
    });

    it('should hide errors after reset', () => {
      newCommentForm.submitButton().click();
      newCommentForm.resetButton().click();

      newCommentForm.assertNameError(false);
      newCommentForm.assertEmailError(false);
      newCommentForm.assertBodyError(false);
    });

    it('should not send request is name is empty', () => {
      page.spyOnCommentsPost();

      newCommentForm.emailInput().type('some@email.com');
      newCommentForm.bodyArea().type('Some comment body')
      newCommentForm.submitButton().click();

      cy.get('@commentsPost').should('not.be.called');
    });

    it('should not send request if email is empty', () => {
      page.spyOnCommentsPost();

      newCommentForm.nameInput().type('Some name');
      newCommentForm.bodyArea().type('Some comment body')
      newCommentForm.submitButton().click();

      cy.get('@commentsPost').should('not.be.called');
    });

    it('should not send request if body is empty', () => {
      page.spyOnCommentsPost();

      newCommentForm.nameInput().type('Some name');
      newCommentForm.emailInput().type('some@email.com');
      newCommentForm.submitButton().click();

      cy.get('@commentsPost').should('not.be.called');
    });

    it('should send form data to the API if form is valid', () => {
      page.spyOnCommentsPost();

      newCommentForm.nameInput().type('Some name');
      newCommentForm.emailInput().type('some@email.com');
      newCommentForm.bodyArea().type('Some comment body');
      newCommentForm.submitButton().click();

      cy.get('@commentsPost').should('be.calledOnce');
      cy.get('@commentsPostRequest').its('request.body.postId').should('eq', 1);
      cy.get('@commentsPostRequest').its('request.body.name').should('eq', 'Some name');
      cy.get('@commentsPostRequest').its('request.body.email').should('eq', 'some@email.com');
      cy.get('@commentsPostRequest').its('request.body.body').should('eq', 'Some comment body');
    });

    it('should add a comment to the list after success', () => {
      page.spyOnCommentsPost();

      newCommentForm.nameInput().type('Some name');
      newCommentForm.emailInput().type('some@email.com');
      newCommentForm.bodyArea().type('Some comment body');
      newCommentForm.submitButton().click();
      page.waitForRequest('@commentsPostRequest');

      postDetails.comments().should('have.length', 6);

      postDetails.comments().eq(5).byDataCy('CommentAuthor')
        .should('have.text', 'Some name')
        .and('have.attr', 'href', 'mailto:some@email.com');

      postDetails.comments().eq(5).byDataCy('CommentBody')
        .should('have.text', 'Some comment body');
    });

    it('should show submit button spinner while waiting for server response', () => {
      cy.clock()
      page.spyOnCommentsPost();

      newCommentForm.nameInput().type('Some name');
      newCommentForm.emailInput().type('some@email.com');
      newCommentForm.bodyArea().type('Some comment body');
      newCommentForm.submitButton().click();

      newCommentForm.submitButton().should('have.class', 'is-loading');
    });

    it('should hide submit button spinner after success', () => {
      page.spyOnCommentsPost();

      newCommentForm.nameInput().type('Some name');
      newCommentForm.emailInput().type('some@email.com');
      newCommentForm.bodyArea().type('Some comment body');
      newCommentForm.submitButton().click();
      page.waitForRequest('@commentsPostRequest');

      newCommentForm.submitButton().should('not.have.class', 'is-loading');
    });

    it('should clear body after submitting', () => {
      page.spyOnCommentsPost();

      newCommentForm.nameInput().type('Some name');
      newCommentForm.emailInput().type('some@email.com');
      newCommentForm.bodyArea().type('Some comment body');

      newCommentForm.submitButton().click();
      page.waitForRequest('@commentsPostRequest');

      newCommentForm.bodyArea().should('be.empty');
    });

    it('should keep name and email after submitting', () => {
      page.spyOnCommentsPost();

      newCommentForm.nameInput().type('Some name');
      newCommentForm.emailInput().type('some@email.com');
      newCommentForm.bodyArea().type('Some comment body');

      newCommentForm.submitButton().click();
      page.waitForRequest('@commentsPostRequest');

      newCommentForm.nameInput().should('have.value', 'Some name');
      newCommentForm.emailInput().should('have.value', 'some@email.com');
    });

    it('should not have errors after submitting', () => {
      page.spyOnCommentsPost();

      newCommentForm.nameInput().type('Some name');
      newCommentForm.emailInput().type('some@email.com');
      newCommentForm.bodyArea().type('Some comment body');

      newCommentForm.submitButton().click();
      page.waitForRequest('@commentsPostRequest');

      newCommentForm.assertNameError(false);
      newCommentForm.assertEmailError(false);
      newCommentForm.assertBodyError(false);
    });

    it('should hide NoCommentsMessage after adding the first comment', () => {
      cy.intercept('**/comments?postId=3', { body: [] }).as('post3CommentsRequest'),

      page.postButton(2).click();
      page.waitForRequest('@post3CommentsRequest');

      postDetails.writeCommentButton().click();
      cy.wait(50);

      page.spyOnCommentsPost();

      newCommentForm.nameInput().type('Some name');
      newCommentForm.emailInput().type('some@email.com');
      newCommentForm.bodyArea().type('Some comment body');

      newCommentForm.submitButton().click();
      page.waitForRequest('@commentsPostRequest');

      postDetails.noCommentsMessage().should('not.exist');
    });

    it('should allow to add a comment after adding one before', () => {
      page.spyOnCommentsPost();

      newCommentForm.nameInput().type('Some name');
      newCommentForm.emailInput().type('some@email.com');
      newCommentForm.bodyArea().type('Some comment body');
      newCommentForm.submitButton().click();
      page.waitForRequest('@commentsPostRequest');

      newCommentForm.nameInput().type('{selectAll}{backspace}Misha Hrynko');
      newCommentForm.emailInput().type('{selectAll}{backspace}misha@mate.academy');
      newCommentForm.bodyArea().type('I wrote these tests');
      newCommentForm.submitButton().click();
      page.waitForRequest('@commentsPostRequest');

      postDetails.comments().should('have.length', 7);

      postDetails.comments().eq(6).byDataCy('CommentAuthor')
        .should('have.text', 'Misha Hrynko')
        .and('have.attr', 'href', 'mailto:misha@mate.academy');

      postDetails.comments().eq(6).byDataCy('CommentBody')
        .should('have.text', 'I wrote these tests');
    });
  });

  describe('App', () => {
    beforeEach(() => {
      page.mockUsers();
      page.mockUser1Posts();
      page.mockPost1Comments();

      cy.visit('/');

      userSelector.select(0);
      page.waitForRequest('@user1PostsRequest');

      page.postButton(0).click();
      page.waitForRequest('@post1CommentsRequest');
    });

    it('should delete a comment immediately', () => {
      postDetails.deleteCommentButton(0).click();

      postDetails.comments().should('have.length', 4);

      postDetails.comments().eq(0).byDataCy('CommentAuthor')
        .should('have.text', 'quo vero reiciendis velit similique earum')
        .and('have.attr', 'href', 'mailto:Jayne_Kuhic@sydney.com');
    });

    it('should send delete request with a deleted comment id', () => {
      page.spyOnCommentsDelete(2);

      postDetails.deleteCommentButton(1).click();

      cy.get('@comments2Delete').should('be.calledOnce');
    });

    it('should allow to delete several posts', () => {
      page.spyOnCommentsDelete(4);
      page.spyOnCommentsDelete(3);
      page.spyOnCommentsDelete(2);

      postDetails.deleteCommentButton(3).click();
      postDetails.deleteCommentButton(2).click();
      postDetails.deleteCommentButton(1).click();

      postDetails.comments().should('have.length', 2);
    });

    it('should show NoCommentsMessage after deleting the last comment', () => {
      page.mockPost2Comments();
      page.postButton(1).click();
      page.waitForRequest('@post2CommentsRequest');

      page.spyOnCommentsDelete(6);
      postDetails.deleteCommentButton(0).click();

      postDetails.comments().should('not.exist');
      postDetails.noCommentsMessage().should('exist');
    });
  });
});
