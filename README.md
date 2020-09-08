# React dynamic list of Posts
- Replace `<your_account>` with your Github username in the
  [DEMO LINK](https://<your_account>.github.io/react_dynamic-list-of-posts/)
- Follow the [React task guideline](https://github.com/mate-academy/react_task-guideline#react-tasks-guideline)

## Task
You are given a basic markup and [the API](https://github.com/mate-academy/fe-students-api#mate-students-api).

Implement the app to manage post comments.

> Don't use class components. Use React Hooks instead. 

1. Load posts and show them using the PostsList
1. Implement the UserSelect to show only the posts of the selected user
1. Each post has an `Open` button that sets a `selectedPostId` in the `App`.
1. After opening the details `Open` button become `Close` and closes the details
1. `PostDetails` component should be shown only when a post is selected.
1. Load post details from `/posts/:postId` and comments from `/comments` and filter them using `selectedPostId`
1. Add a button to `show`/`hide` comments
1. Add an `X` button near each comment to delete it on the server
1. Add a form to add a new comment to the current post
1. Comments should be immediately updated after add/remove actiions
 
