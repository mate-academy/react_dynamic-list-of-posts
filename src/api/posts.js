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

  // console.log(filtered);

  return filtered;
}

export async function getPostDetails(postId) {
  const response = await fetch(`${POSTS_URL}/${postId}`);
  const result = await response.json();

  // console.log(result.data);

  return result.data;
}

export async function getPostComments(postId) {
  const response = await fetch(COMMENTS_URL);
  const result = await response.json();

  const filtered = await result.data
    .filter(comment => comment.postId === postId);

  return filtered;
  // const response = await fetch(`${COMMENTS_URL}/${postId}`);
  // const result = await response.json();

  // return result;
}

export const createComment = async(postID, body, email, name) => {
  const response = await fetch(COMMENTS_URL, {
    method: 'POST',
    headers: {
      // eslint-disable-next-line quotes
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({
      postId: postID,
      body,
      email,
      name,
    }),
  });
  const result = await response.json();

  // console.log(result);
  return result;
};

export const remove = async(commentId) => {
  const response = await fetch(
    `${COMMENTS_URL}/${commentId}`, { method: 'DELETE' },
  );

  // console.log(response);
  return response;
};
