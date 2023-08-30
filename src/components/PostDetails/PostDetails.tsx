import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { NewCommentForm } from '../NewCommentForm/NewCommentForm';
import { Post } from '../../types/Post';
import { deleteComments, getComments } from '../../services/comments';
import { Comment } from '../../types/Comment';

type Props = {
  selectedPost: Post;
  isFormShowed: boolean;
  setFormShowed: (value: boolean) => void;
};

export const PostDetails: React.FC<Props> = ({
  selectedPost,
  isFormShowed,
  setFormShowed,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setErrorMessage('');
    setLoading(true);
    getComments(selectedPost.id)
      .then(setComments)
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setLoading(false));
  }, [selectedPost]);

  const handleWriteComment = () => {
    setFormShowed(true);
  };

  const handleDeleteComment = (commentId: number) => () => {
    setComments(currentComment => {
      return currentComment.filter(c => c.id !== commentId);
    });
    deleteComments(commentId)
      .catch(() => {
        setComments(comments);
        setErrorMessage('Can\'t add a comment, try again later');
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
            {selectedPost.body}
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

              {comments.map(currentComment => (
                <article
                  key={currentComment.id}
                  className="message is-small"
                  data-cy="Comment"
                >
                  <div className="message-header">
                    <a href={`mailto:${currentComment.email}`} data-cy="CommentAuthor">
                      {currentComment.name}
                    </a>
                    <button
                      data-cy="CommentDelete"
                      type="button"
                      className="delete is-small"
                      aria-label="delete"
                      onClick={handleDeleteComment(currentComment.id)}
                    >
                      delete button
                    </button>
                  </div>

                  <div className="message-body" data-cy="CommentBody">
                    {currentComment.body}
                  </div>
                </article>
              ))}
            </>
          )}

          {(!isLoading && !isFormShowed) && (
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

        {isFormShowed && (
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
