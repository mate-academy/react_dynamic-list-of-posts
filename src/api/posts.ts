export function getPosts(uesrId: number): Promise<Post[]> {
  let url = 'https://mate.academy/students-api/posts';

  if (uesrId !== 0) {
    url += `?userId=${uesrId}`;
  }

  return fetch(url).then(response => response.json());
}

export async function getPostDetails(postId: number): Promise<Post> {
  const url = `https://mate.academy/students-api/posts/${postId}`;
  const postDetails = await fetch(url);

  return postDetails.json();
}

export async function getPostComments(postId: number): Promise<Comment[]> {
  const url = 'https://mate.academy/students-api/comments';
  const comments = await fetch(url).then(response => response.json());
  const filteredComments = comments.filter((comment: { postId: number; }) => (
    comment.postId === postId
  ));

  return filteredComments;
}

export async function deleteComment(commentId: number) {
  const url = `https://mate.academy/students-api/comments/${commentId}`;

  return fetch(url, { method: 'DELETE' });
}

export async function addComment(comment: NewComment) {
  const url = 'https://mate.academy/students-api/comments';

  return fetch(url, {
    method: 'POST',
    body: JSON.stringify({ ...comment }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
