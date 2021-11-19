const COMMENTS_URL = 'https://mate.academy/students-api/comments';

export async function getPostComments(postId:number) {
  if (postId !== 0) {
    const response = await fetch(`${COMMENTS_URL}?postId=${postId}`);

    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }

    const data = await response.json();

    return data;
  }

  return null;
}

export async function deleteComment(postId:number) {
  const response = await fetch(`${COMMENTS_URL}/${postId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`);
  }

  const comment = await response.json();

  return comment;
}

export async function newCommentFormSubmit(body: CommentBody) {
  const response = await fetch(`${COMMENTS_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`);
  }

  const newComment = await response.json();

  return newComment;
}
