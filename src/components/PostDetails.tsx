import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import {
  createComment,
  getCommentsByPostId,
  removeComment,
} from '../services/comment';
import { Comment } from '../types/Comment';

type Props = {
  selectedPost: Post;
};

export const PostDetails: React.FC<Props> = ({ selectedPost }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [errMsg, setErrMsg] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  const deleteComment = (comment: Comment) => {
    setComments(current => current.filter(c => c.id !== comment.id));
    setDeleteError('');

    return removeComment(comment.id).catch(() => {
      setDeleteError('Cannot delete comment');
      setTimeout(() => {
        setDeleteError('');
      }, 3000);
      setComments(comments);
    });
  };

  const addComment = (comment: Comment) => {
    return createComment(comment)
      .then(newComment => {
        setComments(current => [...current, newComment]);
      })
      .catch(err => {
        throw err;
      });
  };

  useEffect(() => {
    setIsLoading(true);
    setShowForm(false);

    if (selectedPost) {
      getCommentsByPostId(selectedPost.id)
        .then(setComments)
        .catch(() => setErrMsg('Something went wrong!'))
        .finally(() => setIsLoading(false));
    }
  }, [selectedPost]);

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

        {!isLoading && errMsg && (
          <div className="notification is-danger" data-cy="CommentsError">
            {errMsg}
          </div>
        )}

        {!isLoading && !errMsg && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {!isLoading && !errMsg && comments.length > 0 && (
          <>
            <p className="title is-4">Comments:</p>

            {comments.map(comment => (
              <article
                key={comment.id}
                className="message is-small"
                data-cy="Comment"
              >
                <div className="message-header">
                  <a data-cy="CommentAuthor" href={`mailto:${comment.email}`}>
                    {comment.name}
                  </a>
                  <button
                    data-cy="CommentDelete"
                    type="button"
                    className="delete is-small"
                    aria-label="delete"
                    onClick={() => deleteComment(comment)}
                  >
                    delete button
                  </button>
                </div>
                <div className="message-body" data-cy="CommentBody">
                  {comment.body}
                </div>
              </article>
            ))}
            {deleteError && (
              <div className="notification is-danger">{deleteError}</div>
            )}
          </>
        )}

        {!isLoading && !errMsg && !showForm && (
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

      {showForm && (
        <NewCommentForm
          onSubmit={addComment}
          post={selectedPost}
          comments={comments}
        />
      )}
    </div>
  );
};
