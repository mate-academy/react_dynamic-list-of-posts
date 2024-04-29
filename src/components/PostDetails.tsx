import React from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { Error } from '../types/Error';

type Props = {
  post: Post | null;
  comments: Comment[] | null;
  isLoadingComments: boolean;
  error: Error | null;
};

export const PostDetails: React.FC<Props> = ({
  post,
  comments,
  error,
  isLoadingComments,
}) => {
  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {post?.id}: {post?.title}
          </h2>

          <p data-cy="PostBody">{post?.body}</p>
        </div>

        <div className="block">
          {isLoadingComments && <Loader />}

          {error === Error.CommentsError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!isLoadingComments && !comments?.length && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {!isLoadingComments && !!comments?.length && (
            <p className="title is-4">Comments:</p>
          )}

          {!!comments?.length &&
            comments.map((currentComment: Comment) => (
              <article
                key={currentComment.id}
                className="message is-small"
                data-cy="Comment"
              >
                <div className="message-header">
                  <a
                    href={`mailto:${currentComment.email}`}
                    data-cy="CommentAuthor"
                  >
                    {currentComment.name}
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
                  {currentComment.body}
                </div>
              </article>
            ))}

          {/* <article className="message is-small" data-cy="Comment">
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
          </article> */}

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
