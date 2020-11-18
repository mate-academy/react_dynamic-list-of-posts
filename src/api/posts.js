import { request } from './api';
import { getPostComments } from './comments';

const POSTS_URL = '/posts';

export const getUserPosts = async(userId) => {
  const posts = await request(POSTS_URL);

  return (+userId !== 0)
    ? posts.data.filter(post => +userId === post.userId)
    : posts.data;
};

export const getPostDetails = async(postId) => {
  const post = await request(`${POSTS_URL}/${postId}`);

  return post.data;
};

export async function fetchPostDetails(
  selectedPostId,
  setDetails,
  setComments,
) {
  const post = await getPostDetails(selectedPostId);
  const comments = await getPostComments(selectedPostId);

  setDetails(post);
  setComments(comments);
}

export async function fetchDataPosts(selectedUser, setPosts) {
  const response = await getUserPosts(selectedUser);

  setPosts(response);
}
