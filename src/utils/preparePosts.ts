import { Post, User, Comment, PreparedPost } from '../interfaces';
import { getData, postsUrl, usersUrl, commentsUrl } from '../API/API';
import { noUser } from '../constants';

export const preparePosts = (posts: Post[], users: User[], comments: Comment[]) => {
  return posts.map(post => {
    const matchedUser = users.find(user => user.id === post.userId) || noUser;
    const matchedComments = comments.filter(comment => comment.postId === post.id);

    return { posts, users: { ...matchedUser }, comments: matchedComments };
  });
};

export const makePosts = async (): Promise<PreparedPost[]> => {
  const posts = await getData<Post>(postsUrl);
  const users = await getData<User>(usersUrl);
  const comments = await getData<Comment>(commentsUrl);

  return preparePosts(posts, users, comments);
}
