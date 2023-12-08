import React, { useContext } from 'react';
import classNames from 'classnames';
import { Post } from '../types/Post';
import { GlobalContext } from '../GlobalContext';

type Props = {
  post: Post,
};

export const PostItem: React.FC<Props> = ({ post }) => {
  const {
    selectedPost,
    setSelectedPost,
    setIsErrorComments,
  } = useContext(GlobalContext);

  const { id, title } = post;
  const activePost = selectedPost?.id !== id;

  const handleSelectedPost = (clickedPost: Post) => {
    if (selectedPost && selectedPost.id === clickedPost?.id) {
      setSelectedPost(null);
    } else {
      setSelectedPost(clickedPost);
      setIsErrorComments(false);
    }
  };

  return (
    <tr data-cy="Post">
      <td data-cy="PostId">
        {id}
      </td>

      <td data-cy="PostTitle">
        {title}
      </td>

      <td className="has-text-right is-vcentered">
        <button
          type="button"
          data-cy="PostButton"
          className={classNames('button is-link', {
            'is-light': activePost,
          })}
          onClick={() => handleSelectedPost(post)}
        >
          {activePost ? 'Open' : 'Close'}
        </button>
      </td>
    </tr>
  );
};
