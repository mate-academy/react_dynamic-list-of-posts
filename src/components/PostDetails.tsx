import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { getComment, deleteComment } from '../api/comment';
import { CommentList } from './CommentList';

type Props = {
  selectedPost: Post;
};

export const PostDetails: React.FC<Props> = ({ selectedPost }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (!selectedPost.id) {
      return;
    }

    setIsLoading(true);
    setShowForm(false);
    setComments([]);

    getComment(selectedPost.id)
      .then(setComments)
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, [selectedPost.id]);

  const handleDelete = (commentId: number) => {
    deleteComment(commentId).then(() => {
      setComments(currentComments =>
        currentComments.filter(comment => comment.id !== commentId),
      );
    });
  };

  const handleShowFrom = () => {
    setShowForm(true);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            #{selectedPost.id}: {selectedPost.title}
          </h2>

          <p data-cy="PostBody">{selectedPost.body}</p>
        </div>

        <div className="block">
          {isLoading && <Loader />}

          {error && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!comments.length && !isLoading && !error && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {!!comments.length && (
            <>
              <p className="title is-4">Comments:</p>
              <CommentList comments={comments} handleDelete={handleDelete} />
            </>
          )}

          {!error && !isLoading && !showForm && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={handleShowFrom}
            >
              Write a comment
            </button>
          )}
        </div>

        {showForm && (
          <NewCommentForm
            postId={selectedPost.id}
            setComment={setComments}
            setError={setError}
          />
        )}
      </div>
    </div>
  );
};
