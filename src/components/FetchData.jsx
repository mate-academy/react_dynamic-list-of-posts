export default async () => {
  const LINK_API ='https://jsonplaceholder.typicode.com/';

  const responsePosts = await fetch(`${LINK_API}posts`);
  const responseUsers = await fetch(`${LINK_API}users`);
  const responseComments = await fetch(`${LINK_API}comments`);

  const posts = await responsePosts.json();
  const users = await responseUsers.json();
  const comments = await responseComments.json();

  const postsWithUser = posts.map(post => ({
    ...post,
    user: users.find(user => user.id === post.userId),
    comments: comments.filter(comment => post.id === comment.postId),
  }));

  return postsWithUser;
}
