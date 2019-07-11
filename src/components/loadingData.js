export const loadData = async(url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const getPostsWithUsers = async() => {
  const url = 'https://jsonplaceholder.typicode.com/';

  const posts = await loadData(`${url}posts`);
  const users = await loadData(`${url}users`);
  const comments = await loadData(`${url}comments`);

  const postsWithUsers = await posts.map(post => (
    {
      ...post,
      user: users.find(person => person.id === post.userId),
      comments: comments.filter(comment => post.id === comment.postId),
    }
  ));

  return postsWithUsers;
};
