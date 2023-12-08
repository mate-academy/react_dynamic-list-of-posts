import React, { useContext, useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { AppContext } from '../appContext';
import { getComment,deleteComment } from '../utils/api';

export const PostDetails: React.FC = () => {
  const context = useContext(AppContext);

  const { selectedPost,comments,setComments} = context;

  const [isCommentLoader, setIsCommentLoader] = useState(false);
  const [isCommentError, setIsCommentError] = useState(false);
  const [isFormOpened, setIsFormOpened] = useState(false);
  const [isDeleteError, setIsDeleteError] = useState(false);


  useEffect(() => {
    if(selectedPost) {
      setIsCommentLoader(true);
      setIsCommentError(false);

      getComment(selectedPost.id)
        .then(setComments)
        .catch(()=> setIsCommentError(true))
        .finally(() => setIsCommentLoader(false))
    };
  }, [selectedPost])

  const removeComment = (id: number) => {
    const targetComment = comments.find(comment => comment.id === id)

    if (targetComment) {
      setIsDeleteError(false);
      setComments(comments.filter(comment =>
        comment.id !== id))

    }

    deleteComment(id)
      .catch(() => setIsDeleteError(true))
  }

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
              <article className="message is-small" data-cy="Comment" key={comment.id}>
              <div className="message-header">
                <a
                  href={`mailto:${comment.email}`}
                  data-cy="CommentAuthor"
                >
                  {comment.name}
                </a>

                {!isDeleteError && (
                  <button
                    data-cy="CommentDelete"
                    type="button"
                    className="delete is-small"
                    aria-label="delete"
                    onClick={() => removeComment(comment.id)}
                  >
                    delete button
                  </button>
                )}
              </div>

              <div className="message-body" data-cy="CommentBody">
                {comment.body}
              </div>
            </article>
          ))}
          </>
        )}

         {!isFormOpened && !isCommentLoader &&(
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
          <NewCommentForm />
        )}
      </div>
    </div>
  );
};
