import React, { useCallback, useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment, CommentData } from '../types/Comment';
import * as commentApi from '../api/comment';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [hidden, setHidden] = useState<number[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    setHidden([]);
    setComments([]);
    setIsLoading(true);
    setHasError(false);
    setIsFormVisible(false);

    const controller = new AbortController();
    const signal = controller.signal;

    let aborted = false;

    commentApi
      .getComments(post.id, signal)
      .then(setComments)
      .catch(() => setHasError(!aborted))
      .finally(() => setIsLoading(false));

    return () => {
      aborted = true;
      controller.abort();
    };
  }, [post.id]);

  const remove: <T>(array: T[], value: T) => T[] = useCallback(
    (array, value) => {
      const newArray = [...array]
      const index = newArray.indexOf(value);

      if (index !== -1) {
        array.splice(index, 1);
      }

      return newArray;
    },
    [],
  );

  const createComment = useCallback(
    async (commentData: CommentData) => {
      const comment: Omit<Comment, 'id'> = {
        postId: post.id,
        ...commentData,
      };

      let before: Comment[] = [];

      setComments(prevComments => {
        before = prevComments;

        return prevComments;
      });

      try {
        const sentComment = await commentApi.createComment(comment);

        setComments(prevComments => {
          return before === prevComments
            ? [...prevComments, sentComment]
            : prevComments;
        });

        setHasError(false);
      } catch {
        setHasError(true);
      }
    },
    [post.id],
  );

  const deleteComment = useCallback(
    (comment: Comment) => {
      const { id } = comment;

      setHidden(prevValue => [...prevValue, id]);

      commentApi
        .deleteComment(id)
        .then(() => {
          setHasError(false);
          setHidden(prevValue => remove<number>(prevValue, id));
          setComments(prevComments => remove<Comment>(prevComments, comment));
        })
        .catch(() => {
          setHasError(true);
          setHidden(prevValue =>
            prevValue.filter(commentId => commentId !== id),
          );
        });
    },
    [remove],
  );

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            #{post.id}: {post.title}
          </h2>

          <p data-cy="PostBody">{post.body}</p>
        </div>

        {isLoading && <Loader />}

        {!isLoading && (
          <div className="block">
            {hasError ? (
              <div className="notification is-danger" data-cy="CommentsError">
                Something went wrong
              </div>
            ) : comments.length - hidden.length === 0 ? (
              <p className="title is-4" data-cy="NoCommentsMessage">
                No comments yet
              </p>
            ) : (
              <p className="title is-4">Comments:</p>
            )}

            {comments.map(
              comment =>
                !hidden.includes(comment.id) && (
                  <article
                    key={comment.id}
                    className="message is-small"
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
                        data-cy="CommentDelete"
                        type="button"
                        className="delete is-small"
                        aria-label="delete"
                        onClick={() => deleteComment(comment)}
                      >
                        delete button
                      </button>
                    </div>

                    <div className="message-body" data-cy="CommentBody">
                      {comment.body}
                    </div>
                  </article>
                ),
            )}

            {!isFormVisible && !hasError && (
              <button
                data-cy="WriteCommentButton"
                type="button"
                className="button is-link"
                onClick={() => setIsFormVisible(true)}
              >
                Write a comment
              </button>
            )}
          </div>
        )}

        {isFormVisible && <NewCommentForm onSubmit={createComment} />}
      </div>
    </div>
  );
};
