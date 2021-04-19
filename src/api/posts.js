import { BASE_URL } from './api';

export const getUserPosts = (userId, setPosts) => {
  const END_POINT = '/posts';

  const userID = +userId;

  fetch(`${BASE_URL}${END_POINT}`)
    .then(response => response.json())
    .then(result => setPosts(() => {
      if (userID !== 0) {
        return result.data.filter(post => post.userId === userID);
      }

      return result.data;
    }));
};

export const getPostDetails = (postId, setPost) => {
  const END_POINT = `/posts/${postId}`;

  fetch(`${BASE_URL}${END_POINT}`)
    .then(response => response.json())
    .then(result => setPost(result.data));
};

export const getPostComments = (postId, setComments) => {
  const END_POINT = '/comments';

  fetch(`${BASE_URL}${END_POINT}`)
    .then(response => response.json())
    .then(result => setComments(
      result.data.filter(comment => comment.postId === postId),
    ));
};
