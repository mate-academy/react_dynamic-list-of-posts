import React from 'react';
import { Post } from '../types/Post';
import classNames from 'classnames';

type Props = {
  post: Post;
  currentPost: Post | null;
  setCurrentPost: (post: Post | null) => void;
  setIsShowForm: (value: boolean) => void;
};

const PostItem: React.FC<Props> = ({
  post,
  currentPost,
  setCurrentPost,
  setIsShowForm,
}) => {
  const isSelected = post.id === currentPost?.id;
  const buttonText = isSelected ? 'Close' : 'Open';

  const handleSelectPost = () => {
    if (isSelected) {
      setCurrentPost(null);
    } else {
      setCurrentPost(post);
    }

    setIsShowForm(false);
  };

  return (
    <tr data-cy="Post">
      <td data-cy="PostId">{post.id}</td>

      <td data-cy="PostTitle">{post.title}</td>

      <td className="has-text-right is-vcentered">
        <button
          type="button"
          data-cy="PostButton"
          className={classNames('button is-link', {
            'is-light': !isSelected,
          })}
          onClick={handleSelectPost}
        >
          {buttonText}
        </button>
      </td>
    </tr>
  );
};

export default PostItem;
