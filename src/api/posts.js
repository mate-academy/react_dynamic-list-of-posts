const POSTS_URL = 'https://mate-api.herokuapp.com/posts';
const COMMENTS_URL = 'https://mate-api.herokuapp.com/comments';

export async function getAllPosts() {
  const response = await fetch(POSTS_URL);
  const result = await response.json();
  const truePosts = await result.data.filter(post => post.title);

  return truePosts;
}

export async function getUserPosts(userId) {
  const result = await getAllPosts();
  const filtered = await result.filter((post) => {
    if (userId === 0) {
      return post;
    }

    return post.userId === userId;
  });

  return filtered;
}

export async function getPostDetails(postId) {
  const response = await fetch(`${POSTS_URL}/${postId}`);
  const result = await response.json();

  return result.data;
}

export async function getPostComments(postId) {
  const response = await fetch(COMMENTS_URL);
  const result = await response.json();

  const filtered = await result.data
    .filter(comment => comment.postId === postId);

  return filtered;
}

export const createComment = async(post) => {
  const response = await fetch(COMMENTS_URL, {
    method: 'POST',
    headers: {
      // eslint-disable-next-line quotes
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(post),
  });
  const result = await response.json();

  return result;
};

export const remove = async(commentId) => {
  const response = await fetch(
    `${COMMENTS_URL}/${commentId}`, { method: 'DELETE' },
  );

  return response;
};
