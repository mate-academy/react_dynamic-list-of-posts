import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import * as clientComments from '../service/comment';

type Props = {
  post: Post | undefined
  open: boolean
  form: boolean
  isFormActive: (status: boolean) => void
};

export const PostDetails: React.FC<Props> = ({
  post, open, form, isFormActive,
}) => {
  const [postComments, setPostComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const addNewComment = (comment: Comment) => {
    setPostComments(state => [
      ...state,
      comment,
    ]);
  };

  useEffect(() => {
    setIsLoading(true);

    if (open) {
      clientComments.getComments(`/comments?postId=${post?.id}`)
        .then(setPostComments)
        .catch(() => {
          setHasError(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [post, open]);

  const handleDeleteComment = (commentId: number) => {
    setPostComments(state => state.filter(
      comment => comment.id !== commentId,
    ));

    clientComments.deleteComment(`/comments/${commentId}`);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {post?.title}
          </h2>

          <p data-cy="PostBody">
            {post?.body}
          </p>
        </div>

        {isLoading && <Loader />}

        {(hasError && !isLoading) && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {(post && !isLoading && !hasError) && (
          <>
            <div className="block">

              {!postComments.length ? (
                <p className="title is-4" data-cy="NoCommentsMessage">
                  No comments yet
                </p>
              ) : (
                <p className="title is-4">Comments:</p>
              )}

              {postComments.map(comment => (
                <>
                  <article className="message is-small" data-cy="Comment">
                    <div className="message-header">
                      <a href={`mailto:${comment.email}`} data-cy="CommentAuthor">
                        {comment.name}
                      </a>
                      <button
                        data-cy="CommentDelete"
                        type="button"
                        className="delete is-small"
                        aria-label="delete"
                        onClick={() => {
                          handleDeleteComment(comment.id);
                        }}
                      >
                        delete button
                      </button>
                    </div>

                    <div className="message-body" data-cy="CommentBody">
                      {comment.body}
                    </div>
                  </article>
                </>
              ))}

              {!form && (
                <button
                  data-cy="WriteCommentButton"
                  type="button"
                  className="button is-link"
                  onClick={() => isFormActive(true)}
                >
                  Write a comment
                </button>
              )}
            </div>

            {form && (
              <NewCommentForm createComment={addNewComment} />
            )}

          </>
        )}

      </div>
    </div>
  );
};
