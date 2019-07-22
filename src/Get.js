const API_URL = ' https://jsonplaceholder.typicode.com';

const getPosts = async() => {
  const responsePosts = await fetch(`${API_URL}/posts`);
  const posts = await responsePosts.json();
return posts;
};

const getComments = async() => {
  const responseComments = await fetch(`${API_URL}/comments`);
  const comments = await responseComments.json();
return comments;
};

const getUsers = async() => {
  const responseUser = await fetch(`${API_URL}/users`);
  const users = await responseUser.json();
return users;
};

export const getData = async() => {
  const posts = await getPosts();
  const comments = await getComments();
  const users = await getUsers();

  const postsWithUserAndComments = posts.map((post) => ({
    ...post,
    userData: users.find(user => user.id === post.userId),
    userComments: comments.filter(comment => post.id === comment.postId),

  })
  );
  return postsWithUserAndComments;
};

