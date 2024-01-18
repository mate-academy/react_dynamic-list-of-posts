import React, { useCallback, useContext } from 'react';
import classNames from 'classnames';

import { DispatchContext, StateContext } from '../../Store';

import { getComments } from '../../api/comments';

import { Post } from '../../types/Post';
import { Error } from '../../types/Error';

type Props = {
  post: Post;
};

export const PostItem: React.FC<Props> = ({ post }) => {
  const dispatch = useContext(DispatchContext);
  const { selectedPost } = useContext(StateContext);
  const { id, title } = post;

  const isOpenSidebar = useCallback(() => (
    selectedPost?.id === post.id
  ), [selectedPost, post]);

  const handleLoadCommentsError = useCallback(() => {
    dispatch({ type: 'setError', payload: Error.LoadPostDetails });
    setTimeout(() => {
      dispatch({ type: 'setError', payload: '' });
    }, 3000);
  }, [dispatch]);

  const togglePostButton = useCallback(async () => {
    dispatch({ type: 'setIsOpenForm', payload: false });

    if (selectedPost?.id === post.id) {
      dispatch({ type: 'setSelectedPost', payload: null });
      dispatch({ type: 'setComments', payload: [] });

      return;
    }

    dispatch({ type: 'setSelectedPost', payload: post });
    dispatch({ type: 'setIsLoadingComments', payload: true });

    try {
      const commentsFromServer = await getComments(post.id);

      dispatch({ type: 'setComments', payload: commentsFromServer });
    } catch (error) {
      handleLoadCommentsError();
    } finally {
      dispatch({ type: 'setIsLoadingComments', payload: false });
    }
  }, [selectedPost, post, dispatch, handleLoadCommentsError]);

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
          className={classNames(
            'button',
            'is-link',
            { 'is-light': !isOpenSidebar() },
          )}
          onClick={togglePostButton}
        >
          {isOpenSidebar() ? 'Close' : 'Open'}
        </button>
      </td>
    </tr>
  );
};
