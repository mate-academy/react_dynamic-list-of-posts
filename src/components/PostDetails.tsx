import React, { useEffect, useState } from 'react';
import * as postService from '../api/posts';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    postService.getComments(post.id)
      .then(setComments)
      .catch(() => setError(true))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleCommentDeletion = (commentId: number) => (
    postService.deleteComment(commentId)
      .then(() => {
        setComments(prev => prev.filter(comm => comm.id !== commentId));
      })
      .catch(() => setError(true)));

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
          {isLoading && (<Loader />)}

          {!isLoading && error && (
            <div
              className="notification is-danger"
              data-cy="CommentsError"
            >
              Something went wrong
            </div>
          )}

          {(!comments.length && !isLoading) && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {comments.length !== 0 && (
            <>
              <p className="title is-4">Comments:</p>
              {comments.map(comment => (
                <article className="message is-small" data-cy="Comment">
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
                      onClick={() => handleCommentDeletion(comment.id)}
                    >
                      delete button
                    </button>
                  </div>

                  <div className="message-body" data-cy="CommentBody">
                    {comment.body}
                  </div>
                </article>
              )) }

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
              </article>
            </>
          )}

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
