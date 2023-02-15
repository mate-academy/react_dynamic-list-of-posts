import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

import * as commentsApi from '../api/comments';

import { Post } from '../types/Post';
import { Comment, CommentData } from '../types/Comment';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [hasError, setError] = useState(false);
  const [visible, setVisible] = useState(false);

  function loadComments() {
    setLoaded(false);
    setError(false);
    setVisible(false);

    commentsApi.getPostComments(post.id)
      .then(setComments)
      .catch(() => setError(true))
      .finally(() => setLoaded(true));
  }

  useEffect(loadComments, [post.id]);

  const addComment = async ({ name, email, body }: CommentData) => {
    try {
      const newComment = await commentsApi.createComment({
        name,
        email,
        body,
        postId: post.id,
      });

      setComments(
        currentComments => [...currentComments, newComment],
      );
    } catch (error) {
      setError(true);
    }
  };

  const deleteComment = async (commentId: number) => {
    setComments(
      currentComments => currentComments.filter(
        comment => comment.id !== commentId,
      ),
    );

    await commentsApi.deleteComment(commentId);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          {`#${post.id}: ${post.title}`}
        </h2>
        <p data-cy="PostBody">{post.body}</p>
      </div>

      <div className="block">
        {!loaded && <Loader />}

        {loaded && hasError && (
          <div
            className="notification is-danger"
            data-cy="CommentsError"
          >
            Something went wrong
          </div>
        )}
        {
          loaded && !hasError && comments.length === 0 && (
            <p
              className={cn('', {
                'title is-4': comments.length === 0,
              })}
              data-cy="NoCommentsMessage"
            >
              No comments yet
            </p>
          )
        }
        {loaded && !hasError && comments.length > 0 && (
          <>
            <p className="title is-4">Comments:</p>

            {comments.map(comment => (
              <article
                className="message is-small"
                key={comment.id}
                data-cy="Comment"
              >
                <div className="message-header">
                  <a
                    href={`mailto:${comment.email}`}
                    data-cy="CommentAuthor"
                  >
                    {comment.name}
                  </a>

                  <button
                    type="button"
                    data-cy="CommentDelete"
                    className="delete is-small"
                    aria-label="delete"
                    onClick={() => deleteComment(comment.id)}
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
              </article>
            ))}
          </>
        )}

        {loaded && !hasError && !visible && (
          <button
            type="button"
            data-cy="WriteCommentButton"
            className="button is-link"
            onClick={() => setVisible(true)}
          >
            Write a comment
          </button>
        )}

        {loaded && !hasError && visible && (
          <NewCommentForm onSubmit={addComment} />
        )}
      </div>
    </div>
  );
};
