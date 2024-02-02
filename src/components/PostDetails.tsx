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
    setPostComments,
    newCommentShown,
    setNewCommentShown,
  } = usePosts();

  if (!post) {
    return null;
  }

  const handleDelete = (commentId: number) => {
    setPostComments(postComments
      .filter(comment => comment.id !== commentId));

    deleteComment(commentId);
  };

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

          {!loadingComments && !errorMessage && postComments.length > 0 && (
            <p className="title is-4">Comments:</p>
          )}

          {postComments.map(({
            id,
            name,
            email,
            body,
          }) => (
            <article
              key={id}
              className="message is-small"
              data-cy="Comment"
            >
              <div className="message-header">
                <a
                  href={`mailto:${email}`}
                  data-cy="CommentAuthor"
                >
                  {name}
                </a>
                <button
                  data-cy="CommentDelete"
                  type="button"
                  className="delete is-small"
                  aria-label="delete"
                  onClick={() => handleDelete(id)}
                >
                  delete button
                </button>
              </div>

              <div className="message-body" data-cy="CommentBody">
                {body}
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
