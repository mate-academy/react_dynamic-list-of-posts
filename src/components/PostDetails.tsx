/* eslint-disable @typescript-eslint/indent */
import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { getComments } from '../api/comments';
import { wait } from '../utils/fetchClient';
import { Error } from '../types/Error';
import { Comment } from '../types/Comment';
import { PostComments } from './Loader/PostComments';

type Props = {
  selectedPost: Post | null;
  commentErrorMessage: Error | string;
  setCommentErrorMessage: (errorMessage: Error | string) => void;
  loadingComments: boolean;
  setLoadingComments: (loadingComments: boolean) => void;
  isCommentFormVisible: boolean;
  setIsCommentFormVisible: (visible: boolean) => void;
};

export const PostDetails: React.FC<Props> = ({
  selectedPost,
  commentErrorMessage,
  setCommentErrorMessage,
  loadingComments,
  setLoadingComments,
  isCommentFormVisible,
  setIsCommentFormVisible,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const { id, title } = selectedPost || {};
  const noComments =
    !comments.length && !loadingComments && !commentErrorMessage;
  const hasPostComments =
    !loadingComments && comments.length > 0 && !commentErrorMessage;

  useEffect(() => {
    setLoadingComments(true);

    if (selectedPost) {
      getComments(selectedPost.id)
        .then(commentsFromServer => {
          wait(1000);
          setComments(commentsFromServer);
        })
        .catch(() => setCommentErrorMessage(Error.LoadingError))
        .finally(() => setLoadingComments(false));
    }
  }, [selectedPost, setCommentErrorMessage, setLoadingComments]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            #{id}: {title}
          </h2>

          <p data-cy="PostBody">{selectedPost?.body}</p>
        </div>

        <div className="block">
          {loadingComments && <Loader />}

          {commentErrorMessage && (
            <div className="notification is-danger" data-cy="CommentsError">
              {commentErrorMessage}
            </div>
          )}

          {noComments && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {hasPostComments && (
            <>
              <p className="title is-4">Comments:</p>
              <PostComments
                comments={comments}
                setComments={setComments}
                onCommentError={setCommentErrorMessage}
              />
            </>
          )}

          {!loadingComments &&
            !commentErrorMessage &&
            !isCommentFormVisible && (
              <button
                data-cy="WriteCommentButton"
                type="button"
                className="button is-link"
                onClick={() => setIsCommentFormVisible(true)}
              >
                Write a comment
              </button>
            )}
        </div>

        {isCommentFormVisible && (
          <NewCommentForm
            onSetError={setCommentErrorMessage}
            selectedPost={selectedPost}
            comments={comments}
            setComments={setComments}
          />
        )}
      </div>
    </div>
  );
};
