import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import {
  deleteCommentFromServer,
  getCommentsFromServer,
} from '../api/comments';
import { Comment } from '../types/Comment';
import { ErrorType } from '../types/ErrorType';

type Props = {
  selectedPost: Post | null,
};

export const PostDetails: React.FC<Props> = ({
  selectedPost,
}) => {
  const [postComments, setPostComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isWriteComment, setIsWriteComment] = useState(false);
  const [typeOfError, setTypeOfError] = useState<ErrorType>(ErrorType.None);

  useEffect(() => {
    setTypeOfError(ErrorType.None);
    if (selectedPost) {
      setIsLoading(true);
      getCommentsFromServer(selectedPost.id)
        .then(commentsFromServer => {
          setPostComments(commentsFromServer);
        })
        .catch(() => {
          setPostComments([]);
          setTypeOfError(ErrorType.General);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }

    return () => {
      setIsWriteComment(false);
    };
  }, [selectedPost]);

  if (!selectedPost) {
    return <div>No post selected</div>;
  }

  const handleDeletePostBtn = async (postId: number) => {
    try {
      deleteCommentFromServer(postId);
      setPostComments(postComments.filter(postComment => (
        postComment.id !== postId
      )));
    } catch (error) {
      setTypeOfError(ErrorType.General);
    }
  };

  const handleWriteComments = () => {
    setIsWriteComment(true);
  };

  return (
    <div className="content" data-cy="PostDetails">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="content" data-cy="PostDetails">
          <div className="block">
            <h2 data-cy="PostTitle">
              {selectedPost.title}
            </h2>

            <p data-cy="PostBody">
              {selectedPost.body}
            </p>
          </div>

          <div className="block">

            {typeOfError && (
              <div className="notification is-danger" data-cy="CommentsError">
                Something went wrong
              </div>
            )}

            {!postComments.length && !typeOfError && (
              <p className="title is-4" data-cy="NoCommentsMessage">
                No comments yet
              </p>
            ) }

            {postComments.length ? (
              <p className="title is-4">Comments:</p>
            ) : (
              ''
            )}

            {/* {isLoading && <Loader />} */}
            {postComments.map(postComment => (
              <article className="message is-small" data-cy="Comment">
                <div className="message-header">
                  <a
                    href={`mailto:${postComment.email}`}
                    data-cy="CommentAuthor"
                  >
                    {postComment.name}
                  </a>
                  <button
                    data-cy="CommentDelete"
                    type="button"
                    className="delete is-small"
                    aria-label="delete"
                    onClick={() => handleDeletePostBtn(postComment.id)}
                  >
                    delete button
                  </button>
                </div>

                <div className="message-body" data-cy="CommentBody">
                  {postComment.body}
                </div>
              </article>
            ))}

            {!isWriteComment && (
              <button
                data-cy="WriteCommentButton"
                type="button"
                className="button is-link"
                onClick={handleWriteComments}
              >
                Write a comment
              </button>
            )}
          </div>

          {isWriteComment && (
            <NewCommentForm
              postId={selectedPost.id}
              updatePostComments={setPostComments}
              updateErrorStatus={setTypeOfError}
            />
          )}
        </div>
      )}
    </div>
  );
};
