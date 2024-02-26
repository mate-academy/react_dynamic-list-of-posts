import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { getComments } from '../utils/getComments';
import { Comment } from '../types/Comment';

interface Props {
  post: Post;
}

export const PostDetails: React.FC<Props> = React.memo(({ post }) => {
  const { id, title, body } = post;

  const [comments, setComments] = useState<Comment[] | null>(null);
  const [message, setMessage] = useState('');

  const isError = message === 'Something went wrong!';

  useEffect(() => {
    if (post) {
      getComments(post.id)
        .then(response => {
          setComments(response);

          if (!response.length) {
            setMessage('No comments yet');
          } else {
            setMessage('Comments:');
          }
        })
        .catch(() => setMessage('Something went wrong'))
        .finally(() => {});
    }
  }, [post]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${id}: ${title}`}</h2>

          <p data-cy="PostBody">{body}</p>
        </div>

        <div className="block">
          <Loader />

          {isError && (
            <div className="notification is-danger" data-cy="CommentsError">
              {message}
            </div>
          )}

          {comments?.length ? (
            <p className="title is-4">Comments:</p>
          ) : (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {comments?.length &&
            comments.map(comment => (
              <article
                className="message is-small"
                data-cy="Comment"
                key={comment.id}
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
                  >
                    delete button
                  </button>
                </div>

                <div className="message-body" data-cy="CommentBody">
                  {comment.body}
                </div>
              </article>
            ))}
          {/*
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
          */}

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
});
