import React, { Dispatch, useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';

type Props = {
  userComments: Comment[];
  isCommentsLoading: boolean;
  removeComments: (value: number) => void;
  setUserComments: Dispatch<React.SetStateAction<Comment[]>>;
  isOpenComment: number | null;
  isErrorComment: boolean,
  setIsErrorComment: (value: boolean) => void,
  userPostElement: Post | null,
};

export const PostDetails: React.FC<Props> = ({
  userComments,
  isCommentsLoading,
  removeComments,
  setUserComments,
  isOpenComment,
  isErrorComment,
  setIsErrorComment,
  userPostElement,
}) => {
  const [isButtonComment, setIsButtonComment] = useState(false);

  useEffect(() => {
    setIsButtonComment(false);
    setIsErrorComment(false);
  }, [isOpenComment, setIsErrorComment]);
  const handleClickButtonWriteComment = () => {
    setIsButtonComment(!isButtonComment);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${userPostElement?.id} ${userPostElement?.title}`}</h2>
        <p data-cy="PostBody">{userPostElement?.body}</p>
      </div>

      <div className="block">
        {isCommentsLoading && <Loader />}

        {isErrorComment ? (
          <div
            className="notification is-danger"
            data-cy="PostsLoadingError"
          >
            Something went wrong!
          </div>

        ) : (
          <>
            {!isCommentsLoading && (
              <>
                {userComments.length > 0 ? (
                  <p className="title is-4">Comments:</p>
                ) : (
                  <p className="title is-4" data-cy="NoCommentsMessage">
                    No comments yet
                  </p>
                )}

                {userComments.map((comment) => (
                  <article
                    key={comment.id}
                    className="message is-small"
                    data-cy="Comment"
                  >
                    {!isCommentsLoading && (
                      <>
                        <div className="message-header">
                          <a href={`mailto:${comment.email}`} data-cy="CommentAuthor">
                            {comment.name}
                          </a>
                          <button
                            data-cy="CommentDelete"
                            type="button"
                            className="delete is-small"
                            aria-label="delete"
                            onClick={() => removeComments(comment.id)}
                          >
                            delete button
                          </button>
                        </div>

                        <div className="message-body" data-cy="CommentBody">
                          {comment.body}
                        </div>
                      </>
                    )}
                  </article>
                ))}
              </>
            )}

            {isButtonComment ? (
              <NewCommentForm
                setUserComments={setUserComments}
                setIsErrorComment={setIsErrorComment}
                isOpenComment={isOpenComment}
              />
            ) : (
              !isCommentsLoading && (
                <button
                  data-cy="WriteCommentButton"
                  type="button"
                  className="button is-link"
                  onClick={() => handleClickButtonWriteComment()}
                >
                  Write a comment
                </button>
              )
            )}
          </>
        )}
      </div>
    </div>
  );
};
