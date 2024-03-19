import React from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Error, Loading } from '../types/Helpers';
import { Comment } from '../types/Comment';
import { deleteComment } from '../api/comments';

interface Props {
  selectedPost: Post;
  comments: Comment[];
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  isFormShown: boolean;
  setIsFormShown: React.Dispatch<React.SetStateAction<boolean>>;
  loading: Loading;
  setLoading: React.Dispatch<React.SetStateAction<Loading>>;
  error: Error;
  setError: React.Dispatch<React.SetStateAction<Error>>;
}

export const PostDetails: React.FC<Props> = ({
  selectedPost,
  comments,
  setComments,
  isFormShown,
  setIsFormShown,
  loading,
  setLoading,
  error,
  setError,
}) => {
  const handleShowForm = () => setIsFormShown(true);

  const handleDeleteComment = async (commentId: number) => {
    try {
      setComments(comments.filter(comment => comment.id !== commentId));
      await deleteComment(commentId);
    } catch {
      setError('Delete comment');
      setComments(comments);
    }
  };

  return selectedPost.id ? (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            #{selectedPost.id}: {selectedPost.title}
          </h2>

          <p data-cy="PostBody">{selectedPost.body}</p>
        </div>

        <div className="block">
          {loading === 'Comments' && <Loader />}

          {error === 'Comments' && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {/* eslint-disable */}
          {!!selectedPost.id &&
            error !== 'Comments' &&
            loading !== 'Comments' && (
              <>
                {!comments?.length ? (
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
                            onClick={() => {handleDeleteComment(comment.id)}}
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

                {(error === 'Delete comment' || error === 'Add comment') && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {!isFormShown ? (
                  <button
                    data-cy="WriteCommentButton"
                    type="button"
                    className="button is-link"
                    onClick={handleShowForm}
                  >
                    Write a comment
                  </button>
                ) : (
                  <NewCommentForm
                    selectedPost={selectedPost}
                    comments={comments}
                    setComments={setComments}
                    loading={loading}
                    setLoading={setLoading}
                    setError={setError}
                  />
                )}
              </>
            )}
          {/* eslint-enable */}
        </div>
      </div>
    </div>
  ) : null;
};
