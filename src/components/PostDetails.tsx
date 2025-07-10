import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment, CommentData } from '../types/Comment';
import { Comments } from './Comments';
import { addComment, deleteComment, getComments } from '../api/api';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    getComments(post.id)
      .then(setComments)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, [post.id]);

  const handleDeleteComment = async (commentId: number) => {
    try {
      setComments(current =>
        current.filter(comment => comment.id !== commentId),
      );
      await deleteComment(commentId);
    } catch {
      setIsError(true);
    }
  };

  const addCommentToList = ({ name, email, body }: CommentData) => {
    const newComment = { name, email, body, postId: post.id };

    return addComment(newComment)
      .then(comment => {
        setComments(current => [...current, { ...comment }]);
      })
      .catch(() => setIsError(true));
  };

  const hasComments = comments.length > 0;

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>

        <p data-cy="PostBody">{post.body}</p>
      </div>

      <div className="block">
        {isLoading && <Loader />}

        {isError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {!isError && hasComments && !isLoading && (
          <Comments comments={comments} onDeleteComment={handleDeleteComment} />
        )}

        {!isError && !hasComments && !isLoading && Array.isArray(comments) && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {showForm && !isError && <NewCommentForm onSubmit={addCommentToList} />}

        {!showForm && !isError && !isLoading && (
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
    </div>
  );
};
