import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Posts } from '../types/Post';
import { deleteComment, getComment } from '../Api/Api';
import { Comment } from '../types/Comment';

export const PostDetails: React.FC<Posts> = ({ posts, postId, userId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isShowForm, setIsShowForm] = useState<boolean>(false);
  const selectedPost = posts.find(p => p.id === postId);

  const handleShowForm = (show: boolean) => {
    setIsShowForm(show);
  };

  useEffect(() => {
    setComments([]);
    setIsLoading(true);
    handleShowForm(false);
    setErrorMessage('');
    if (!postId) {
      return;
    }

    getComment({ postId })
      .then(commentApi => {
        setComments(commentApi);
      })
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, [postId]);

  const handleDeleteComment = (id: number) => {
    const updateComments = comments.filter(c => c.id !== id);

    setComments(updateComments);
    /* eslint-disable @typescript-eslint/indent */
    deleteComment(id).catch(() => setErrorMessage('error in comment'));
  };

  return (
    <>
      <div className="content" data-cy="PostDetails">
        <div className="content" data-cy="PostDetails">
          <div className="block">
            <h2 data-cy="PostTitle">
              {`#${selectedPost?.id}: ${selectedPost?.title}`}
            </h2>

            <p data-cy="PostBody">{selectedPost?.body}</p>
          </div>

          {
            <div className="block">
              {isLoading && <Loader />}

              {errorMessage && (
                <div className="notification is-danger" data-cy="CommentsError">
                  {errorMessage}
                </div>
              )}

              {
                /* eslint-disable
                @typescript-eslint/indent */ comments.length === 0 &&
                  postId > 0 &&
                  !isLoading &&
                  errorMessage.length === 0 && (
                    <p className="title is-4" data-cy="NoCommentsMessage">
                      No comments yet
                    </p>
                  )
              }

              {comments.length > 0 && !isLoading && (
                <p className="title is-4">Comments:</p>
              )}

              {!isLoading && userId === selectedPost?.userId && (
                <>
                  {comments.map(c => (
                    <article
                      key={c.id}
                      className="message is-small"
                      data-cy="Comment"
                    >
                      <div className="message-header">
                        <a href={`mailto:${c.email}`} data-cy="CommentAuthor">
                          {c.name}
                        </a>
                        <button
                          data-cy="CommentDelete"
                          type="button"
                          className="delete is-small"
                          aria-label="delete"
                          onClick={() => handleDeleteComment(c.id)}
                        >
                          delete button
                        </button>
                      </div>

                      <div className="message-body" data-cy="CommentBody">
                        {c.body}
                      </div>
                    </article>
                  ))}
                  {!isShowForm && errorMessage.length === 0 && (
                    <button
                      data-cy="WriteCommentButton"
                      type="button"
                      className="button is-link"
                      onClick={() => handleShowForm(true)}
                    >
                      Write a comment
                    </button>
                  )}
                </>
              )}
            </div>
          }

          {isShowForm && (
            <NewCommentForm setErrorMessage={setErrorMessage} setComments={setComments} postId={postId} />
          )}
        </div>
      </div>
    </>
  );
};
