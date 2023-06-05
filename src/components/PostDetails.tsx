import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { ErrorMessage } from '../types/ErrorMessage';
import { client } from '../utils/fetchClient';
import { ShowLoader } from '../types/ShowLoader';

type Props = {
  comments: Comment[],
  setComments:(filterComments: Comment[]) => void,
  isProcessing: string,
  setIsProcessing:(string: string) => void,
  activePost: Post,
  setErrorMessage:(message: ErrorMessage) => void,
  errorMessage: ErrorMessage | null,
};

const { DeleteComment, LoadingComments, AddNewComment } = ErrorMessage;

export const PostDetails: React.FC<Props> = ({
  comments,
  isProcessing,
  setComments,
  activePost,
  setIsProcessing,
  setErrorMessage,
  errorMessage,
}) => {
  const [writeCommentButton, setWriteCommentButton] = useState(false);
  const [showError, setShowError] = useState(false);

  const onRemoveComment = (id: number) => {
    client.delete(`/comments/${id}`)
      .catch(() => setErrorMessage(ErrorMessage.DeleteComment));
    setComments(comments.filter(item => item.id !== id));
  };

  useEffect(() => setWriteCommentButton(false), [activePost]);

  useEffect(() => {
    if (errorMessage) {
      setShowError([DeleteComment, AddNewComment, LoadingComments]
        .includes(errorMessage));
    }
  }, [errorMessage]);

  const showWriteCommentButton
    = !isProcessing && !writeCommentButton && !showError;
  const showComments = !showError && isProcessing !== ShowLoader.SideBar;

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${activePost.id}: ${activePost?.title}`}
          </h2>

          <p data-cy="PostBody">
            {activePost.body}
          </p>
        </div>

        <div className="block">
          {isProcessing === ShowLoader.SideBar && <Loader />}

          { showError && errorMessage
          && (
            <div className="notification is-danger" data-cy="CommentsError">
              {errorMessage}
            </div>
          )}

          {showComments && (
            <>
              {!comments.length
                ? (
                  <p className="title is-4" data-cy="NoCommentsMessage">
                    No comments yet
                  </p>
                )
                : (<p className="title is-4">Comments:</p>)}
              {comments?.map(({
                email,
                id,
                name,
                body,
              }) => (
                <article
                  className="message is-small"
                  data-cy="Comment"
                  key={id}
                >
                  <div className="message-header">
                    <a href={`mailto:${email}`} data-cy="CommentAuthor">
                      {name}
                    </a>
                    <button
                      data-cy="CommentDelete"
                      type="button"
                      className="delete is-small"
                      aria-label="delete"
                      onClick={() => onRemoveComment(id)}
                    >
                      delete button
                    </button>
                  </div>

                  <div className="message-body" data-cy="CommentBody">
                    {body}
                  </div>
                </article>
              ))}
            </>
          )}

          {showWriteCommentButton && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setWriteCommentButton(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {writeCommentButton
          && (
            <NewCommentForm
              activePost={activePost}
              onAddComments={(newComment: Comment) => setComments(
                [...comments, newComment],
              )}
              setIsProcessing={setIsProcessing}
              isProcessing={isProcessing}
              setErrorMessage={setErrorMessage}
            />
          )}
      </div>
    </div>
  );
};
