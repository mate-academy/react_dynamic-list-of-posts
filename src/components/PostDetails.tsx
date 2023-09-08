import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

import { getCommentsPost, deleteComment } from '../api/comments';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isNewComment, setIsNewComment] = useState(false);
  const [updateAt, setUpdateAt] = useState(new Date());

  useEffect(() => {
    setIsLoading(true);
    setIsNewComment(false);
    setHasError(false);

    getCommentsPost(post.id)
      .then(setComments)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, [post, updateAt]);

  const handleCommentAdd = (addComment: Comment) => {
    setComments((prev) => [...prev, addComment]);
  };

  const handleCommentDelete = (delComment: Comment) => {
    setComments((prev) => prev.filter((comm) => delComment.id !== comm.id));

    deleteComment(delComment.id).catch(() => {
      setComments(comments);
    });
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>

          <p data-cy="PostBody">{post.body}</p>
        </div>

        <div className="block">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {hasError ? (
                <div className="notification is-danger" data-cy="CommentsError">
                  <span style={{ display: 'block', marginBottom: '12px' }}>
                    Something went wrong!
                  </span>

                  <div className="control">
                    <button
                      type="button"
                      className={classNames('button is-link is-light', {
                        'is-loading': isLoading,
                      })}
                      onClick={() => setUpdateAt(new Date())}
                    >
                      Retry Loading...
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {!comments.length && (
                    <p className="title is-4" data-cy="NoCommentsMessage">
                      No comments yet
                    </p>
                  )}

                  {!!comments.length && (
                    <>
                      <p className="title is-4">Comments:</p>

                      {comments.map((comment) => (
                        <article
                          className="message is-small"
                          data-cy="Comment"
                          key={comment.id}
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
                              onClick={() => handleCommentDelete(comment)}
                            >
                              delete button
                            </button>
                          </div>

                          <div className="message-body" data-cy="CommentBody">
                            {comment.body}
                          </div>
                        </article>
                      ))}
                    </>
                  )}

                  {isNewComment ? (
                    <NewCommentForm
                      postId={post.id}
                      onCommentAdd={handleCommentAdd}
                      setHasError={setHasError}
                    />
                  ) : (
                    <button
                      data-cy="WriteCommentButton"
                      type="button"
                      className="button is-link"
                      onClick={() => setIsNewComment(true)}
                    >
                      Write a comment
                    </button>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
