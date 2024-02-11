import React, { useCallback, useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment, CommentData } from '../types/Comment';
import * as commentsApi from '../api/comments';

type Props = {
  post: Post,
};

export const PostDetails: React.FC<Props> = ({
  post,
}) => {
  const [visible, setVisible] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const addComment = useCallback(async ({ name, email, body }: CommentData) => {
    const addedComment = await commentsApi.createComment({
      postId: post.id, name, email, body,
    });

    setComments(prev => [...prev, addedComment]);

    return addedComment;
  }, [post.id]);

  const deleteComment = useCallback((commentId: Comment['id']) => {
    setComments(prev => prev.filter(comment => comment.id !== commentId));
    commentsApi.deleteComment(commentId);
  }, []);

  useEffect(() => {
    setLoaded(false);
    setHasError(false);
    setVisible(false);

    commentsApi.getPostComments(post.id)
      .then((c: Comment[]) => {
        setComments(c);
        setLoaded(true);
      })
      .catch(() => {
        setHasError(true);
      });
  }, [post.id]);

  return (
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
        {!loaded && !hasError && (
          <Loader />
        )}

        {!loaded && hasError
          && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong. Please, try later!
            </div>
          )}

        {loaded && !hasError && !comments.length
          && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

        {loaded && !hasError && !!comments.length && (
          <>
            <p className="title is-4">Comments:</p>

            {comments.map(({
              id,
              email,
              name,
              body,
            }) => (
              <article
                key={id}
                className="message is-small"
                data-cy="Comment"
              >
                <div className="message-header">
                  <a href={`mailto:${email}`} data-cy="CommentAuthor">
                    {name}
                  </a>

                  <button
                    data-cy="CommentDelete"
                    type="button"
                    className="delete is-small"
                    aria-label="delete"
                    onClick={() => deleteComment(id)}
                  >
                    delete button
                  </button>
                </div>

                <div className="message-body" data-cy="CommentBody">
                  {body}
                </div>
              </article>
            ))}
          </>
        )}

        {loaded && !hasError && !visible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
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
