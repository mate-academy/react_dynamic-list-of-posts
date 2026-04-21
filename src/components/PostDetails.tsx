import React, { useState, useEffect } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const deleteComment = (commentId: number) => {
    const deletedComment = comments.find(c => c.id === commentId);

    setComments(currentComments =>
      currentComments.filter(comment => comment.id !== commentId),
    );
    client.delete(`/comments/${commentId}`).catch(() => {
      if (deletedComment) {
        setComments(current => [...current, deletedComment]);
      }

      setHasError(true);
    });
  };

  useEffect(() => {
    const loadComments = async () => {
      setIsLoading(true);
      setShowForm(false);

      try {
        const data = await client.get<Comment[]>(`/comments?postId=${post.id}`);

        setComments(data);
        setHasError(false);
      } catch {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadComments();
  }, [post.id]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          #{post.id}: {post.title}
        </h2>

        <p data-cy="PostBody">{post.body}</p>
      </div>

      <div className="block">
        {isLoading && <Loader />}

        {hasError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {!isLoading && !hasError && comments.length === 0 && (
          <>
            <p data-cy="NoCommentsMessage">No comments yet</p>
            <p className="title is-4">Comments:</p>
          </>
        )}
        {!isLoading &&
          !hasError &&
          comments.length > 0 &&
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
                  onClick={() => {
                    deleteComment(comment.id);
                  }}
                >
                  delete button
                </button>
              </div>

              <div className="message-body" data-cy="CommentBody">
                {comment.body}
              </div>
            </article>
          ))}

        {!isLoading && !hasError && !showForm && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => {
              setShowForm(true);
            }}
          >
            Write a comment
          </button>
        )}
      </div>

      {showForm && (
        <NewCommentForm
          postId={post.id}
          onCommentAdded={newComment => {
            setComments(current => [...current, newComment]);
          }}
        />
      )}
    </div>
  );
};
