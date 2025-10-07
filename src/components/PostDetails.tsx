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
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isWriting, setIsWriting] = useState(false);

  useEffect(() => {
    setHasError(false);
    setIsLoadingComments(true);

    client
      .get<Comment[]>(`/comments?postId=${post.id}`)
      .then(setComments)
      .catch(() => setHasError(true))
      .finally(() => setIsLoadingComments(false));
  }, [post.id]);

  useEffect(() => {
    setIsWriting(false);
  }, [post.id]);

  const handleDelete = (commentId: number) => {
    const removedComment = comments.find(c => c.id === commentId);

    setComments(current => current.filter(c => c.id !== commentId));

    client.delete(`/comments/${commentId}`).catch(() => {
      setComments(current =>
        removedComment ? [...current, removedComment] : current,
      );
    });
  };

  const handleAddComment = (newComment: Comment) => {
    setComments(prev => [...prev, newComment]);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <p data-cy="PostId">
          <strong>Post ID:</strong> {post.id}
        </p>
        <h2 data-cy="PostTitle">
          #{post.id}: {post.title}
        </h2>
        <p data-cy="PostBody">{post.body}</p>
      </div>

      {isLoadingComments && <Loader />}

      {hasError && (
        <div className="notification is-danger" data-cy="CommentsError">
          Something went wrong
        </div>
      )}

      {!hasError && (
        <div className="block">
          {comments.length === 0 && !isLoadingComments ? (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          ) : (
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
                    type="button"
                    className="delete is-small"
                    onClick={() => handleDelete(comment.id)}
                    data-cy="CommentDelete"
                  />
                </div>
                <div className="message-body" data-cy="CommentBody">
                  {comment.body}
                </div>
              </article>
            ))
          )}

          {!isLoadingComments &&
            (!isWriting ? (
              <button
                data-cy="WriteCommentButton"
                type="button"
                className="button is-link"
                onClick={() => setIsWriting(true)}
              >
                Write a comment
              </button>
            ) : (
              <NewCommentForm
                postId={post.id}
                onAddComment={handleAddComment}
              />
            ))}
        </div>
      )}
    </div>
  );
};
