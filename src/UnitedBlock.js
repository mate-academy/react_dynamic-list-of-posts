const UnitedBlock = (posts, users, comments) => (
  posts.map(post => ({
    ...post,
    user: users.find(user => user.id === post.userId),
    comments: comments.filter(commentId => commentId.postId === post.id),
  })));

export default UnitedBlock;
