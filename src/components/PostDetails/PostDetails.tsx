import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { NewCommentForm } from '../NewCommentForm';
import { Post } from '../../types/Post';
import { Comment, CommentData } from '../../types/Comment';
import { createComment, deleteComment, getComments } from '../../utils/Api';
import { CommentItem } from '../CommentItem';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    setIsFormOpen(false);
    setComments([]);
    setErrorMessage('');
    setLoading(true);

    getComments(post.id)
      .then(setComments)
      .catch(() => {
        setErrorMessage('Something went wrong!');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [post.id]);

  const addComment = (data: CommentData) => {
    return createComment(post.id, data).then(newComment => {
      setComments(currentComments => [...currentComments, newComment]);
    });
  };

  const removeComment = (commentId: number) => {
    const currentComments = comments;

    setComments(current => current.filter(comment => comment.id !== commentId));

    return deleteComment(commentId).catch(() => {
      setComments(currentComments);
    });
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>

          <p data-cy="PostBody">{post.body}</p>
        </div>

        <div className="block">
          {loading && <Loader />}

          {!loading && errorMessage && (
            <div className="notification is-danger" data-cy="CommentsError">
              {errorMessage}
            </div>
          )}

          {!loading && !errorMessage && comments.length === 0 && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {comments.length > 0 && <p className="title is-4">Comments:</p>}

          {comments.map(comment => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onDeleteComment={removeComment}
            />
          ))}

          {!loading && !isFormOpen && !errorMessage && (
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

        {isFormOpen && <NewCommentForm onAddComment={addComment} />}
      </div>
    </div>
  );
};
