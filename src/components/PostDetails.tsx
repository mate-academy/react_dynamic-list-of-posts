import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';
import { Comment } from '../types/Comment';

interface Props {
  post: Post;
}

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [commentsError, setCommentsError] = useState(false);
  const [addCommentError, setAddCommentError] = useState(false);
  const [deleteCommentError, setDeleteCommentError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setAddCommentError(false);
    setDeleteCommentError(false);
    setCommentsError(false);
    setShowForm(false);

    client
      .get<Comment[]>(`/comments?postId=${post.id}`)
      .then(setComments)
      .catch(() => setCommentsError(true))
      .finally(() => setIsLoading(false));
  }, [post.id]);

  const deleteComment = (id: number) => {
    const backup = [...comments];

    setDeleteCommentError(false);
    setComments(prev => prev.filter(c => c.id !== id));

    client.delete(`/comments/${id}`).catch(() => {
      setComments(backup);
      setDeleteCommentError(true);
    });
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>

        <p data-cy="PostBody">{post.body}</p>
      </div>

      <div className="block">
        {isLoading && <Loader />}

        {commentsError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {!isLoading && !commentsError && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {addCommentError && (
          <div className="notification is-danger">Unable to add a comment</div>
        )}

        {deleteCommentError && (
          <div className="notification is-danger">
            Unable to delete a comment
          </div>
        )}

        <p className="title is-4">Comments:</p>

        {comments.map(comment => (
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
                onClick={() => deleteComment(comment.id)}
              >
                delete button
              </button>
            </div>

            <div className="message-body" data-cy="CommentBody">
              {comment.body}
            </div>
          </article>
        ))}

        {!isLoading && !showForm && !commentsError && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setShowForm(true)}
          >
            Write a comment
          </button>
        )}

        {showForm && (
          <NewCommentForm
            onAdd={comment => {
              setComments(prev => [...prev, comment]);
              setAddCommentError(false);
            }}
            postId={post.id}
            onError={() => setAddCommentError(true)}
          />
        )}
      </div>
    </div>
  );
};
