import {
  FC, useContext, useMemo, useState, useEffect,
} from 'react';
import { CommentsContext } from '../../../../CommentsProvider';
import { Loader } from '../../../../Loader';
import { NewCommentForm } from '../../../../NewCommentForm';
import { PostsError } from '../../../PostsError';
import { PostComments } from './PostComments';
import { PostHeader } from './PostHeader';

export const PostDetails: FC = () => {
  const { comments, isLoading, isError } = useContext(CommentsContext);
  const [hasButton, setHasButton] = useState(true);
  const isNoComments = useMemo(
    () => comments?.length === 0 && !isLoading, [comments, isLoading],
  );
  const isComments = useMemo(
    () => comments?.length !== 0 && !isLoading, [comments, isLoading],
  );
  const isButton = useMemo(
    () => hasButton && comments && !isLoading, [hasButton, isLoading],
  );
  const isForm = useMemo(
    () => !hasButton && !isLoading, [hasButton, isLoading],
  );

  const handleFormShow = () => {
    setHasButton(false);
  };

  useEffect(() => {
    setHasButton(true);
  }, [comments]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <PostHeader />

        <div className="block">
          {isLoading && <Loader />}

          {isError && (
            <PostsError
              className="notification is-danger"
              data-cy="CommentsError"
            >
              Something went wrong!
            </PostsError>
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
};
