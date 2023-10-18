import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { ErrorNotification } from '../types/ErrorNotification';
import { apiActions } from '../utils/apiAction';
import { Comment } from '../types/Comment';

type Props = {
  selectedPost: Post;
  errorNotification: ErrorNotification;
  setErrorNotification: (error: (prevError: ErrorNotification)
  => ErrorNotification) => void;
};

export const PostDetails: React.FC<Props> = ({
  selectedPost,
  setErrorNotification,
  errorNotification,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddComment, setIsAddComment] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsAddComment(false);

    apiActions.getPostComments(selectedPost.id)
      .then(setComments)
      .catch(() => setErrorNotification(
        (prevErr: ErrorNotification) => ({ ...prevErr, comments: true }),
      ))
      .finally(() => setIsLoading(false));
  }, [selectedPost, setErrorNotification]);

  const handleDeleteComment = (id: number) => {
    apiActions.deleteComment(id);
    setComments((current) => (
      current.filter(comment => comment.id !== id)
    ));
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
          {isLoading && (
            <Loader />
          )}

          {errorNotification.comments && !isLoading && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {comments?.length === 0 && !isLoading && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {comments.length !== 0 && !isLoading && (
            <>
              <p className="title is-4">Comments:</p>

              {comments.map((comment) => (
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
                      onClick={() => handleDeleteComment(comment.id)}
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

          {!isAddComment && !isLoading && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsAddComment(true)}
            >
              Write a comment
            </button>
          )}
        </div>
        {isAddComment && (
          <NewCommentForm
            errors={errorNotification}
            onSetComments={setComments}
            onError={setErrorNotification}
            postId={selectedPost.id}
          />
        )}
      </div>
    </div>
  );
};
