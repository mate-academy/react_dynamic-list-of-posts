import {
  FC,
  useState,
  useEffect,
  useCallback,
  useContext,
  useMemo,
  memo,
} from 'react';

import { CommentsContext } from '../../../context/CommentsContext';
import { Loader } from '../../Loader';
import { NewCommentForm } from '../../NewCommentForm';
import { PostsContext } from '../../../context/PostsContext';
import { PostComments } from '../PostComments';

export const PostDetails: FC = memo(() => {
  const {
    comments,
    hasError,
    isLoading,
  } = useContext(CommentsContext);

  const { selectedPost } = useContext(PostsContext);
  const [hasButton, setHasButton] = useState(true);

  const isNoComments = useMemo(
    () => comments?.length === 0 && !isLoading,
    [comments, isLoading],
  );

  const isComments = useMemo(
    () => comments?.length !== 0 && !isLoading,
    [comments, isLoading],
  );

  const isButton = useMemo(
    () => hasButton && !isLoading,
    [hasButton, isLoading],
  );

  const isForm = useMemo(
    () => !hasButton && !isLoading,
    [hasButton, isLoading],
  );

  const handleFormShow = useCallback(() => (
    setHasButton(false)
  ), []);

  useEffect(() => (
    setHasButton(true)
  ), []);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {selectedPost
              ? `#${selectedPost.id}: ${selectedPost.title}`
              : ''}
          </h2>

          <p data-cy="PostBody">
            {selectedPost?.body}
          </p>
        </div>

        <div className="block">
          {isLoading && <Loader />}

          {hasError && (
            <div
              className="notification is-danger"
              data-cy="CommentsError"
            >
              Something went wrong!
            </div>
          )}

          {isNoComments && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {isComments && <PostComments />}

          {isButton && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={handleFormShow}
            >
              Write a comment
            </button>
          )}
        </div>

        {isForm && <NewCommentForm />}
      </div>
    </div>
  );
});
