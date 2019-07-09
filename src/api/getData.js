const getData = async(url) => {
  const responsePosts = await fetch(`${url}/posts`);
  const posts = await responsePosts.json();

  const responseUsers = await fetch(`${url}/users`);
  const users = await responseUsers.json();

  const responseComments = await fetch(`${url}/comments`);
  const comments = await responseComments.json();

  const data = posts.map(post => ({
    ...post,
    user: users.find(user => (user.id === post.userId)),
    comment: comments.filter(comment => comment.postId === post.id),
  }));

  return data;
};

export default getData;
