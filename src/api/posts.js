import { BASE_URL } from './api';

export const getUserPost = selectedPostId => fetch(`${BASE_URL}/comments`)
  .then(response => response.json())
  .then(result => result.data)
  .then(resultArr => resultArr.filter(
    item => item.postId && (item.body.trim() !== ''),
  ))
  .then(resultFiltered => resultFiltered.filter(
    item => item.postId === selectedPostId,
  ));

export const getPostDetails = selectedPostId => fetch(
  `${BASE_URL}/posts/${selectedPostId}`,
)
  .then(response => response.json())
  .then(result => result.data);
