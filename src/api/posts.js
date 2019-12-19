const URL_POSTS = 'https://jsonplaceholder.typicode.com/posts';

export const getPostsFromServer = async() => {
  const posts = await fetch(URL_POSTS);

  return posts.json();
};
