export const getUserPosts = async (userId: number) => {
  const response = await fetch(`https://mate.academy/students-api/posts?userId=${userId}`);

  return response.json();
};

export const getPosts = async () => {
  const response = await fetch('https://mate.academy/students-api/posts');

  return response.json();
};

export const getPostDetails = async (postId:number) => {
  const response = await fetch(`https://mate.academy/students-api/posts/${postId}`);

  return response.json();
};
