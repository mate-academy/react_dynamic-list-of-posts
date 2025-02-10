import React, { useEffect, useState } from 'react';
import * as postService from '../api/data';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { CommentItem } from './CommentItem';
import { Comment } from '../types/Comment';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [shouldFormBeVisible, setShouldFormBeVisile] = useState(false);
  const [comments, setComments] = useState<Comment[] | null>(null);

  function loadComments(postId: number) {
    setErrorMessage('');
    setIsLoading(true);
    setComments(null);
    postService
      .getComments(postId)
      .then(data => {
        setComments(data);
      })
      .catch(() => setErrorMessage('Something went wrong!'))
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    loadComments(post.id);
    setShouldFormBeVisile(false);
  }, [post.id]);

  const handleDelete = (commentId: number) => {
    if (comments) {
      setComments(prevComments =>
        prevComments
          ? prevComments.filter(comment => comment.id !== commentId)
          : null,
      );
    }
  };

  const addNewComment = (newComment: Comment) => {
    if (comments) {
      setComments(prevComments =>
        prevComments ? [...prevComments, newComment] : [newComment],
      );
    }
  };

  const handleWriteComment = () => {
    setShouldFormBeVisile(true);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>

          <p data-cy="PostBody">{post.body}</p>
        </div>

        <div className="block">
          {isLoading && <Loader />}

          {errorMessage && !isLoading && (
            <div className="notification is-danger" data-cy="CommentsError">
              {errorMessage}
            </div>
          )}

          {comments?.length === 0 && !isLoading && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {comments && comments.length > 0 && (
            <>
              <p className="title is-4">Comments:</p>

              {comments.map(comment => (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  onDelete={handleDelete}
                  onError={setErrorMessage}
                />
              ))}
            </>
          )}
          {!shouldFormBeVisible && !isLoading && !errorMessage && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={handleWriteComment}
            >
              Write a comment
            </button>
          )}
        </div>

        {shouldFormBeVisible && (
          <NewCommentForm
            postId={post.id}
            onSubmit={addNewComment}
            onError={setErrorMessage}
          />
        )}
      </div>
    </div>
  );
};
