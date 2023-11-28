import React, { useState } from 'react';
import cn from 'classnames';
import { Post } from '../types/Post';

type Props = {
  post: Post
  setSelectedPost: (number: number) => void
};

export const Button: React.FC<Props> = ({ post, setSelectedPost }) => {
  const [asideShown, setAsideShown] = useState(false);

  return (

    <button
      type="button"
      data-cy="PostButton"
      onClick={() => {
        setAsideShown(!asideShown);
        setSelectedPost(post.id);
      }}
      className={cn('button', 'is-link', {
        asideShown: 'is-light',
      })}
    >
      {asideShown
        ? 'Close'
        : 'Open'}
    </button>
  );
};
