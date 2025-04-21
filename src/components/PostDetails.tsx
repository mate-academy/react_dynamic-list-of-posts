import React, { useCallback, useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { User } from '../types/User';
import { addComment, deleteComment, getComments } from '../api/comments';
import { Comment as PostComment } from '../types/Comment';
import { CommentComponent } from './CommentComponent';

interface Props {
  selectedPost: Post;
  selectedUser: User | null;
}

export const PostDetails: React.FC<Props> = React.memo(({ selectedPost }) => {
  const [comments, setComments] = useState<PostComment[]>([]);
  const [formActive, setFormActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleDelete = useCallback(async (deleteId: number) => {
    setErrorMessage('');

    try {
      await deleteComment(deleteId);

      setComments(currentComments =>
        currentComments.filter(comment => comment.id !== deleteId),
      );
    } catch (error) {
      setErrorMessage('Failed to delete comment');
    }
  }, []);

  const handleAdd = useCallback(async (newData: PostComment) => {
    setErrorMessage('');
    const delayTimer = setTimeout(() => setLoading(true), 200);

    try {
      const response = await addComment(newData);

      setComments(currentComments => [...currentComments, response]);
    } catch (error) {
      setErrorMessage('Something went wrong!');
    } finally {
      clearTimeout(delayTimer);
      setTimeout(() => setLoading(false), 500);
    }
  }, []);

  useEffect(() => {
    setErrorMessage('');
    const delayTimer = setTimeout(() => setLoading(true), 200);

    getComments(selectedPost.id)
      .then(setComments)
      .catch(() => {
        setErrorMessage('Something went wrong!');
      })
      .finally(() => {
        clearTimeout(delayTimer);
        setTimeout(() => setLoading(false), 500);
      });
  }, [selectedPost]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${selectedPost.id}: ${selectedPost.title}`}
          </h2>

          <p data-cy="PostBody">{selectedPost.body}</p>
        </div>

        <div className="block">
          {loading && <Loader />}

          {!loading && errorMessage && (
            <div className="notification is-danger" data-cy="CommentsError">
              {errorMessage}
            </div>
          )}

          {!loading && Boolean(!comments.length) && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {!loading && Boolean(comments.length) && (
            <p className="title is-4">Comments:</p>
          )}

          {!loading &&
            Boolean(comments.length) &&
            comments.map(comment => (
              <CommentComponent
                key={comment.id}
                comment={comment}
                handleDelete={handleDelete}
              />
            ))}

          {!formActive && !loading && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setFormActive(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {formActive && !errorMessage && (
          <NewCommentForm
            selectedPostId={selectedPost.id}
            handleAdd={handleAdd}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
});

PostDetails.displayName = 'PostDetails';
