import React, { useContext, useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { PostsAppContext } from './AppContext';
import { getPostComments } from '../utils/apiHandler';
import { ErrorType } from './AppContext';
import { Comment } from '../types/Comment';
import { deleteComment } from '../utils/apiHandler';

export const PostDetails: React.FC = () => {
  const {
    selectedPost,
    isLoadingComments,
    setIsLoadingComments,
    errorType,
    setErrorType,
    isCommentFormEnabled,
    setIsCommentFormEnabled,
  } = useContext(PostsAppContext);

  const [postComments, setPostComments] = useState<null | Comment[]>(null);
  const noCommentsCheck =
    !isLoadingComments &&
    !postComments?.length &&
    errorType === ErrorType.noError;

  useEffect(() => {
    setPostComments(null);
    setIsLoadingComments(true);
    setErrorType(ErrorType.noError);

    if (selectedPost) {
      getPostComments(selectedPost.id)
        .then(comments => setPostComments(comments))
        .catch(() => {
          setErrorType(ErrorType.loadingComments);
        })
        .finally(() => setIsLoadingComments(false));
    } else {
      setPostComments(null);
    }
  }, [selectedPost, setErrorType, setIsLoadingComments]);

  const handleCommentDelete = (commentId: number) => {
    if (postComments) {
      setPostComments(postComments.filter(comment => comment.id !== commentId));

      deleteComment(commentId);
    }
  };

  if (selectedPost) {
    const { id, title, body } = selectedPost;

    return (
      <div className="content" data-cy="PostDetails">
        <div className="content" data-cy="PostDetails">
          <div className="block">
            <h2 data-cy="PostTitle">
              #{id}: {title}
            </h2>

            <p data-cy="PostBody">{body}</p>
          </div>

          <div className="block">
            {isLoadingComments && selectedPost && <Loader />}

            {!isLoadingComments && errorType === ErrorType.loadingComments && (
              <div className="notification is-danger" data-cy="CommentsError">
                Something went wrong
              </div>
            )}

            {noCommentsCheck ? (
              <p className="title is-4" data-cy="NoCommentsMessage">
                No comments yet
              </p>
            ) : (
              <>
                {!!postComments?.length && (
                  <p className="title is-4">Comments:</p>
                )}

                {!!postComments?.length &&
                  postComments.map(comment => {
                    const { name, email } = comment;

                    return (
                      <article
                        className="message is-small"
                        data-cy="Comment"
                        key={comment.id}
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
                            onClick={() => handleCommentDelete(comment.id)}
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

            {isCommentFormEnabled ? (
              <NewCommentForm
                postComments={postComments}
                setPostComments={setPostComments}
              />
            ) : (
              !isLoadingComments &&
              errorType === ErrorType.noError && (
                <button
                  data-cy="WriteCommentButton"
                  type="button"
                  className="button is-link"
                  onClick={() => setIsCommentFormEnabled(true)}
                >
                  Write a comment
                </button>
              )
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return;
  }
};
