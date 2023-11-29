import React, { useContext } from 'react';

import { Post } from '../types/Post';
import { AppContext } from './Context';

type Props = {
  post: Post,
};

export const Button: React.FC<Props> = ({
  post,
}) => {
  const appContext = useContext(AppContext);

  const { selectedPostId, setSelectedPostId } = appContext;
  const openAside = selectedPostId === post.id;

  return (
    <button
      type="button"
      data-cy="PostButton"
      onClick={() => {
        setSelectedPostId(post.id);
      }}
      className={`button is-link ${!openAside ? 'is-light' : ''}`}
    >
      {openAside
        ? 'Close'
        : 'Open'}
    </button>
  );
};
