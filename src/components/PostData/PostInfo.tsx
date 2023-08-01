import React, { useCallback, useContext } from 'react';
import classNames from 'classnames';
import { Post } from '../../types/Post';
import {
  ActionTypes,
  DispatchContext,
  StateContext,
} from '../../reducer/store';

type Props = {
  post: Post
};

export const PostInfo: React.FC<Props> = ({ post }) => {
  const dispatch = useContext(DispatchContext);
  const { selectedPost } = useContext(StateContext);
  const isPostChosen = selectedPost?.id === post.id;

  const onClickHandler = useCallback(() => {
    if (isPostChosen) {
      dispatch({ type: ActionTypes.selectPost, post: null });

      return;
    }

    dispatch({ type: ActionTypes.selectPost, post });
  }, [post, isPostChosen]);

  return (
    <tr data-cy="Post">
      <td data-cy="PostId">{post.id}</td>

      <td data-cy="PostTitle">
        {post.title}
      </td>

      <td className="has-text-right is-vcentered">
        <button
          type="button"
          data-cy="PostButton"
          className={classNames(
            'button is-link',
            { 'is-light': !isPostChosen },
          )}
          onClick={onClickHandler}
        >
          {isPostChosen ? 'Close' : 'Open'}
        </button>
      </td>
    </tr>
  );
};
