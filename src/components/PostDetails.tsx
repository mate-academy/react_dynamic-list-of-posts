import React, { useContext } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { PostsContext } from '../PostsContext';
import { deleteComment } from '../api/comments';
import { Comment } from '../types';

export const PostDetails: React.FC = () => {
  const {
    selectedPost,
    areCommentsLoading,
    isCommentsLoadingError,
    comments,
    setComments,
    isWritingComment,
    setIsWritingComment,
  } = useContext(PostsContext);

  const isNoComments = selectedPost
    && !areCommentsLoading
    && !isCommentsLoadingError
    && comments.length === 0;

  const isNewCommentBtn = !areCommentsLoading
    && !isWritingComment
    && !isCommentsLoadingError;

  const handleCommentDelete = (comment: Comment) => {
    const prevComments = comments;

    setComments(currComments => currComments.filter(
      item => item.id !== comment.id,
    ));

    deleteComment(comment.id)
      .catch(() => {
        setComments(prevComments);
      });
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${selectedPost?.id}: ${selectedPost?.title}`}
          </h2>

          <p data-cy="PostBody">
            {selectedPost?.body}
          </p>
        </div>

        <div className="block">
          {areCommentsLoading && <Loader />}

          {isCommentsLoadingError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {isNoComments && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {comments.length > 0 && (
            <>
              <p className="title is-4">Comments:</p>

              {comments.map(comment => (
                <article
                  key={comment.id}
                  className="message is-small"
                  data-cy="Comment"
                >
                  <div className="message-header">
                    <a href={`mailto:${comment.email}`} data-cy="CommentAuthor">
                      {comment.name}
                    </a>
                    <button
                      data-cy="CommentDelete"
                      type="button"
                      className="delete is-small"
                      aria-label="delete"
                      onClick={() => handleCommentDelete(comment)}
                    >
                      delete button
                    </button>
                  </div>

                  <div className="message-body" data-cy="CommentBody">
                    {comment.body}
                  </div>
                </article>
              ))}
            </>
          )}

          {isNewCommentBtn && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsWritingComment(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {isWritingComment && <NewCommentForm />}
      </div>
    </div>
  );
};
