# React dynamic list of Posts
- Replace `<your_account>` with your Github username in the
  [DEMO LINK](https://<your_account>.github.io/react_dynamic-list-of-posts/)
- Follow the [React task guideline](https://github.com/mate-academy/react_task-guideline#react-tasks-guideline)
- Use [React TypeScript cheat sheet](https://mate-academy.github.io/fe-program/js/extra/react-typescript)

## Task
You are given a basic markup and [the API](https://mate-academy.github.io/fe-students-api/).

Implement the app to manage post comments.

> Don't use class components. Use React Hooks instead.

1. Create an `/src/api/posts.ts` and add a method `getUserPosts(userId)` there.
2. Load `posts` and show them using the `PostsList` on page load (use `useEffect` as a `componentDidMount`). You should add `data-cy="postDetails"` attribute to the `PostsList` `<ul>` or `<ol>` element.
3. Implement the `UserSelect` to show only the `posts` of the selected user. (call `getUserPosts` each time when user changes).
4. `post` should contain `title` of the post.
5. Each `post` has an `Open` button that sets a `selectedPostId` in the `App`.
6. After opening the details the `Open` button becomes `Close` and will close the details on click.
7. You should add `data-cy="postList"` attribute to the element containing post comments.
8. `PostDetails` component should be shown only after selecting a `post`. 
9. Create `getPostDetails(postId)` method in `/src/api/posts.ts` and load post details from `/posts/:postId`.
10. Create `getPostComments(postId)` method in `/src/api/comments.ts`, load comments from `/comments?postId={postId}`.
11. Add a button to `show`/`hide` comments, which should have the name `Show comments`/`Hide comments` respectively.
12. Add a delete button near each comment to delete it on the server using this symbol `X`.
13. Add a form to add a new comment to the current post. The form should have a submit button with the name `Add a comment` in it and 3 fields: 
- for user name  with the placeholder `Your name` 
- for user email with the placeholder `Your email` 
- for comment with the placeholder `Type comment here`
14. Comments should be immediately updated after adding or removing.
