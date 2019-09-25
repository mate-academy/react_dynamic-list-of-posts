const APICOMMENTS_URl = 'https://jsonplaceholder.typicode.com/comments';

const getCommentsFromServer = async() => {
  const comments = await fetch(APICOMMENTS_URl);

  return comments.json();
};

export default getCommentsFromServer;
