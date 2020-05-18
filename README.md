# React dynamic list of Posts
- Replace `<your_account>` with your Github username in the
  [DEMO LINK](https://<your_account>.github.io/react_dynamic-list-of-posts/)
- Follow the [React task guideline](https://github.com/mate-academy/react_task-guideline#react-tasks-guideline)

## Task
Basing on [Static list of posts](https://github.com/mate-academy/react_static-list-of-posts)
create the App downloading the data from API (follow the links):
  - [posts](https://mate-academy.github.io/react_dynamic-list-of-posts/api/posts.json)
  - [users](https://mate-academy.github.io/react_dynamic-list-of-posts/api/users.json)
  - [comments](https://mate-academy.github.io/react_dynamic-list-of-posts/api/comments.json)

1. Initially `PostList` shows a `Load` button.
1. After a click disable the button, change its text to `Loading...` and download the data.
1. Once the data has been loaded, hide the button and display the list of posts instead.
1. Add a text field, to filter the posts by `post.title` and `post.body`.
1. (*) Add `debounce` with `1s` delay to the text field
