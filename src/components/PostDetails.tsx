import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import * as service from '../api/api';
import { Comment } from '../types/Comment';

interface Props {
  selectedPost: Post,
}

export const PostDetails: React.FC<Props> = ({ selectedPost }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isCommentFormOpen, setIsCommentFormOpen] = useState(false);
  const isComments = comments.length > 0;

  useEffect(() => {
    setIsError(false);
    setIsLoading(true);
    setIsCommentFormOpen(false);

    service.getComments(selectedPost.id)
      .then(setComments)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, [selectedPost.id, setComments]);

  const handleDeleteComment = (comment: Comment) => {
    setComments((prev) => prev.filter(com => com.id !== comment.id));

    service.deleteComment(comment.id)
      .catch(() => {
        setComments(comments);
        setIsError(true);
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

          {isError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!isComments && !isLoading && !isError && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {isComments && !isLoading && !isError && (
            <p className="title is-4">Comments:</p>
          )}

          {!isError && (
            comments.map(comment => (
              <article className="message is-small" data-cy="Comment">
                <div className="message-header">
                  <a href={`mailto:${comment.email}`} data-cy="CommentAuthor">
                    {comment.name}
                  </a>
                  <button
                    data-cy="CommentDelete"
                    type="button"
                    className="delete is-small"
                    aria-label="delete"
                    onClick={() => handleDeleteComment(comment)}
                  >
                    delete button
                  </button>
                </div>
                <div className="message-body" data-cy="CommentBody">
                  {comment.body}
                </div>
              </article>
            ))
          )}

          {!isCommentFormOpen && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsCommentFormOpen(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {isCommentFormOpen && !isError && (
          <NewCommentForm
            setIsError={setIsError}
            setComments={setComments}
            postId={selectedPost.id}
          />
        )}
      </div>
    </div>
  );
};
