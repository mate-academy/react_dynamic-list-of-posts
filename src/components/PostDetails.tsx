import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { deleteComment, getComments, postComment } from '../api/comments';
import { Comment, CommentData } from '../types/Comment';

type Props = {
  selectedPost: Post;
};

export const PostDetails: React.FC<Props> = ({ selectedPost }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    getComments(selectedPost.id)
      .then(setComments)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));

    setIsFormOpen(false);
  }, [selectedPost]);

  const handleNewComment = (comment: CommentData): Promise<void> => {
    return postComment(comment, selectedPost.id)
      .then(newComment => {
        setComments(prev => [...prev, newComment]);
      })
      .catch(() => Promise.reject());
  };

  const handleDeleteComment = (id: number) => {
    const deletingComment = comments.find(comment => comment.id === id);

    if (deletingComment) {
      setComments(prev => prev.filter(comment => comment.id !== id));
      deleteComment(id).catch(() => {
        setComments(prev => [...prev, deletingComment]);
      });
    }
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${selectedPost?.id}: ${selectedPost?.title}`}</h2>

          <p data-cy="PostBody">{selectedPost?.body}</p>
        </div>

        <div className="block">
          {isLoading && <Loader />}

          {isError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!isError && selectedPost && !isLoading && !comments.length && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}
          {!isLoading && comments.length > 0 && (
            <p className="title is-4">Comments:</p>
          )}

          {!isLoading &&
            comments.map(comment => (
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
        </div>

        {isFormOpen && !isLoading && (
          <NewCommentForm onSubmitForm={handleNewComment} />
        )}

        {!isError && !isFormOpen && !isLoading && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setIsFormOpen(true)}
          >
            Write a comment
          </button>
        )}
      </div>
    </div>
  );
};
