const API_URL = ' https://jsonplaceholder.typicode.com';

const getFromServer = async() => {
  const responsePosts = await fetch(`${API_URL}/posts`);
  const posts = await responsePosts.json();

  const responseComments = await fetch(`${API_URL}/comments`);
  const comments = await responseComments.json();

  const responseUser = await fetch(`${API_URL}/users`);
  const users = await responseUser.json();

  const PostsWithUserAndComments = posts.map((post) => ({
    ...post,
    userData: users.find(user => user.id === post.userId),
    userComments: comments.filter(comment => post.id === comment.postId),

  })
  );
  return PostsWithUserAndComments;
};

export default getFromServer;
