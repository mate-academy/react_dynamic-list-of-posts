import React from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { usePosts } from '../context/PostContext';
import { Errors } from '../types/Errors';
import { deleteComment } from '../api/comments';

export const PostDetails: React.FC = () => {
  const {
    post,
    loadingComments,
    errorMessage,
    postComments,
    setNewComment,
    newCommentShown,
    setNewCommentShown,
  } = usePosts();

  if (!post) {
    return null;
  }

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
          {loadingComments && (
            <Loader />
          )}

          {!loadingComments && errorMessage && (
            <div className="notification is-danger" data-cy="CommentsError">
              {Errors.SomethingWrong}
            </div>
          )}

          {(!loadingComments
          && !errorMessage
          && !postComments.length) && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              {Errors.NoCommentsYet}
            </p>
          )}

          <p className="title is-4">Comments:</p>

          {postComments.map(comment => (
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
                  onClick={() => {
                    deleteComment(comment.id);
                    setNewComment(true);
                  }}
                >
                  delete button
                </button>
              </div>

              <div className="message-body" data-cy="CommentBody">
                {comment.body}
              </div>
            </article>
          ))}

          {(!loadingComments
          && !errorMessage
          && newCommentShown) && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setNewCommentShown(!newCommentShown)}
            >
              Write a comment
            </button>
          )}
        </div>

        {!loadingComments && !newCommentShown && (
          <NewCommentForm />
        )}
      </div>
    </div>
  );
};
