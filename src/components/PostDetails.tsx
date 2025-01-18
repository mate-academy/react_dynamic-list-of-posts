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
  const [hasError2, setHasError2] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    setHidden([]);
    setComments([]);
    setHasError(false);
    setHasError2(false);
    setIsFormVisible(false);

    setIsLoading(true);

    const controller = new AbortController();
    const signal = controller.signal;

    let aborted = false;

    // if all is goood aborted === false, what we need in the end of loading.
    // And !aborted = true, what we need to set an Error.
    // if aborted === true => setIsLoading(true), setHasError(false) -> We moved to another post or choose another user.
    commentApi
      .getComments(post.id, signal)
      .then(setComments)
      .catch(() => setHasError(!aborted))
      .finally(() => setIsLoading(aborted));

    return () => {
      aborted = true;
      controller.abort();
    };
  }, [post.id]);

  const remove: <T>(array: T[], value: T) => T[] = useCallback(
    (array, value) => {
      const index = array.indexOf(value);

      if (index !== -1) {
        array.splice(index, 1);
      }

      return array;
    },
    [],
  );

  const deleteComment = useCallback(
    (comment: Comment) => {
      const { id } = comment;

      setHasError2(false);
      setHidden(prevValue => [...prevValue, id]);

      commentApi
        .deleteComment(id)
        .then(() => {
          setHasError2(false);
          setHidden(prevValue => remove<number>(prevValue, id));
          setComments(prevComments => remove<Comment>(prevComments, comment));
        })
        .catch(() => {
          setHasError2(true);

          setHidden(prevValue =>
            prevValue.filter(commentId => commentId !== id),
          );
        });
    },
    [remove],
  );

  const createComment = useCallback(
    async (commentData: CommentData) => {
      const comment: Omit<Comment, 'id'> = {
        postId: post.id,
        ...commentData,
      };

      let before: Comment[] = [];

      setHasError2(false);

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

        setHasError2(false);
      } catch (e) {
        setHasError2(true);
        throw e;
      }
    },
    [post.id],
  );

  const isContentVisible = !isLoading && !hasError;
  const showError = hasError || (isContentVisible && hasError2);

  const showEmptyMessage =
    isContentVisible && comments.length - hidden.length === 0;

  const showComments = isContentVisible && !showEmptyMessage;

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
          {isLoading && <Loader />}

          {showError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {showEmptyMessage && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {showComments && (
            <>
              <p className="title is-4">Comments:</p>

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
            </>
          )}

          {isContentVisible && !isFormVisible && (
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

        {isContentVisible && isFormVisible && (
          <NewCommentForm onSubmit={createComment} />
        )}
      </div>
    </div>
  );
};
