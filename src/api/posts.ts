import { BASE_URL } from './api';

type PostBody = unknown & Post;
type PostDetailsBody = unknown & PostDetails;

const POSTS_URL = `${BASE_URL}/posts`;

const serializePost = (obj: PostBody): Post => ({
  id: obj.id,
  userId: obj.userId,
  title: obj.title,
});

const serializePostDetails = (obj: PostDetails): PostDetails => ({
  id: obj.id,
  body: obj.body,
});

export const getUserPosts = async (userId?: number): Promise<Post[]> => {
  const body: PostBody[] = await fetch(POSTS_URL + (userId ? `?userId=${userId}` : ''))
    .then(res => res.json());

  return body.map(serializePost);
};

export const getPostDetails = async (postId: number): Promise<PostDetails> => {
  const body: PostDetailsBody = await fetch(`${POSTS_URL}/${postId}`)
    .then(res => res.json());

  return serializePostDetails(body);
};
