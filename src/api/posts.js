const BASE_URL = 'https://mate-api.herokuapp.com/posts';

export function getUserPosts(userId) {
  return fetch(`${BASE_URL}`)
    .then(response => response.json())
    .then(result => result.data)
    .then((posts) => {
      if (userId === '0') {
        return posts;
      }

      return posts.filter(post => post.userId === +userId);
    });
}

export function getPostDetails(postId) {
  return fetch(`${BASE_URL}/${postId}`)
    .then(response => response.json())
    .then(result => result.data);
}
