import { BASE_URL } from './api';

type CommentId = { id: number };
type CommentBody = unknown & CommentData;

const COMMENTS_URL = `${BASE_URL}/comments`;

const serializeComment = (obj: CommentBody): CommentData => ({
  id: obj.id,
  body: obj.body,
});

export const getPostComments = async (postId: number): Promise<CommentData[]> => {
  const body: CommentBody[] = await fetch(`${COMMENTS_URL}?postId=${postId}`)
    .then(res => res.json());

  return body.map(serializeComment);
};

export const addComment = async (comment: CommentResponse): Promise<number> => {
  const body = await fetch(COMMENTS_URL, {
    method: 'POST',
    headers: { 'content-type': 'aplication/json; charset=utf-8' },
    body: JSON.stringify(comment),
  }).then(res => res.json());

  const idContainer = body as CommentId;

  return idContainer.id;
};

export const deleteComment = async (id: number): Promise<void> => {
  await fetch(`${COMMENTS_URL}/${id}`, { method: 'DELETE' });
};
