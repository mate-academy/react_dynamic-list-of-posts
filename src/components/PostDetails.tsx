import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { deleteComment, getComments } from '../api/api';

export interface Props {
  post: Post;
}

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const title = `#${post.id}: ${post.title}`;
  const showButton = !isLoading && !showForm && !isError;

  useEffect(() => {
    setIsLoading(true);
    getComments(post)
      .then(setComments)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const handleChangeButton = () => {
    setShowForm(true);
  };

  const handleAddComment = (v: Comment) => {
    setComments([...comments, v]);
  };

  const handleDeleteComment = async (com: Comment) => {
    setComments(prev => prev.filter(e => e.id !== com.id));
    try {
      await deleteComment(com);
    } catch {
      setIsError(true);
    }
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{title}</h2>

        <p data-cy="PostBody">{post.body}</p>
      </div>

      <div className="block">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {isError ? (
              <div className="notification is-danger" data-cy="CommentsError">
                Something went wrong
              </div>
            ) : (
              <>
                {comments.length === 0 ? (
                  <p className="title is-4" data-cy="NoCommentsMessage">
                    No comments yet
                  </p>
                ) : (
                  <>
                    <p className="title is-4">Comments:</p>

                    {comments.map(comment => (
                      <article
                        className="message is-small"
                        data-cy="Comment"
                        key={comment.id}
                      >
                        <div className="message-header">
                          <a
                            href={`mailto:${comment.email}`}
                            data-cy="CommentAuthor"
                          >
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
                    ))}
                  </>
                )}
              </>
            )}
          </>
        )}

        {showButton && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={handleChangeButton}
          >
            Write a comment
          </button>
        )}
      </div>

      {showForm && (
        <NewCommentForm postId={post.id} onAddComment={handleAddComment} />
      )}
    </div>
  );
};
