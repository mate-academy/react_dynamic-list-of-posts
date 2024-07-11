import React, { useContext } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { ProvideContext } from './StateContext';
import { removeComments } from '../utils/fetchClient';

export const PostDetails = () => {
  const {
    commentsFromPost,
    setCommentsFromPost,
    errorNotification,
    commentLoading,
    selectedPost,
    showCommentField,
    setShowCommentField,
  } = useContext(ProvideContext);

  const onDeleteComment = (commentId: number) => {
    removeComments(commentId).then(() => {
      const updateComment = commentsFromPost.filter(
        comment => comment.id !== commentId,
      );

      setCommentsFromPost(updateComment);
    });
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${selectedPost?.id}: ${selectedPost?.title}`}
          </h2>

          <p data-cy="PostBody">{selectedPost?.body}</p>
        </div>

        <div className="block">
          {selectedPost && commentLoading && <Loader />}
          {errorNotification !== '' && (
            <div className="notification is-danger" data-cy="CommentsError">
              {errorNotification}
            </div>
          )}
          {commentsFromPost.length === 0 && !commentLoading && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}
          {commentsFromPost.length !== 0 && !commentLoading && (
            <p className="title is-4">Comments:</p>
          )}
          {!commentLoading &&
            commentsFromPost.map(comment => (
              <article
                className="message is-small"
                data-cy="Comment"
                key={comment.id}
              >
                <div className="message-header">
                  <a href="mailto:misha@mate.academy" data-cy="CommentAuthor">
                    {comment.name}
                  </a>

                  <button
                    data-cy="CommentDelete"
                    type="button"
                    className="delete is-small"
                    aria-label="delete"
                    onClick={() => onDeleteComment(comment.id)}
                  >
                    delete button
                  </button>
                </div>

                <div className="message-body" data-cy="CommentBody">
                  {comment.body}
                </div>
              </article>
            ))}
          {!showCommentField && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setShowCommentField(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {showCommentField && <NewCommentForm />}
      </div>
    </div>
  );
};
