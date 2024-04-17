import React, { useContext, useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { AppContext } from '../context/context';
import { deleteComment, getComments } from '../api/comments';
import { Errors } from '../enums/Errors';
import { Comment } from '../types/Comment';

export const PostDetails: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    selectedPost,
    setErrorMessage,
    errorMessage,
    isOpenNewComment,
    setIsOpenNewComment,
    setComments,
    comments,
  } = useContext(AppContext);

  const noErrors =
    errorMessage !== Errors.LoadError && errorMessage !== Errors.NoPost;

  useEffect(() => {
    setIsLoading(true);
    setComments([]);
    setErrorMessage(null);

    if (selectedPost) {
      getComments(selectedPost.id)
        .then((data: Comment[]) => setComments(data))
        .catch(() => setErrorMessage(Errors.LoadError))
        .finally(() => setIsLoading(false));
    }
  }, [selectedPost, setComments, setErrorMessage]);

  const handleNewComment = () => {
    setIsOpenNewComment(true);
  };

  const handleDeleteComment = (commentId: number) => {
    setComments((prevState: Comment[]) =>
      prevState.filter(prevComment => prevComment.id !== commentId),
    );

    deleteComment(commentId);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {selectedPost
              ? `#${selectedPost.id}: ${selectedPost.title}`
              : 'No post selected'}
          </h2>

          <p data-cy="PostBody">{selectedPost && selectedPost.body}</p>
        </div>

        <div className="block">
          {isLoading && <Loader />}

          {!noErrors && (
            <div className="notification is-danger" data-cy="CommentsError">
              {Errors.LoadError}
            </div>
          )}

          {!comments.length && noErrors && !isLoading && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              {Errors.CommentsError}
            </p>
          )}

          {!!comments.length && noErrors && !isLoading && (
            <>
              <p className="title is-4">Comments:</p>

              {comments.map(({ id, name, email, body }: Comment) => (
                <article
                  key={id}
                  className="message is-small"
                  data-cy="Comment"
                >
                  <div className="message-header">
                    <a href={`mailto:${email}`} data-cy="CommentAuthor">
                      {name}
                    </a>
                    <button
                      data-cy="CommentDelete"
                      type="button"
                      className="delete is-small"
                      aria-label="delete"
                      onClick={() => handleDeleteComment(id)}
                    >
                      delete button
                    </button>
                  </div>

                  <div className="message-body" data-cy="CommentBody">
                    {body}
                  </div>
                </article>
              ))}
            </>
          )}

          {!isOpenNewComment && noErrors && !isLoading && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={handleNewComment}
            >
              Write a comment
            </button>
          )}
        </div>

        {isOpenNewComment && <NewCommentForm />}
      </div>
    </div>
  );
};
