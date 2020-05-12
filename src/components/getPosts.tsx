import { Post, User, Comments } from './interfaces';

const getDatas = async (url: string) => {
  const getInfo = await fetch(`./api/${url}.json`);
  const infoToJson = getInfo.json();

  return infoToJson;
};

export const preparedDatas = async () => {
  const [posts, users, comments] = await Promise.all([
    getDatas('posts'),
    getDatas('users'),
    getDatas('comments'),
  ]);

  const finallyDatas = posts.map((post: Post) => {
    const user = users.find((ownerPost: User) => ownerPost.id === post.userId);
    const postsComments = comments.filter((comment: Comments) => comment.postId === post.id);

    return {
      ...post,
      user,
      comments: postsComments,
    };
  });

  return finallyDatas;
};
