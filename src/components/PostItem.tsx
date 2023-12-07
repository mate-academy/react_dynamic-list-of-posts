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

  const handleSelectedPost = (p: Post) => {
    if (selectedPost && selectedPost.id === p?.id) {
      setSelectedPost(null);
    } else {
      setSelectedPost(p);
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
            'is-light': selectedPost?.id !== id,
          })}
          onClick={() => handleSelectedPost(post)}
        >
          {selectedPost?.id === id ? 'Close' : 'Open'}
        </button>
      </td>
    </tr>
  );
};
