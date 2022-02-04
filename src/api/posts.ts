const URL = 'https://mate.academy/students-api/';

export async function getPosts(uesrId: number): Promise<Post[]> {
  let url = `${URL}posts`;

  if (uesrId !== 0) {
    url += `?userId=${uesrId}`;
  }

  const posts = await fetch(url);

  return posts.json();
}

export async function getPostDetails(postId: number): Promise<Post> {
  const postDetails = await fetch(`${URL}posts/${postId}`);

  return postDetails.json();
}

export async function getPostComments(postId: number) {
  const comments = await fetch(`${URL}comments`).then(response => response.json());
  const filteredComments = comments.filter((comment: { postId: number; }) => (
    comment.postId === postId
  ));

  return filteredComments as Comment[];
}

export async function deleteComment(commentId: number) {
  const url = `${URL}comments/${commentId}`;

  return fetch(url, { method: 'DELETE' });
}

export async function addComment(comment: NewComment) {
  return fetch(`${URL}comments`, {
    method: 'POST',
    body: JSON.stringify({ ...comment }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
