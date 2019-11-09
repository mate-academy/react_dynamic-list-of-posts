import load from './load';

async function loadConnect(commentsUrl, postsUrl, usersUrl) {
  const comments = await load(commentsUrl);
  const posts = await load(postsUrl);
  const users = await load(usersUrl);
  return posts.map(post =>{
    return {
      ...post,
      user: users.find(user => user.id === post.userId),
      comments: comments.filter(comment => post.id === comment.postId),
    }
  })
}

export default loadConnect;
