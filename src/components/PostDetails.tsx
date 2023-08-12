import React, { useState, useEffect, useCallback } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { createComment, deleteComment, getComments } from '../api/comments';
import { Comment } from '../types/Comment';

type Props = {
  post: Post,
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [formIsActive, setFormIsActive] = useState(false);

  useEffect(() => {
    setLoading(true);
    getComments(post.id)
      .then(setComments)
      .catch(() => setIsError(true))
      .finally(() => setLoading(false));
  }, [post]);

  const toggleFormActive = () => setFormIsActive(true);

  const deleteCommentHandler = useCallback((commentId: number) => {
    deleteComment(commentId)
      .then(() => setComments(currentComments => currentComments
        .filter(currComment => currComment.id !== commentId)))
      .catch(() => { });
  }, []);

  const addComment = useCallback(async (
    email: string,
    body: string,
    name: string,
    postId: number,
  ) => {
    const newComment: Omit<Comment, 'id'> = {
      email,
      body,
      name,
      postId,
    };

    return createComment(newComment)
      .then(currComment => {
        setComments(currentComments => [...currentComments, currComment]);
      })
      .catch((error) => {
        throw error;
      });
  }, []);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${post?.id}: ${post?.title}`}
          </h2>

          <p data-cy="PostBody">
            {post.body}
          </p>
        </div>

        <div className="block">
          {loading
            ? <Loader />
            : (
              <>
                {isError && (
                  <div
                    className="notification is-danger"
                    data-cy="CommentsError"
                  >
                    Something went wrong
                  </div>
                )}

                {!isError && comments.length === 0 && (
                  <p className="title is-4" data-cy="NoCommentsMessage">
                    No comments yet
                  </p>
                )}

                {!isError && comments.length !== 0 && (
                  <>
                    <p className="title is-4">Comments:</p>

                    {
                      comments.map(comment => (
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
                              onClick={() => deleteCommentHandler(comment.id)}
                            >
                              delete button
                            </button>
                          </div>

                          <div className="message-body" data-cy="CommentBody">
                            {comment.body}
                          </div>
                        </article>

                      ))
                    }

                    {!formIsActive && (
                      <button
                        data-cy="WriteCommentButton"
                        type="button"
                        className="button is-link"
                        onClick={toggleFormActive}
                      >
                        Write a comment
                      </button>
                    )}
                  </>
                )}
              </>
            )}
        </div>

        {formIsActive
          && (
            <NewCommentForm
              addComment={addComment}
              postId={post.id}
            />
          )}
      </div>
    </div>
  );
};
