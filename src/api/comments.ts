import { BASE_URL } from './api';

const COMMENT_URL = `${BASE_URL}/comments`;

export async function getPostComments(postID = 0) {
  const response = await fetch(`${COMMENT_URL}?postId=${postID}`);

  return response.json();
}
