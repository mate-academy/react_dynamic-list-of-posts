import React, { useState, useContext } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { GlobalContext } from '../GlobalContext';
import { Post } from '../types/Post';
import { deleteComment } from '../api/comments';

export const PostDetails: React.FC = () => {
  const {
    comments,
    selectedPost,
    isLoadingComments,
    isErrorComments,
    setComments,
  } = useContext(GlobalContext);
  const { id, title, body } = selectedPost as Post;

  const [showForm, setShowForm] = useState(false);

  const handleButtonWrite = () => {
    setShowForm(true);
  };

  const handleDeleteComment = (commentId: number) => {
    deleteComment(commentId)
      .then(() => {
        const updatedComments = comments.filter(item => item.id !== commentId);

        setComments(updatedComments);
      });
  };

  return (
    <div className="tile is-child box is-success">
      <div className="content" data-cy="PostDetails">
        <div className="content" data-cy="PostDetails">
          <div className="block">
            <h2 data-cy="PostTitle">
              {`#${id}: ${title}`}
            </h2>

            <p data-cy="PostBody">
              {body}
            </p>
          </div>

          <div className="block">
            {isLoadingComments && <Loader />}

            {isErrorComments && (
              <div className="notification is-danger" data-cy="CommentsError">
                Something went wrong
              </div>
            )}

            {!comments.length && !isErrorComments && (
              <p className="title is-4" data-cy="NoCommentsMessage">
                No comments yet
              </p>
            )}

            {(!!comments.length && !isErrorComments) && (
              <p className="title is-4">Comments:</p>
            )}

            {!isErrorComments && !!comments.length && comments.map(comment => {
              // eslint-disable-next-line
              const { id, name, email, body } = comment;

              return (
                <article
                  className="message is-small"
                  data-cy="Comment"
                  key={id}
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
                      onClick={() => handleDeleteComment(comment.id)}
                    >
                      delete button
                    </button>
                  </div>

                  <div className="message-body" data-cy="CommentBody">
                    {body}
                  </div>
                </article>
              );
            })}

            {(!showForm && !isErrorComments) && (
              <button
                data-cy="WriteCommentButton"
                type="button"
                className="button is-link"
                onClick={handleButtonWrite}
              >
                Write a comment
              </button>
            )}
          </div>

          {showForm && <NewCommentForm />}
        </div>
      </div>
    </div>
  );
};
