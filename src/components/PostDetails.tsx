import React, { useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { useAppContext } from '../context/store';
import { Notification } from './Notification';
import { Error, Warning } from '../types/Notification';

export const PostDetails: React.FC = () => {
  const {
    state: { selectedPost, comments, error, loading },
  } = useAppContext();
  const [editMode, setEditMode] = useState(false);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            #{selectedPost?.id}: {selectedPost?.title}
          </h2>

          <p data-cy="PostBody">{selectedPost?.body}</p>
        </div>

        <div className="block">
          {loading && <Loader />}

          {error && <Notification type="error" message={Error.CommentsError} />}
          {!comments && (
            <Notification type="warning" message={Warning.NoComment} />
          )}

          <p className="title is-4">Comments:</p>

          <article className="message is-small" data-cy="Comment">
            <div className="message-header">
              <a href="mailto:misha@mate.academy" data-cy="CommentAuthor">
                Misha Hrynko
              </a>
              <button
                data-cy="CommentDelete"
                type="button"
                className="delete is-small"
                aria-label="delete"
              >
                delete button
              </button>
            </div>

            <div className="message-body" data-cy="CommentBody">
              Some comment
            </div>
          </article>

          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setEditMode(true)}
          >
            Write a comment
          </button>
        </div>

        {editMode && <NewCommentForm />}
      </div>
    </div>
  );
};
