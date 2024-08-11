import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { getComment, deleteComment } from '../api/comment';

type Props = {
  selectedPost: Post;
};

export const PostDetails: React.FC<Props> = ({ selectedPost }) => {
  const [comment, setComment] = useState<Comment[]>([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (!selectedPost.id) {
      return;
    }

    setIsLoading(true);
    setShowForm(false);
    setComment([]);

    getComment(selectedPost.id)
      .then(setComment)
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, [selectedPost.id]);

  const handleDelete = (commentId: number) => {
    deleteComment(commentId).then(() => {
      setComment(currentComments =>
        currentComments.filter(comments => comments.id !== commentId),
      );
    });
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            #{selectedPost.id}: {selectedPost.title}
          </h2>

          <p data-cy="PostBody">{selectedPost.body}</p>
        </div>

        <div className="block">
          {isLoading && <Loader />}

          {error && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!comment.length && !isLoading && !error && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {!!comment.length && (
            <>
              <p className="title is-4">Comments:</p>

              {comment.map(comments => (
                <article
                  className="message is-small"
                  data-cy="Comment"
                  key={comments.id}
                >
                  <div className="message-header">
                    <a
                      href={`mailto:${comments.email}`}
                      data-cy="CommentAuthor"
                    >
                      {comments.name}
                    </a>
                    <button
                      data-cy="CommentDelete"
                      type="button"
                      className="delete is-small"
                      aria-label="delete"
                      onClick={() => handleDelete(comments.id)}
                    >
                      delete button
                    </button>
                  </div>

                  <div className="message-body" data-cy="CommentBody">
                    {comments.body}
                  </div>
                </article>
              ))}
            </>
          )}

          {!error && !isLoading && !showForm && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setShowForm(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {showForm && (
          <NewCommentForm
            postId={selectedPost.id}
            setComment={setComment}
            setError={setError}
          />
        )}
      </div>
    </div>
  );
};
