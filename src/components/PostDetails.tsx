import React, { useEffect, useState } from 'react';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { deleteComment, getComments } from '../api/comments';
import { Comment } from '../types/Comment';
import { Loader } from './Loader';

type Props = {
  activePost: Post | null;
};

export const PostDetails: React.FC<Props> = ({ activePost }) => {
  const [postComments, setPostComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!activePost) {
      return;
    }

    setIsLoading(true);

    getComments(activePost?.id)
      .then(setPostComments)
      .catch(() => {
        setErrorMessage('Unable to load posts');
      })
      .finally(() => setIsLoading(false));
  }, [activePost, setErrorMessage]);

  const handleFormOpen = () => {
    setIsFormOpen(prev => !prev);
  };

  const handleCommentAdded = () => {
    if (!activePost) {
      return;
    }

    getComments(activePost.id)
      .then(setPostComments)
      .catch(() => {
        setErrorMessage('Unable to load comments');
      });
  };

  const handleDeleteComment = (commentId: number) => {
    const commentToDelete = postComments.find(
      comment => comment.id === commentId,
    );

    setPostComments(prev => prev.filter(comment => comment.id !== commentId));

    deleteComment(commentId).catch(() => {
      setErrorMessage('Unable to delete comment');

      if (commentToDelete) {
        setPostComments(prev => [...prev, commentToDelete]);
      }
    });
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            #{activePost?.id}: {activePost?.title}
          </h2>

          <p data-cy="PostBody">{activePost?.body}</p>
        </div>

        <div className="block">
          {/* <Loader />

          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>

          */}

          {isLoading ? (
            <Loader />
          ) : errorMessage ? (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          ) : postComments.length === 0 ? (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          ) : (
            <>
              <p className="title is-4">Comments:</p>

              {postComments.map(comment => (
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
        </div>
        {activePost && !isLoading && !errorMessage && !isFormOpen && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={handleFormOpen}
          >
            Write a comment
          </button>
        )}

        {activePost && isFormOpen && (
          <NewCommentForm
            postId={activePost.id}
            onCommentAdded={handleCommentAdded}
          />
        )}
      </div>
    </div>
  );
};
