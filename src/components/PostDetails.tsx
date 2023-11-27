import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { deleteComment, getComments } from '../services/comment';
import { Comment } from '../types/Comment';

type Props = {
  selectedPost: Post;
  isFormShown: boolean;
  setIsFormShown: (value: boolean) => void;
};

export const PostDetails: React.FC<Props> = ({
  selectedPost,
  isFormShown,
  setIsFormShown,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setErrorMessage('');
    setIsLoading(true);
    getComments(selectedPost.id)
      .then(setComments)
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, [selectedPost]);

  const handleWriteComment = () => {
    setIsFormShown(true);
  };

  const handleDeleteComment = (commentId: number) => () => {
    setComments(currentComments => {
      return currentComments.filter(comment => comment.id !== commentId);
    });
    deleteComment(commentId)
      .catch(() => {
        setComments(comments);
        setErrorMessage('Can not add a comment, try again later');
      });
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${selectedPost.id}: ${selectedPost.title}`}
          </h2>

          <p data-cy="PostBody">
            {
              selectedPost.body
            }
          </p>
        </div>

        <div className="block">
          {isLoading && <Loader />}

          {errorMessage && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {(!comments.length && !isLoading) && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {(comments.length > 0 && !isLoading) && (
            <>
              <p className="title is-4">Comments:</p>

              {comments.map(comment => (
                <article
                  key={comment.id}
                  className="message is-small"
                  data-cy="Comment"
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
                      onClick={handleDeleteComment(comment.id)}
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

          {(!isLoading && !isFormShown) && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={handleWriteComment}
            >
              Write a comment
            </button>
          )}
        </div>

        {isFormShown && (
          <NewCommentForm
            selectedPost={selectedPost}
            setComments={setComments}
            setErrorMessage={setErrorMessage}
          />
        )}
      </div>
    </div>
  );
};
