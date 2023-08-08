import React, {
  useCallback, useContext, useEffect, useState,
} from 'react';
import { NewCommentForm } from '../Comment/NewCommentForm';
import { DispatchContext, StateContext } from '../../reducer/store';
import { Loader } from '../Loader';
import { CommentsList } from '../Comment/CommentsList';
import { postService } from '../../services/post.service';
import { Notifications } from '../Notifications/Notifications';

export const PostDetails: React.FC = () => {
  const [showSpinner, setShowSpinner] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false);

  const { selectedPost, commentsList } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const onShowFormHandler = useCallback(() => {
    setShowCommentForm(true);
  }, []);

  const showNoComment = !isError && !commentsList && !showSpinner;
  const showCommentsList = commentsList?.length && !showSpinner;
  const showWriteBtn = !showCommentForm && !showSpinner && !isError;

  useEffect(() => {
    const { setPostComments } = postService(dispatch);

    setPostComments(
      selectedPost,
      setShowSpinner,
      setIsError,
    );

    return () => {
      setIsError(false);
      setShowCommentForm(false);
    };
  }, [selectedPost]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {selectedPost ? `#${selectedPost.id}: ${selectedPost.title}` : ''}
          </h2>

          <p data-cy="PostBody">
            {selectedPost?.body}
          </p>

          {showNoComment && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {isError && <Notifications />}
        </div>

        <div className="block">
          {showSpinner && <Loader />}

          { showCommentsList && <CommentsList comments={commentsList} /> }

          {showWriteBtn && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={onShowFormHandler}
            >
              Write a comment
            </button>
          )}
        </div>

        {showCommentForm && selectedPost
          && <NewCommentForm postId={selectedPost.id} />}
      </div>
    </div>
  );
};
