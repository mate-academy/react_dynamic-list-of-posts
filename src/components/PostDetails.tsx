/* eslint-disable @typescript-eslint/indent */
import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { deleteComment, getComments } from '../api/comments';
import { wait } from '../utils/fetchClient';
import { Error } from '../types/Error';
import { Comment } from '../types/Comment';

type Props = {
  selectedPost: Post | null;
  commentErrorMessage: Error | '';
  setCommentErrorMessage: (errorMessage: Error | '') => void;
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

  const handleDeleteComment = (currentCommentId: number) => {
    setCommentErrorMessage('');
    setComments(prevComments =>
      prevComments.filter(comment => comment.id !== currentCommentId),
    );

    deleteComment(currentCommentId).catch(error => {
      setComments(comments);
      setCommentErrorMessage(Error.LoadingError);
      throw error;
    });
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            #{selectedPost?.id}: {selectedPost?.title}
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

          {!comments.length && !loadingComments && !commentErrorMessage && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {!loadingComments && comments.length > 0 && !commentErrorMessage && (
            <>
              <p className="title is-4">Comments:</p>
              {comments.map((comment: Comment) => {
                return (
                  <article
                    className="message is-small"
                    data-cy="Comment"
                    key={comment.id}
                  >
                    <div className="message-header">
                      <a
                        href={`mailto:${comment.email}`}
                        data-cy="CommentAuthor"
                      >
                        {comment.name}
                      </a>
                      <button
                        data-cy="CommentDelete"
                        type="button"
                        className="delete is-small"
                        aria-label="delete"
                        onClick={() => handleDeleteComment(comment.id)}
                      >
                        delete button
                      </button>
                    </div>

                    <div className="message-body" data-cy="CommentBody">
                      {comment.body}
                    </div>
                  </article>
                );
              })}
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
