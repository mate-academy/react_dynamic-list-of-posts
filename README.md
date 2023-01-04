# React Dynamic List of Posts

The implemented App has the ability to show posts of a selected user. Each post can
be opened in the sidebar with its comments. Also there is ability to delete a comment and a
form to add new comments.

## Features

1. Used [the API](https://mate.academy/students-api) to fetch necessary data for the app.
1. The `App` initially shows shows the `UserSelector` and a paragraph `No user selected` in the main content block.
    - users are loaded from the API on page load.
    - The `UserSelector` is implemented as a dropdown.
1. When a user is selected, the user's posts are loaded form [the API](https://mate-academy.github.io/fe-students-api/) and shown using a table in the main content clock.
    - `<Loader>` is shown while waiting for the API response.
    - an error notification is shown if `posts` loading fails.
    - if the user has no posts, the `No posts yet` notification is shown.
1. When a post is selected, it is opened in the sidebar.
    - the post details appear there immediately.
    - the post commnets are loaded from the API.
    - the `Loader` is shown before comments are loaded;
    - `CommentsError` notification is show on loading error;
    - `NoComments` message is shown if the post does not have comments yet.
1. `Write a comment` button is shwown below the comments.
    - once clicked, the button is hidden and a form to add new comment is shown
    - the form stays visible until the other post is opened.
1. The form requires an author's name and email and a comment text.
    - errors are shown only after the form is submitted.
    - error is removed on the field change.
    - `name` and `email` are kept after successful submit but comment text is cleared.
    - `Clear` button also clears all errors.
    - the submit button shows loading animation while waiting for a response.
    - the new comment received as a response from the `API` is added to the end of the list.
1. Ability to delete comment.
    - the comment is deleted immediately (not waiting for the server response to improve the UX).
1. `Add` and `Delete` errors are handled so that the user can be made aware and he/she can retry.

## Demo

https://sapnachoudhary06.github.io/react_dynamic-list-of-posts/

## Run Locally

Clone the project

```bash
  git clone https://github.com/sapnachoudhary06/react_people-table-basics.git
```

Go to the project directory

```bash
  cd react_dynamic-list-of-posts
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```

## Deployment

To deploy this project run

```bash
  npm run deploy
```

## 🛠 Skills
Javascript, TypeScript, HTML, CSS, React, React Router and hooks.
