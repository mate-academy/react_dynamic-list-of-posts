import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import * as Services from '../utils/fetchClient';
import { Post } from '../types/Post';
import { Comment } from './../types/Comment';

type PostDetailsProps = {
  selectedPost: Post | null;
};

export const PostDetails: React.FC<PostDetailsProps> = ({ selectedPost }) => {
  const [comments = [], setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    if (selectedPost) {
      Services.client
        .get<Comment[]>(`/comments?postId=${selectedPost?.id}`)
        .then(fetchedComment => setComments(fetchedComment))
        .catch(() => setError(error))
        .finally(() => setIsLoading(false));
    }
  }, [error, selectedPost, selectedPost?.id]);

  const openNewCommentForm = () => {
    setIsFormVisible(true);
  };

  const handleDeleteComment = (commentId: number) => {
    Services.client
      .delete(`/comments/${commentId}`)
      .then(() => {
        setComments(prevComments =>
          prevComments.filter(comment => comment.id !== commentId),
        );
      })
      .catch(() => setError('Failed to delete comment'));
  };

  const handleAddComment = (newComment: Comment) => {
    setComments(prevComments => [...prevComments, newComment]);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${selectedPost?.id}: ${selectedPost?.title}`}</h2>

          <p data-cy="PostBody">{selectedPost?.body}</p>
        </div>

        {isLoading && <Loader />}
        <div className="block">
          {error && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {selectedPost && !isLoading && comments?.length === 0 && !error && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          <p className="title is-4">Comments:</p>
          {comments?.map(comment => (
            <article
              key={comment.id}
              className="message is-small"
              data-cy="Comment"
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
                  onClick={() => handleDeleteComment(comment.id)}
                >
                  delete comment
                </button>
              </div>

              <div className="message-body" data-cy="CommentBody">
                {comment.body}
              </div>
            </article>
          ))}

          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={openNewCommentForm}
          >
            Write a comment
          </button>
        </div>
        {isFormVisible && (
          <NewCommentForm
            isLoading={isLoading}
            postId={selectedPost?.id}
            onAddComment={handleAddComment}
          />
        )}
      </div>
    </div>
  );
};
