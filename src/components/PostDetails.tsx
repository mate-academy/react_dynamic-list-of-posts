import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import * as postServise from '../api/comments';
import { Comment } from '../types/Comment';
import { ErrorNotification } from './ErrorNotification';

type Props = {
  posts: Post[];
  activePostId: number | null;
};

export const PostDetails: React.FC<Props> = ({ posts, activePostId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [deleteError, setDeleteError] = useState(false);

  const [isAddComment, setIsAddComment] = useState(false);

  const currentPost = posts.find(post => post.id === activePostId);

  const errorTimeout = () => {
    setDeleteError(true);
    const timerId = setTimeout(() => {
      setDeleteError(false);
    }, 3000);

    return () => clearTimeout(timerId);
  };

  useEffect(() => {
    if (activePostId) {
      setIsAddComment(false);
      setLoading(true);
      postServise
        .getComments(activePostId)
        .then(setComments)
        .catch(() => setError(true))
        .finally(() => setLoading(false));
    }
  }, [activePostId]);

  const addComment = (comment: Comment) => {
    setComments(prev => [...prev, comment]);
  };

  const deleteComment = (id: number) => {
    postServise
      .deletComments(id)
      .then(() => {
        setComments(prev => {
          const prevComments = [...prev];

          return prevComments.filter(comment => comment.id !== id);
        });
      })
      .catch(() => errorTimeout());
  };

  return (
    <>
      {currentPost && (
        <div className="content" data-cy="PostDetails">
          <div className="content" data-cy="PostDetails">
            <div className="block">
              <h2 data-cy="PostTitle">{`#${currentPost.id}: ${currentPost.title}`}</h2>

              <p data-cy="PostBody">{currentPost.body}</p>
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <>
                  {!error ? (
                    <>
                      {comments.length === 0 ? (
                        <p className="title is-4" data-cy="NoCommentsMessage">
                          No comments yet
                        </p>
                      ) : (
                        <>
                          <p className="title is-4">Comments:</p>

                          {comments.map(({ id, name, email, body }) => (
                            <article
                              className="message is-small"
                              data-cy="Comment"
                              key={id}
                            >
                              <div className="message-header">
                                <a
                                  href={`mailto:${email}`}
                                  data-cy="CommentAuthor"
                                >
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

                              <div
                                className="message-body"
                                data-cy="CommentBody"
                              >
                                {body}
                              </div>
                            </article>
                          ))}
                        </>
                      )}
                      {!isAddComment && (
                        <button
                          data-cy="WriteCommentButton"
                          type="button"
                          className="button is-link"
                          onClick={() => setIsAddComment(true)}
                        >
                          Write a comment
                        </button>
                      )}
                    </>
                  ) : (
                    <ErrorNotification errorComments={error} />
                  )}
                </>
              )}
            </div>

            {deleteError && <ErrorNotification deleteError={deleteError} />}

            {isAddComment && (
              <NewCommentForm
                setNewComment={addComment}
                postId={activePostId}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};
