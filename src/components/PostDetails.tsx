import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

import { NewCommentForm } from './NewCommentForm';

type Props = {
  comments: Comment[];
  post: Post;
  commentsLoading: boolean;
  commentsError: boolean;
};

export const PostDetails: React.FC<Props> = ({
  comments,
  post,
  commentsLoading,
  commentsError,
}) => {
  const [isLoadingForm, setLoadingForm] = useState(false);

  useEffect(() => {
    setLoadingForm(false);
  }, [post]);

  const handleLoadingForm = () => {
    setLoadingForm(true);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            #{post.id}: {post.title}
          </h2>

          <p data-cy="PostBody">{post.body}</p>
        </div>

        <div className="block">
          {commentsLoading && <Loader />}

          {commentsError ? (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          ) : (
            <>
              {!commentsLoading && comments.length === 0 ? (
                <p className="title is-4" data-cy="NoCommentsMessage">
                  No comments yet
                </p>
              ) : (
                <>
                  <p className="title is-4">Comments:</p>
                  {comments.map(comment => (
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

              {!isLoadingForm && (
                <button
                  data-cy="WriteCommentButton"
                  type="button"
                  className="button is-link"
                  onClick={handleLoadingForm}
                >
                  Write a comment
                </button>
              )}
            </>
          )}
        </div>
        {isLoadingForm && <NewCommentForm />}
      </div>
    </div>
  );
};
