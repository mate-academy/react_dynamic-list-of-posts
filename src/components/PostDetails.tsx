import React, { useContext, useState, useEffect } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { TodosContext } from '../TodoContext';
import { getComments, deleteComment } from '../utils/api';
import { Comment } from '../types/Comment';

export const PostDetails: React.FC = () => {
  const context = useContext(TodosContext);

  const { selectedPost } = context;

  const [comments, setComments] = useState<Comment[]>([]);
  const [isCommentLoader, setIsCommentLoader] = useState(false);
  const [isCommentError, setIsCommentError] = useState(false);
  const [isFormOpened, setIsFormOpened] = useState(false);
  const [isDeleteError, setIsDeleteError] = useState(false);

  useEffect(() => {
    if (selectedPost) {
      setIsCommentLoader(true);
      setIsCommentError(false);

      getComments(selectedPost.id)
        .then(setComments)
        .catch(() => setIsCommentError(true))
        .finally(() => setIsCommentLoader(false));
    }
  }, [selectedPost]);

  const handleCommentDelete = (id: number) => {
    const tempComment = comments.find(comment => comment.id === id);

    if (tempComment) {
      setIsDeleteError(false);
      setComments(comments.filter(
        comment => comment.id !== id,
      ));

      deleteComment(id)
        .catch(() => {
          setIsDeleteError(true);
        });
    }
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {selectedPost?.title}
          </h2>

          <p data-cy="PostBody">
            {selectedPost?.body}
          </p>
        </div>

        <div className="block">
          {isCommentLoader && <Loader />}

          {isCommentError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {comments.length === 0 && !isCommentLoader && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {comments.length > 0 && !isCommentLoader && (
            <>
              <p className="title is-4">Comments:</p>

              {comments.map(comment => (
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
                      onClick={() => handleCommentDelete(comment.id)}
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

          {isDeleteError && (
            <p className="help is-danger" data-cy="ErrorMessage">
              Can&apos;t delete the comment.
            </p>
          )}
          {!isFormOpened && !isCommentLoader && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsFormOpened(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {isFormOpened && (
          <NewCommentForm
            comments={comments}
            setComments={setComments}
          />
        )}
      </div>
    </div>
  );
};
