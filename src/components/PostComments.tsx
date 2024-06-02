// PostComments component
import React, { useState, useEffect } from 'react';
import { Comment } from './../types/Comment';
import { NewCommentForm } from './NewCommentForm';
import * as Services from '../utils/fetchClient';

const PostComments: React.FC<{ postId: number }> = ({ postId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    Services.client
      .get<Comment[]>(`/comments?postId=${postId}`)
      .then(fetchedComments => {
        setComments(fetchedComments);
      })
      .finally(() => setIsLoading(false));
  }, [postId]);

  const handleAddComment = (newComment: Comment) => {
    setComments(prevComments => [...prevComments, newComment]);
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <div>
      <h2>Comments</h2>

      {comments.length > 0 && (
        <ul>
          {comments.map(comment => (
            <li key={comment.id}>{comment.body}</li>
          ))}
        </ul>
      )}

      {!isFormVisible && (
        <button onClick={toggleFormVisibility} data-cy="WriteCommentButton">
          Write a comment
        </button>
      )}

      {isFormVisible && (
        <NewCommentForm
          isLoading={isLoading}
          postId={postId}
          onAddComment={handleAddComment}
          setIsLoading={setIsLoading}
          isFormVisible={isFormVisible}
        />
      )}
    </div>
  );
};

export default PostComments;
