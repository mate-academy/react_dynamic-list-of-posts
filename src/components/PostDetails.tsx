import React, { useState, useEffect } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { deleteComment, getCommentsByPostId } from '../api/comments.api';
import { Comment } from '../types/Comment';

interface Props {
  post: Post;
}

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [createNewComment, setCreateNewComment] = useState(false);

  useEffect(() => {
    setLoading(true);

    getCommentsByPostId(post.id)
      .then(setComments)
      .catch(() => {
        setErrorMessage('Cannot load comments.');
        throw new Error('Cannot load comments.');
      })
      .finally(() => setLoading(false));
  }, [post]);

  function onCommentDelete(commentId: number) {
    setLoading(true);

    setComments(prev => prev.filter(
      comment => comment.id !== commentId,
    ));

    deleteComment(commentId)
      .catch(() => {
        setErrorMessage('Cannot delete a comment.');
        throw new Error('Cannot delete a comment.');
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    setCreateNewComment(false);
  }, [post]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${post.id}: ${post.title}`}
          </h2>

          <p data-cy="PostBody">
            {post.body}
          </p>
        </div>

        <div className="block">
          {loading ? (
            <Loader />
          ) : (
            <>
              {errorMessage && (
                <div className="notification is-danger" data-cy="CommentsError">
                  Something went wrong
                </div>
              )}

              {comments.length === 0 && !errorMessage && (
                <p className="title is-4" data-cy="NoCommentsMessage">
                  No comments yet
                </p>
              )}

              {comments.length > 0 && !errorMessage && (
                <>
                  <p className="title is-4">Comments:</p>

                  {comments.map(comment => (
                    <article
                      className="message is-small"
                      data-cy="Comment"
                      key={comment.id}
                    >
                      <div className="message-header">
                        <a
                          href={`mailto:${comment.email}`}
                          data-cy="CommentAuthor"
                        >
                          {comment.name}
                        </a>
                        <button
                          data-cy="CommentDelete"
                          type="button"
                          className="delete is-small"
                          aria-label="delete"
                          onClick={() => onCommentDelete(comment.id)}
                        >
                          delete button
                        </button>
                      </div>

                      <div className="message-body" data-cy="CommentBody">
                        {comment.body}
                      </div>
                    </article>
                  ))}
                </>
              )}
            </>
          )}

          {!createNewComment && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setCreateNewComment(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {createNewComment && (
          <NewCommentForm
            postId={post.id}
            setErrorMessage={setErrorMessage}
            setComments={(newComment) => setComments(
              prev => [...prev, newComment],
            )}
          />
        )}
      </div>
    </div>
  );
};
