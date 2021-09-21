/* eslint-disable no-console */
const handleRequest = async (ending?: string) => {
  let response;

  if (ending) {
    response = await fetch(`https://mate.academy/students-api/posts${ending}`);
  } else {
    response = await fetch('https://mate.academy/students-api/posts');
  }

  if (!response.ok) {
    throw new Error('Error: invalid server');
  }

  return response.json();
};

export const getUserPosts = async (userId?: string) => {
  if (Number(userId)) {
    const ending = `?userId=${userId}`;

    return handleRequest(ending);
  }

  return handleRequest();
};

export const getPostDetails = async (userId?: number) => {
  const ending = `/${userId}`;

  return handleRequest(ending);
};
