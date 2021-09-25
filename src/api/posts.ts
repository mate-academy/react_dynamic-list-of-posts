export const API_URL = 'https://mate.academy/students-api';

export const request = async (url: string, options = {}) => {
  const response = await fetch(`${API_URL}${url}`, options);

  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`);
  }

  return response.json();
};

export const getPosts = () => request('/posts');
export const getUserPosts = (userId: number) => request(`/posts?userId=${userId}`);
export const getUsers = () => request('/users');
export const getPostsDetails = (postID: number) => request(`/posts/${postID}`);
export const getComments = (postID: number) => request(`/comments?postId=${postID}`);
export const removeCommentById = (commentID: number) => request(`/comments/${commentID}`, { method: 'DELETE' });
export const addComment = (newComment: Partial<Comment>) => {
  return request('/comments', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(newComment),
  });
};
