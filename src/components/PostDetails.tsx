import React from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

export const PostDetails: React.FC = () => {
  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            #18: voluptate et itaque vero tempora molestiae
          </h2>

          <p data-cy="PostBody">
            eveniet quo quis laborum totam consequatur non dolor ut et est
            repudiandae est voluptatem vel debitis et magnam
          </p>
        </div>

        <div className="block">
          <Loader />

          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>

          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>

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
              One more comment
            </div>
          </article>

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
              {'Multi\nline\ncomment'}
            </div>
          </article>

          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
          >
            Write a comment
          </button>
        </div>

        <NewCommentForm />
      </div>
    </div>
  );
};
