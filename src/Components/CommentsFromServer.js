const COMMENTS_URL = 'https://jsonplaceholder.typicode.com/comments';

export const commentsFromServer = async() => {
  const response = await fetch(COMMENTS_URL);

  return response.json();
};
