function getPostWithComments(postList, commentsList) {
  return postList.map(post => ({
    ...post,
    comments: commentsList.filter(comment => comment.postId === post.id),
  }));
}

export default getPostWithComments;
