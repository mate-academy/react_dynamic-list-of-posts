const fetchData = async() => {
  const usersUrl = 'https://jsonplaceholder.typicode.com/users';
  const usersResponse = await fetch(usersUrl);
  const users = await usersResponse.json();

  const commentsUrl = 'https://jsonplaceholder.typicode.com/comments';
  const commentsResponse = await fetch(commentsUrl);
  const comments = await commentsResponse.json();

  const postsUrl = 'https://jsonplaceholder.typicode.com/posts';
  const postsResponse = await fetch(postsUrl);
  const posts = await postsResponse.json();

  const sortedPosts = posts.map(post => ({
    ...post,
    user: users.find(user => user.id === post.userId),
    comments: comments.filter(comment => comment.postId === post.id),
  }));

  return sortedPosts;
};

export default fetchData;
