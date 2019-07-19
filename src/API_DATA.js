const getPosts = async() => {
  const url = 'https://jsonplaceholder.typicode.com';

  const postsFetch = await fetch(`${url}/posts`);
  const posts = await postsFetch.json();

  const usersFetch = await fetch(`${url}/users`);
  const users = await usersFetch.json();

  const commentsFetch = await fetch(`${url}/comments`);
  const comments = await commentsFetch.json();

  const postWithUsersAndComments = posts.map(post => (
    {
      ...post,
      user: users.find(user => user.id === post.userId),
      postComments: comments.filter(comment => comment.postId === post.id),
    }
  ));

  return postWithUsersAndComments;
};

export default getPosts;
