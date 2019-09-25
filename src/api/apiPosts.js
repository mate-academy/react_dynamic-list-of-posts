const APIPOSTS_URl = 'https://jsonplaceholder.typicode.com/posts';

const getPostsFromServer = async() => {
  const posts = await fetch(APIPOSTS_URl);

  return posts.json();
};

export default getPostsFromServer;
