import React from 'react';
import { getUser, getPost, getComments } from '../api';

const LoadButton: React.FC<ButtonProps> = ({ beforeLoaded, afterLoaded }) => {
  const getPostsHandler = async () => {
    beforeLoaded();
    const posts: Posts[] = await getPost();
    const users: Users[] = await getUser();
    const comments: Comments[] = await getComments();

    const getUserById = (post: Posts) => users.find(user => user.id === post.userId);
    const getCommentsById = (post: Posts) => comments.filter(comment => comment.postId === post.id);

    const list: PreparedProps[] = posts.map(post => {
      return {
        id: post.id,
        title: post.title,
        body: post.body,
        user: {
          name: getUserById(post)?.name,
          email: getUserById(post)?.email,
          street: getUserById(post)?.address.street,
        },
        comments: getCommentsById(post),
      };
    });

    afterLoaded(list);
  };

  return (
    <div>
      <button
        className="load__button"
        type="button"
        onClick={getPostsHandler}
      >
        Load
      </button>
    </div>
  );
};

export default LoadButton;
