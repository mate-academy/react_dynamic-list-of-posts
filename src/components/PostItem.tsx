import React, { useContext } from 'react';
import classNames from 'classnames';
import { Post } from '../types/Post';
import { DispatchContext, StateContext } from '../PostsContext';
import { ReducerType } from '../types/ReducerType';

interface Props {
  post: Post
}

export const PostItem: React.FC<Props> = ({ post }) => {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const isOpenedPost = state.post?.id === post.id;

  const handleButtonClick = () => {
    if (isOpenedPost) {
      dispatch({
        type: ReducerType.SetPost,
        payload: null,
      });
    } else {
      dispatch({
        type: ReducerType.SetPost,
        payload: post,
      });
    }
  };

  return (
    <tr data-cy="Post">
      <td data-cy="PostId">
        {post.id}
      </td>

      <td data-cy="PostTitle">
        {post.title}
      </td>

      <td className="has-text-right is-vcentered">
        <button
          type="button"
          data-cy="PostButton"
          className={classNames('button is-link', {
            'is-light': isOpenedPost,
          })}
          onClick={handleButtonClick}
        >
          {isOpenedPost ? 'Close' : 'Open'}
        </button>
      </td>
    </tr>
  );
};
