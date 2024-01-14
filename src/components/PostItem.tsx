import React, { useContext } from 'react';
import classNames from 'classnames';
import { Post } from '../types/Post';
import { PostContext } from '../store/PostContext';

type Props = {
  post: Post;
};

export const PostItem: React.FC<Props> = ({ post }) => {
  const { id, title } = post;
  const { selectedPost, setSelectedPost } = useContext(PostContext);

  const handleClick = () => {
    if (!selectedPost) {
      setSelectedPost(post);
    } else if (selectedPost.id === id) {
      setSelectedPost(null);
    } else {
      setSelectedPost(post);
    }
  };

  return (
    <tr data-cy="Post">
      <td data-cy="PostId">{id}</td>

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
          onClick={handleClick}
        >
          {selectedPost?.id === id ? 'Close' : 'Open'}
        </button>
      </td>
    </tr>
  );
};
