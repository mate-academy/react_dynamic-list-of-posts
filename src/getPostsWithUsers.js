function getPostsWithUsers(postList, userList) {
  return postList.map(
    post => ({
      ...post,
      user: userList.find(user => user.id === post.userId),
    })
  );
}

export default getPostsWithUsers;
