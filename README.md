# React dynamic list of posts

By requesting https://jsonplaceholder.typicode.com/posts, https://jsonplaceholder.typicode.com/users, and https://jsonplaceholder.typicode.com/comments, create and display a list of posts with the following data on each:

1) the title of the post;
2) the text (body) of the post;
3) the name, email, and address of the author of the post;
4) sublist of the post comments, including the name and email of the author of each comment as well as the comment itself.

Create and use five components: `PostList`, `Post`, `User`, `CommentList`, and `Comment`. You can use the `User` component from both `Post` (with address) and `Comment` (without providing any address).

Initially `PostList` has to present the user with a button labeled "Load". Only when the user hits the button, the script starts to download the data; the label of the button has to change to "Loading..." and the button must become disabled. Once the data has been loaded, hide the button altogether and display the posts instead.

Additionally, you should provide a capability of filtering the items by text entered by the user (when filtering, you can consider only the title and the text of the post).
