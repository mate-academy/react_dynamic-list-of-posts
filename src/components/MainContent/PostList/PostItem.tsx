import React, { useContext } from 'react';
import { Post } from '../../../types/Post';
import classNames from 'classnames';
import {
  ActivePostContext,
  CommentFormContext,
  CommentListContext,
  ErrorsContext,
  LoaderContext,
} from '../../../utils/Store';
import { getComments } from '../../../utils/fetchFunctions';
import { ErrorTypes } from '../../../types/ErrorTypes';

interface PostItemProps {
  post: Post;
}

export const PostItem: React.FC<PostItemProps> = ({ post }) => {
  const { activePost, setActivePost } = useContext(ActivePostContext);
  const { setIsLoading } = useContext(LoaderContext);
  const { setComments } = useContext(CommentListContext);
  const { setIsError } = useContext(ErrorsContext);
  const { setIsActiveForm } = useContext(CommentFormContext);

  function handleOpenButtonClick() {
    if (activePost?.id !== post.id) {
      setActivePost(post);
    } else {
      return setActivePost(null);
    }

    setIsError(null);
    setComments([]);
    setIsLoading(true);
    setIsActiveForm(false);

    getComments(post.id)
      .then(res => setComments(res))
      .catch(() => {
        setIsError(ErrorTypes.Comment);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <tr data-cy="Post">
      <td data-cy="PostId">{post.id}</td>

      <td data-cy="PostTitle">{post.title}</td>

      <td className="has-text-right is-vcentered">
        <button
          type="button"
          data-cy="PostButton"
          className={classNames('button is-link', {
            'is-light': activePost?.id !== post.id,
          })}
          onClick={() => handleOpenButtonClick()}
        >
          {activePost?.id === post.id ? 'Close' : 'Open'}
        </button>
      </td>
    </tr>
  );
};
