export const getPostComments = async (postId: number) => {
  const response = await fetch(`https://mate.academy/students-api/comments?postId=${postId}`);

  return response.json();
};
