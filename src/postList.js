function postList(posts, users, comments) {
  const postListArr = [...posts];

  for (let i = 0; i < postListArr.length; i += 1) {
    postListArr[i].user = users.find(
      user => user.id === postListArr[i].userId
    );
    postListArr[i].comments = [...(
      comments.filter(
        comment => comment.postId === postListArr[i].id
      )
    )];
  }

  return postListArr;
}

export default postList;
