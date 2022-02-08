const BASE_URL = 'https://mate.academy/students-api';

// export async function getPosts(userId: number) {
//   const response = await fetch(`${BASE_URL}${userId}`);

//   return response.json();
// }

export const loadUsersPosts = async (): Promise<Post[]> => {
  const response = await fetch(`${BASE_URL}/posts`);

  return response.json();
};

export const loadUserPostDetails = async (postId = 0) => {
  const response = await fetch(`${BASE_URL}/posts/${postId}`);

  return response.json();
};

export const loadUserComments = async (postId: number) => {
  const response = await fetch(`${BASE_URL}/comments?postId=${postId}`);

  return response.json();
};

export const deleteCommnt = async (id: number) => {
  const del = await fetch(`${BASE_URL}/comments/${id}`, {
    method: 'DELETE',
  });

  return del.json();
};

export const getComments = async () => {
  const comm = await fetch(`${BASE_URL}/comments`);

  return comm.json();
};

export const addComm = async (
  postId: number,
  name: string,
  email: string,
  body: string,
): Promise<PostComm> => {
  const response = await fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      postId,
      name,
      email,
      body,
    }),
  });

  return response.json();
};
