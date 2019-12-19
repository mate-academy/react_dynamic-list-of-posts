const URL_COMMENTS = 'https://jsonplaceholder.typicode.com/comments';

export const getCommentsFromServer = async() => {
  const comments = await fetch(URL_COMMENTS);

  return comments.json();
};
