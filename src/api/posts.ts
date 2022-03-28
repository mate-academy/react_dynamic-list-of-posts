const API_SERVER = 'https://mate.academy/students-api';

const getData = async (url: string) => {
  const response = await fetch(API_SERVER + url);

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  return response.json();
};

export const sendData = async (newCommient: string, postId: number) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charsrt=utf-8',
    },
    body: newCommient,
  };

  fetch(`${API_SERVER}/comments?postId=${postId}`, requestOptions);
};

export const getUserPost = (userId: number) => {
  const endPoint = userId === 0
    ? '/posts'
    : `/posts/?userId=${userId}`;

  return getData(endPoint);
};

export const getPostDetails = (postId: number) => {
  return getData(`/posts/${postId}`);
};

export const getPostComments = (postId: number) => {
  return getData(`/comments/?postId=${postId}`);
};
