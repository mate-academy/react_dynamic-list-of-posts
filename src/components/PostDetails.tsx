import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment, CommentData } from '../types/Comment';
import { CommentsList } from './CommentsList';
import { client } from '../utils/fetchClient';
import { ApiError } from '../types/ApiError';
import { isApiError } from '../utils/isApiError';
import { postShape } from '../types/propShapes';

interface PostDetailsProps {
  activePost: Post;
}

export const PostDetails: React.FC<PostDetailsProps> = ({ activePost }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const isLoaded = !isLoading && !hasError;

  useEffect(() => {
    async function loadComments() {
      try {
        const data = await client.get<Comment[] | ApiError>(
          `/comments?postId=${activePost.id}`,
        );

        if (isApiError(data)) {
          throw new Error(data.error);
        }

        setComments(data);
      } catch {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    }

    loadComments();
  }, [activePost.id]);

  const handleDeleteComment = async (comment: Comment) => {
    setComments(current => current.filter(item => item.id !== comment.id));

    try {
      const result = await client.delete(`/comments/${comment.id}`);

      if (isApiError(result)) {
        throw new Error(result.error);
      }
    } catch {
      setComments(current => [...current, comment]);
    }
  };

  const handleNewComment = async (data: CommentData) => {
    const response = await client.post<Comment | ApiError>('/comments', {
      ...data,
      postId: activePost.id,
    });

    if (isApiError(response)) {
      throw new Error(response.error);
    }

    setComments(current => [...current, response]);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          #{activePost.id}: {activePost.title}
        </h2>

        <p data-cy="PostBody">{activePost.body}</p>
      </div>

      <div className="block">
        {isLoading && <Loader />}

        {hasError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {isLoaded && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {isLoaded && comments.length > 0 && (
          <p className="title is-4">Comments:</p>
        )}

        <CommentsList
          comments={comments}
          onDeleteComment={handleDeleteComment}
        />

        {isLoaded && !isFormOpen && (
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

      {isFormOpen && <NewCommentForm onNewComment={handleNewComment} />}
    </div>
  );
};

PostDetails.propTypes = {
  activePost: postShape.isRequired,
};
