/* eslint-disable @typescript-eslint/indent */
import React, { useEffect, useState } from 'react';

import { NewCommentForm } from './NewCommentForm';
import { client } from '../utils/fetchClient';
import { Loader } from './Loader';
import { Post } from 'types/Post';
import { Comment } from 'types/Comment';
import { CommentItem } from './CommentItem';

type Props = {
  selectedPost: Post;
};

export const PostDetails: React.FC<Props> = ({ selectedPost }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setComments([]);
    setIsFormVisible(false);
    setError(null);

    client
      .get<Comment[]>(`/comments?postId=${selectedPost.id}`)
      .then(setComments)
      .catch(() => setError('Unable to load comments'))
      .finally(() => setIsLoading(false));
  }, [selectedPost]);

  const addComment = (comment: Omit<Comment, 'id' | 'postId'>) => {
    setIsSubmitting(true);
    const { name, email, body } = comment;

    return client
      .post<Comment>('/comments/', {
        name,
        email,
        body,
        postId: selectedPost.id,
      })
      .then(newComment => setComments([...comments, newComment]))
      .catch(() => setError('Unable to add a comment'))
      .finally(() => setIsSubmitting(false));
  };

  const handleDeleteComment = (id: number) => {
    setComments(comments.filter(comment => comment.id !== id));

    client
      .delete(`/comments/${id}`)
      .catch(() => setError('Unable to delete a comment'));
  };

  const hasComments = comments.length > 0;

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          {`#${selectedPost.id}: ${selectedPost.title}`}
        </h2>

        <p data-cy="PostBody">{selectedPost.body}</p>
      </div>

      <div className="block">
        {isLoading && <Loader />}
        {!isLoading && error ? (
          <div className="notification is-danger" data-cy="CommentsError">
            {error}
          </div>
        ) : (
          <>
            {!isLoading && !hasComments && (
              <p className="title is-4" data-cy="NoCommentsMessage">
                No comments yet
              </p>
            )}

            {hasComments && (
              <>
                <p className="title is-4">Comments:</p>
                {comments.map(comment => (
                  <CommentItem
                    key={comment.id}
                    comment={comment}
                    handleDeleteComment={handleDeleteComment}
                  />
                ))}
              </>
            )}

            {!isLoading && !isFormVisible && (
              <button
                data-cy="WriteCommentButton"
                type="button"
                className="button is-link"
                onClick={() => setIsFormVisible(true)}
              >
                Write a comment
              </button>
            )}
          </>
        )}
      </div>

      {isFormVisible && (
        <NewCommentForm onSubmit={addComment} isSubmitting={isSubmitting} />
      )}
    </div>
  );
};
