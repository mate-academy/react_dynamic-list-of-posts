# React dynamic list of Posts

  [DEMO LINK](https://vladyslav-harkusha.github.io/react_dynamic-list-of-posts/)

## Task
You are given [the API](https://mate-academy.github.io/fe-students-api/).

Implement the app to manage post comments.

1. Create an `/src/api/posts.ts` and add a method `getUserPosts(userId)` there
2. Load `posts` and show them using the `PostsList` on page load. (use `useEffect` as a `componentDidMount`)
3. Implement the `UserSelect` to show only the `posts` of the selected user. (call `getUserPosts` each time when user changes)
4. Each `post` has an `Open` button that sets a `selectedPostId` in the `App`.
5. After opening the details the `Open` button becomes `Close` and will close the details on click.
6. `PostDetails` component should be shown only after selecting a `post`.
7. Create `getPostDetails(postId)` method in `/src/api/posts.ts` and load post details from `/posts/:postId`
8. Create `getPostComments(postId)` method in `/src/api/comments.ts`, load comments from `/comments?postId={postId}`
9. Add a button to `show`/`hide` comments.
10. Add an `X` button near each comment to delete it on the server.
11. Add a form to add a new comment to the current post
12. Comments should be immediately updated after adding or removing.

