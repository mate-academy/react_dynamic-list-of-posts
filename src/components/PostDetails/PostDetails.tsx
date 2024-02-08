import React, { useContext, useEffect } from 'react';
import { TodosContext } from '../../TodoContext/TodoContext';
import { Loader } from '../Loader';
import { Comment } from '../../types/Comment';
import { NewCommentForm } from '../NewCommentedForm/NewCommentForm';
import { Errors } from '../../types/Errors';
import { deleteComment, getPostComments } from '../../utils/users';

export const PostDetails: React.FC = () => {
  const {
    selectedPost,
    postDetails,
    userPosts,
    postComments,
    setPostComments,
    setAvailNewComment,
    availNewComment,
    loadingComments,
    errorMessage,
    setLoadingComments,
    setErrorMessage,
    selectedUser,
    setPostDetails,
  } = useContext(TodosContext);

  useEffect(() => {
    if (!selectedPost) {
      return;
    }

    if (userPosts) {
      const selectedPostDetails = userPosts
        .find(item => item.id === selectedPost.id);

      if (selectedPostDetails) {
        setPostDetails(selectedPostDetails);
      }
    }
  }, [selectedPost, userPosts, setPostDetails]);

  useEffect(() => {
    if (!postDetails) {
      return;
    }

    setLoadingComments(true);

    getPostComments(postDetails.id)
      .then(comments => setPostComments(comments))
      .catch(() => setErrorMessage(true))
      .finally(() => {
        setLoadingComments(false);
      });
  }, [postDetails,
    selectedUser,
    setErrorMessage,
    setLoadingComments,
    setPostComments]);

  if (!postDetails) {
    return null;
  }

  const handleDeleteComment = (id: number) => {
    const filterComments = postComments.filter(item => item.id !== id);

    const toBeDeleted = postComments.find(item => item.id === id);

    if (toBeDeleted) {
      deleteComment(toBeDeleted.id);
    }

    setPostComments(filterComments);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${postDetails.id}: ${postDetails.title}`}
          </h2>

          <p data-cy="PostBody">
            {postDetails.body}
          </p>
        </div>

        <div className="block">
          <>
            {loadingComments && (
              <Loader />
            )}

            {errorMessage && (
              <div className="notification is-danger" data-cy="CommentsError">
                {Errors.SomethingWrong}
              </div>
            )}

            {(!loadingComments && !errorMessage && postComments
            && postComments.length === 0) && (
              <p className="title is-4" data-cy="NoCommentsMessage">
                {Errors.NoCommentsYet}
              </p>
            )}

            {!loadingComments && !errorMessage
            && postComments && postComments.length > 0 && (
              <>
                <p className="title is-4">Comments:</p>

                {postComments.map((comment: Comment) => {
                  return (
                    <article
                      key={comment.id}
                      className="message is-small"
                      data-cy="Comment"
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
            {!errorMessage && !availNewComment && !loadingComments && (
              <button
                data-cy="WriteCommentButton"
                type="button"
                className="button is-link"
                onClick={() => setAvailNewComment(true)}
              >
                Write a comment
              </button>
            )}
          </>
        </div>

        {!errorMessage && availNewComment && (
          <NewCommentForm />
        )}
      </div>
    </div>
  );
};
