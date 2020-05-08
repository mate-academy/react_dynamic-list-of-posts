import { Post, User, Comments } from './interfaces';

const postsUrl = 'https://jsonplaceholder.typicode.com/posts';
const usersUrl = 'https://jsonplaceholder.typicode.com/users';
const commentsUrl = 'https://jsonplaceholder.typicode.com/comments';

const getDatas = async (url: string) => {
  const getInfo = await fetch(url);
  const infoToJson = getInfo.json();

  return infoToJson;
};

export const preparedDatas = async () => {
  const posts: Post[] = await getDatas(postsUrl);
  const users: User[] = await getDatas(usersUrl);
  const comments: Comments[] = await getDatas(commentsUrl);

  const finallyDatas = posts.map(post => {
    const user = users.find(ownerPost => ownerPost.id === post.userId);
    const postsComments = comments.filter(comment => comment.postId === post.id);

    return {
      ...post,
      user,
      comments: postsComments,
    };
  });

  return finallyDatas;
};
