import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { getComments } from '../api/posts';

type Props = {
  selectedPost: Post;
};

export const PostDetails: React.FC<Props> = ({ selectedPost }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCommentButtonClicked, setIsCommentButtonClicked] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getComments(selectedPost)
      .then(setComments)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, [selectedPost]);

  console.log(comments);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${selectedPost.id}: ${selectedPost.title}`}
            {/* #18: voluptate et itaque vero tempora molestiae */}
          </h2>

          <p data-cy="PostBody">
            {selectedPost.body}
          </p>
        </div>

        <div className="block">
          {isLoading && <Loader />}

          {hasError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {(!comments && !hasError && !isLoading) && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {(comments.length > 0 && !hasError && !isLoading) && (
            <p className="title is-4">Comments:</p>
          )}

          {(!isLoading && comments.length > 0) && (
            comments.map(comment => (
              <article
                className="message is-small"
                data-cy="Comment"
                // key={comment.}
              >
                <div className="message-header">
                  <a href={`mailto:${comment}`} data-cy="CommentAuthor">
                    {/* {comment.name} */}
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
                  {/* {comment.body} */}
                </div>
              </article>
            )))}

          {(!comments) ? (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          ) : (
            comments.map(comment => (
              <article className="message is-small" data-cy="Comment">
                <div className="message-header">
                  <a href="mailto:misha@mate.academy" data-cy="CommentAuthor">
                    {comment}
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
                  {/* {comment.} */}
                </div>
              </article>
            ))

          )}

          {/* <article className="message is-small" data-cy="Comment">
            <div className="message-header">
              <a
                href="mailto:misha@mate.academy"
                data-cy="CommentAuthor"
              >
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
            <div
              className="message-body"
              data-cy="CommentBody"
            >
              One more comment
            </div>
          </article>

          <article className="message is-small" data-cy="Comment">
            <div className="message-header">
              <a
                href="mailto:misha@mate.academy"
                data-cy="CommentAuthor"
              >
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

          {!isCommentButtonClicked && !isLoading && !hasError && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsCommentButtonClicked(!isCommentButtonClicked)}
            >
              Write a comment
            </button>
          )}
        </div>

        {(isCommentButtonClicked && !isLoading) && <NewCommentForm />}
      </div>
    </div>
  );
};
