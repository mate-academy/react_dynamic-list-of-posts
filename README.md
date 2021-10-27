# React dynamic list of Posts
- Replace `<your_account>` with your Github username in the
  [DEMO LINK](https://presidentcomanch.github.io/react_dynamic-list-of-posts/)
- Follow the [React task guideline](https://github.com/mate-academy/react_task-guideline#react-tasks-guideline)
- Use [React TypeScript cheat sheet](https://mate-academy.github.io/fe-program/js/extra/react-typescript)

## Task
You are given a basic markup and [the API](https://mate-academy.github.io/fe-students-api/).

Implement the app to manage post comments.

> Don't use class components. Use React Hooks instead.

1. <!-- done --> Create an `/src/api/posts.ts` and add a method `getUserPosts(userId)` there
2. <!-- done --> Load `posts` and show them using the `PostsList` on page load. (use `useEffect` as a `componentDidMount`)
3. <!-- done --> Implement the `UserSelect` to show only the `posts` of the selected user. (call `getUserPosts` each time when user changes)
4. <!-- done --> Each `post` has an `Open` button that sets a `selectedPostId` in the `App`.
5. <!-- done --> After opening the details the `Open` button becomes `Close` and will close the details on click.
6. <!-- done --> `PostDetails` component should be shown only after selecting a `post`.
7. <!-- done --> Create `getPostDetails(postId)` method in `/src/api/posts.ts` and load post details from `/posts/:postId`
8.<!-- done --> Create `getPostComments(postId)` method in `/src/api/comments.ts`, load comments from `/comments` and filter them using a given `postId`
9.<!-- done --> Add a button to `show`/`hide` comments.
10.<!-- done --> Add an `X` button near each comment to delete it on the server.
11.<!-- done --> Add a form to add a new comment to the current post
12.<!-- done --> Comments should be immediately updated after adding or removing.

