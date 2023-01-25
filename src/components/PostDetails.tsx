import React, { useState, useEffect } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { NewComment } from './NewComment';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { deleteComment, getComments } from '../api/comments';

type Props = {
  post: Post | null;
  setError: (message: string) => void;
  error: string;
};

export const PostDetails: React.FC<Props> = ({
  post,
  setError,
  error,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isNewComment, setIsNewComment] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loadApiComments = async (postId: number) => {
    try {
      setIsLoading(true);
      const data = await getComments(postId);

      setError('');
      setComments(data);
    } catch {
      setError('Something went wrong!');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (post?.id) {
      loadApiComments(post.id);
      setError('');
      setIsNewComment(false);
      setComments([]);
    }
  }, [post?.id]);

  const handleDelete = (commentId: number) => {
    deleteComment(commentId);
    setComments((current) => {
      return current.filter(comment => comment.id !== commentId);
    });
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          {post && (
            <h2 data-cy="PostTitle">
              {`#${post?.id}: ${post?.title}`}
            </h2>
          )}

          <p data-cy="PostBody">
            {post?.body}
          </p>
        </div>

        <div className="block">
          {isLoading && (<Loader />)}

          {error !== '' && error !== 'No comments yet' && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!comments.length && !isLoading && (
            <p
              className="title is-4"
              data-cy="NoCommentsMessage"
              style={{
                visibility: error !== ''
                  ? 'hidden'
                  : 'visible',
              }}
            >
              No comments yet
            </p>
          )}

          {!comments.length || (
            <>
              <p className="title is-4">Comments:</p>
              {comments.map(comment => (
                <NewComment
                  key={comment.id}
                  id={comment.id}
                  name={comment.name}
                  email={comment.email}
                  body={comment.body}
                  onDelete={handleDelete}
                />
              ))}
            </>
          )}

          {!isNewComment && !isLoading && error === '' && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsNewComment(true)}
            >
              Write a comment
            </button>
          )}
        </div>
        {isNewComment && error === '' && (
          <NewCommentForm
            setComments={setComments}
            postId={post?.id || 0}
            setError={setError}
          />
        )}
      </div>
    </div>
  );
};
