import { useCallback, useContext } from 'react';
import classNames from 'classnames';

import { Post } from '../../libs/types';
import { DispatchContext, StateContext } from '../../store';
import { ButtonTitles } from '../../libs/enums';
import { actions } from '../../libs/actions/actions';
import { loadComments } from '../../api/comments';

type Props = {
  post: Post,
};

export const PostsListItem: React.FC<Props> = ({ post }) => {
  const { id, title } = post;

  const {
    posts: { selectedPost },
  } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const isPostSelected = selectedPost?.id === id;
  const buttonTitle = isPostSelected
    ? ButtonTitles.Close
    : ButtonTitles.Open;

  const handleSelectPost = useCallback(() => {
    actions.deselectPost(dispatch);
    actions.resetComments(dispatch);
    actions.hideAddCommentsForm(dispatch);

    if (isPostSelected) {
      return;
    }

    actions.selectPost(dispatch, post);

    actions.hideErrorMessage(dispatch);
    actions.showLoader(dispatch);

    loadComments(id)
      .then((response) => {
        actions.loadComments(dispatch, response);
      })
      .catch(() => {
        actions.showErrorMessage(dispatch);
      })
      .finally(() => {
        actions.hideLoader(dispatch);
      });
  }, [dispatch, id, isPostSelected, post]);

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
            'is-light': !isPostSelected,
          })}
          onClick={handleSelectPost}
        >
          {buttonTitle}
        </button>
      </td>
    </tr>
  );
};
