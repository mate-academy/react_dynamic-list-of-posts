import React, { useContext } from 'react';
import { DispatchContext, StateContext } from '../context/GlobalPostsProvider';
import classNames from 'classnames';
import { PostType } from '../types/PostType';

interface Props {
  post: PostType;
};

export const Post: React.FC<Props> = ({ post }) => {
  const { id, title } = post;
  const { isOpenPostBody, choosedPost } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const closeCondition = isOpenPostBody && choosedPost?.id === id;

  const handleTogglePostBody = () => {
    if (closeCondition) {
      dispatch({ type: 'isOpenPostBody', isOpenPostBody: false });
      dispatch({ type: 'setCommentsFetchError', commentsFetchError: false });
    } else {
      dispatch({ type: 'isOpenNewCommentForm', isOpenNewCommentForm: false });
      dispatch({ type: 'isWriteButtonHidden', isWriteButtonHidden: true });
      dispatch({ type: 'isOpenPostBody', isOpenPostBody: true });
      dispatch({ type: 'choosedPost', choosedPost: post });
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
          className={classNames(
            'button is-link',
            { 'is-light': !closeCondition }

          )}
          onClick={handleTogglePostBody}
        >
          {closeCondition ? 'Close' : 'Open'}
        </button>
      </td>
    </tr>
  );
};
