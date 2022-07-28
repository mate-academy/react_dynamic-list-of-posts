import { BASE_URL } from './api';

export async function getPostComments(postId: number): Promise<PostComment[]> {
  const response = await fetch(`${BASE_URL}/comments`);

  const comments = await response.json();

  return comments.filter((comment: PostComment) => comment.postId === postId);
}

export async function deleteComment(commentId: number) {
  const response = await fetch(`${BASE_URL}/comments/${commentId}`, { method: 'DELETE' });

  return response.json();
}

export async function addComment(newComment: Pick<PostComment, 'postId' | 'name' | 'email' | 'body'>) {
  const {
    postId, name, email, body,
  } = newComment;
  const response = await fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify({
      postId,
      name,
      email,
      body,
    }),
  });

  return response.json();
}
