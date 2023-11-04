import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { Post } from '../../types/Post';

type Props = {
  post: Post,
  selectedPost: Post | null,
  setSelectedPost: (post: Post | null) => void,
};

export const UserPost: React.FC<Props> = ({
  post,
  selectedPost,
  setSelectedPost,
}) => {
  const { id, title } = post;
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    if (selectedPost?.id !== id) {
      setIsClicked(false);
    }
  }, [selectedPost]);

  const handleBtnClick = () => {
    if (isClicked) {
      setSelectedPost(null);
    } else {
      setSelectedPost(post);
    }

    setIsClicked(!isClicked);
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
          className={cn(
            'button',
            'is-link ',
            {
              'is-light': !isClicked,
            },
          )}
          onClick={handleBtnClick}
        >
          {`${!isClicked ? 'Open' : 'Close'}`}
        </button>
      </td>
    </tr>
  );
};
