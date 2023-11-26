import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { deleteComment, getComments } from '../services/comments';
import { Comment } from '../types/Comment';

type Props = {
  selectedPost: Post | null;
};

export const PostDetails: React.FC<Props> = ({
  selectedPost,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCommentsError, setIsCommentsError] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleSetError = () => {
    setIsCommentsError(true);
  };

  const loadCommentsFromServer = (post: Post) => {
    setIsLoading(true);

    getComments(post.id)
      .then(() => setComments)
      .catch(() => setIsCommentsError(true))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (selectedPost) {
      setIsCommentsError(false);
      setComments([]);
      loadCommentsFromServer(selectedPost);
    }
  }, [selectedPost]);

  const addNewComment = (newComment: Comment) => {
    setComments(currentComments => [...currentComments, newComment]);
  };

  const handleDeleteComment = (id: number) => {
    deleteComment(id)
      .then(() => setComments(currentComments => currentComments
        .filter(comment => comment.id !== id)))
      .catch(() => setIsCommentsError(curr => curr));
  };

  if (!selectedPost) {
    return null;
  }

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

          {isCommentsError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {comments.length === 0 && !isLoading && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {comments.length !== 0 && !isLoading && (
            <>
              <p className="title is-4">Comments:</p>
              {comments.map(comment => (
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

          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setIsFormOpen(true)}
          >
            Write a comment
          </button>
        </div>

        {isFormOpen && (
          <NewCommentForm
            selectedPost={selectedPost}
            addNewComment={addNewComment}
            handleSetError={handleSetError}
          />
        )}
      </div>
    </div>
  );
};
