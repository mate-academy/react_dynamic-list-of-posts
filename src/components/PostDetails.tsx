import React, { useContext, useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { PostContext } from '../PostsProvider';
import { deleteComment, getComments } from '../utils/posts';
import { Comment } from '../types/Comment';

export const PostDetails: React.FC = () => {
  const {
    selectedPost,
    error,
    setError,
    currentComments,
    setCurrentComments,
  } = useContext(PostContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isNewForm, setIsNewForm] = useState(false);

  useEffect(() => {
    if (selectedPost) {
      setIsLoading(true);
      getComments(selectedPost.id)
        .then((commentsFromServer) => {
          setCurrentComments(commentsFromServer);
        })
        .catch(() => {
          setError('Something went wrong');
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [selectedPost, setError, setCurrentComments]);

  const onDelete = (e: React.MouseEvent, commentId: number) => {
    e.preventDefault();
    deleteComment(commentId)
      .then(() => {
        setCurrentComments(
          currentComments?.filter(comment => comment.id
            !== commentId) as Comment[],
        );
      });
  };

  const handleNewFormClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsNewForm(true);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`${selectedPost?.id}#: ${selectedPost?.title}`}
          </h2>

          <p data-cy="PostBody">
            {selectedPost?.body}
          </p>
        </div>

        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className="block">

              {error && (
                <div className="notification is-danger" data-cy="CommentsError">
                  Something went wrong
                </div>
              )}
              {currentComments?.length === 0 ? (
                <p className="title is-4" data-cy="NoCommentsMessage">
                  No comments yet
                </p>
              ) : (
                <>
                  <p className="title is-4">Comments:</p>

                  {currentComments?.map((comment) => (
                    <article
                      className="message is-small"
                      data-cy="Comment"
                      key={comment.id}
                    >
                      <div className="message-header">
                        <a href={`mailto:${comment.email}`} data-cy="CommentAuthor">
                          {comment.name}
                        </a>
                        <button
                          data-cy="CommentDelete"
                          type="button"
                          className="delete is-small"
                          aria-label="delete"
                          onClick={(e) => onDelete(e, comment.id)}
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

              {!isNewForm && (
                <button
                  data-cy="WriteCommentButton"
                  type="button"
                  className="button is-link"
                  onClick={(e) => handleNewFormClick(e)}
                >
                  Write a comment
                </button>
              )}
            </div>
          </>
        )}

        {isNewForm && <NewCommentForm />}
      </div>
    </div>
  );
};
