import React, { useContext, useState } from 'react';
import { NewCommentForm } from './NewCommentForm';
import { deleteComment } from '../utils/requestService';
import { AppContext } from './Context';

type Props = {};

export const PostDetails: React.FC<Props> = () => {
  const [newCommentShown, setNewCommentShown] = useState(false);

  const appContext = useContext(AppContext);
  const {
    postComments,
    error,
    post,
    setNewComment,
  } = appContext;

  if (!post) {
    return null;
  }

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`${post.id}: ${post.title}`}
          </h2>

          <p data-cy="PostBody">
            {post.body}
          </p>
        </div>

        <div className="block">

          {error
            && (
              <div className="notification is-danger" data-cy="CommentsError">
                Something went wrong
              </div>
            )}

          {postComments.length < 0
            && (
              <p className="title is-4" data-cy="NoCommentsMessage">
                No comments yet
              </p>
            )}

          <p className="title is-4">Comments:</p>

          <article
            className="message is-small"
            data-cy="Comment"
          >
            {postComments.map(comment => {
              return (
                <div key={comment.id}>
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
                  <div
                    className="message-body"
                    data-cy="CommentBody"
                  >
                    {comment.body}
                  </div>
                </div>
              );
            })}
          </article>

          {!newCommentShown && post.id
            ? (
              <button
                data-cy="WriteCommentButton"
                type="button"
                className="button is-link"
                onClick={() => setNewCommentShown(true)}
              >
                Write a comment
              </button>
            )
            : (
              <NewCommentForm />
            )}
        </div>
      </div>
    </div>
  );
};
