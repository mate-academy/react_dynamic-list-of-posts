import React, { useState, useEffect } from 'react';
import { Loader } from '../Loader';
import { NewCommentForm } from '../NewCommentForm';
import { Post } from '../../types/Post';
import { client } from '../../utils/fetchClient';
import { Comment } from '../../types/Comment';
import { CommentsList } from '../CommentsList';
import { ErrorMessage } from '../../types/ErrorMessage';

interface Props {
  post: Post;
  isNewCommentFormActive: boolean;
  setIsNewCommentFormActive: (value: boolean) => void;
}

export const PostDetails: React.FC<Props> = ({
  post,
  isNewCommentFormActive,
  setIsNewCommentFormActive,
}) => {
  const [postComments, setPostComments] = useState<Comment[] | null>(null);
  const [hasCommentsLoadingError, setHasCommentsLoadingError] = useState(false);
  const [isCommentsLOading, setIsCommentsLoading] = useState(false);
  const [isPostCommentsEmpty, setIsPostCommentsEmpty] = useState(false);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage | null>(null);
  // const [isNewCommentFormActive, setIsNewCommentFormActive] = useState(false);

  const showError = (message: ErrorMessage) => {
    setErrorMessage(message);

    setTimeout(() => {
      setErrorMessage(null);
    }, 3000);
  };

  const locallyDeleteComment = (commentId: number) => {
    client.delete(`/comments/${commentId}`)
      .then(() => {
        const updatedComments = postComments?.filter(
          (comment) => comment.id !== commentId,
        );

        if (updatedComments?.length === 0) {
          setIsPostCommentsEmpty(true);
        }

        setPostComments(updatedComments || []);
      })
      .catch(() => setErrorMessage(ErrorMessage.Delete));
  };

  const locallyAddNewComment = (newComment: Comment) => {
    setPostComments(current => {
      return current?.length ? [...current, newComment] : [newComment];
    });
    setIsPostCommentsEmpty(false);
  };

  useEffect(() => {
    setIsPostCommentsEmpty(false);
    setIsCommentsLoading(true);

    client.get<Comment[]>(`/comments?postId=${post.id}`)
      .then(comments => {
        setPostComments(comments);

        if (!comments.length) {
          setIsPostCommentsEmpty(true);
        }
      })
      .catch(() => {
        setHasCommentsLoadingError(true);
        setErrorMessage(ErrorMessage.Get);
      })
      .finally(() => setIsCommentsLoading(false));
  }, [post]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${post.id}: ${post.title}`}
          </h2>

          <p data-cy="PostBody">
            {post.body}
          </p>
        </div>

        <div className="block">
          {isCommentsLOading ? (
            <Loader />
          ) : (
            <>
              {hasCommentsLoadingError && (
                <div className="notification is-danger" data-cy="CommentsError">
                  Something went wrong
                </div>
              )}

              {isPostCommentsEmpty && (
                <p className="title is-4" data-cy="NoCommentsMessage">
                  No comments yet
                </p>
              )}

              {!!postComments?.length && (
                <CommentsList
                  comments={postComments}
                  setCommentIdToDelete={locallyDeleteComment}
                  // setErrorMessage={showError}
                />
              )}

              {(postComments && !isNewCommentFormActive) && (
                <button
                  data-cy="WriteCommentButton"
                  type="button"
                  className="button is-link"
                  onClick={() => setIsNewCommentFormActive(true)}
                >
                  Write a comment
                </button>
              )}

              {errorMessage && (
                <p className="help is-danger">
                  {errorMessage}
                </p>
              )}
            </>
          )}
        </div>

        {isNewCommentFormActive && (
          <NewCommentForm
            postId={post.id}
            setNewComment={locallyAddNewComment}
            setErrorMessage={showError}
          />
        )}
      </div>
    </div>
  );
};
