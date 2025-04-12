import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { client } from '../utils/fetchClient';

type PostDetailsProps = {
  post: {
    id: number;
    title: string;
    body: string;
  };
};

type Comment = {
  id: number;
  name: string;
  email: string;
  body: string;
};

export const PostDetails: React.FC<PostDetailsProps> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    client
      .get<Comment[]>(`/posts/${post.id}/comments`)
      .then(data => setComments(data))
      .catch(() => setError('Failed to load comments'))
      .finally(() => setIsLoading(false));
  }, [post.id]);

  const handleDelete = (commentId: number) => {
    setComments(prev => prev.filter(comment => comment.id !== commentId));
    // Optionally handle API call for deletion here
  };

  const handleNewComment = (newComment: {
    name: string;
    email: string;
    body: string;
  }) => {
    const commentWithId: Comment = {
      ...newComment,
      id: Date.now(), // Generate a unique ID for the new comment
    };

    setComments(prev => [...prev, commentWithId]);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>
        <p data-cy="PostBody">{post.body}</p>
      </div>

      <div className="block">
        {isLoading ? (
          <Loader />
        ) : error ? (
          <div className="notification is-danger" data-cy="CommentsError">
            {error}
          </div>
        ) : comments.length === 0 ? (
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
                  <a href={`mailto:${comment.email}`} data-cy="CommentAuthor">
                    {comment.name}
                  </a>
                  <button
                    data-cy="CommentDelete"
                    type="button"
                    className="delete is-small"
                    aria-label="delete"
                    onClick={() => handleDelete(comment.id)}
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
          onClick={() => setIsFormVisible(!isFormVisible)}
        >
          Write a comment
        </button>
      </div>

      {isFormVisible && (
        <NewCommentForm
          onSubmit={async newComment => {
            handleNewComment(newComment);

            return Promise.resolve();
          }}
        />
      )}
    </div>
  );
};
