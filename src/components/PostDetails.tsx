// PostDetails component
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import * as Services from '../utils/fetchClient';
import { Post } from '../types/Post';
import { Comment } from './../types/Comment';

type PostDetailsProps = {
  selectedPost: Post | null;
  isFormVisible: boolean;
  setIsFormVisible: Dispatch<SetStateAction<boolean>>;
  isDetailOpen: boolean;
};

export const PostDetails: React.FC<PostDetailsProps> = ({
  selectedPost,
  isFormVisible,
  setIsFormVisible,
  isDetailOpen,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (selectedPost) {
      setIsLoading(true);
      setError('');
      setIsFormVisible(false); // Reset form visibility when a new post is selected
      Services.client
        .get<Comment[]>(`/comments?postId=${selectedPost.id}`)
        .then(fetchedComments => setComments(fetchedComments))
        .catch(() => setError('Failed to load comments'))
        .finally(() => setIsLoading(false));
    }
  }, [selectedPost, setIsFormVisible]);

  const openNewCommentForm = () => {
    setIsFormVisible(true);
  };

  const handleAddComment = (newComment: Comment) => {
    setComments(prevComments => [...prevComments, newComment]);
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

  useEffect(() => {
    setIsFormVisible(false); // Close form when a new post is selected
  }, [selectedPost, setIsFormVisible]);

  return (
    <>
      {isDetailOpen && (
        <div className="content" data-cy="PostDetails">
          <div className="block">
            <h2 data-cy="PostTitle">{`#${selectedPost?.id}: ${selectedPost?.title}`}</h2>
            <p data-cy="PostBody">{selectedPost?.body}</p>
          </div>

          <div className="block">
            {isLoading && <Loader />}
            {error && (
              <div className="notification is-danger" data-cy="CommentsError">
                {error}
              </div>
            )}

            {selectedPost && !isLoading && comments.length === 0 && !error && (
              <p className="title is-4" data-cy="NoCommentsMessage">
                No comments yet
              </p>
            )}

            {comments.map(comment => (
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

            {!error && !isFormVisible && !isLoading && (
              <button
                data-cy="WriteCommentButton"
                type="button"
                className="button is-link"
                onClick={openNewCommentForm}
              >
                Write a comment
              </button>
            )}

            {isFormVisible && selectedPost && (
              <NewCommentForm
                isLoading={isLoading}
                postId={selectedPost.id}
                onAddComment={handleAddComment}
                setIsLoading={setIsLoading}
                isFormVisible={isFormVisible}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};
