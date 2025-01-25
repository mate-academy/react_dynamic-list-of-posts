import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment, CommentData } from '../types/Comment';
import { getComments, deleteComment, addComment } from '../utils/api';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [visible, setVisible] = useState(false);

  const createComment = async ({ name, email, body }: CommentData) => {
    try {
      const newComment = await addComment({
        name,
        email,
        body,
        postId: post.id,
      });

      setComments(prevComments => [...prevComments, newComment]);
    } catch (err) {
      setError(true);
    }
  };

  const removeComment = async (id: number) => {
    try {
      await deleteComment(id);

      setComments(prevComments =>
        prevComments.filter(comment => comment.id !== id),
      );
    } catch (err) {
      setError(true);
    }
  };

  const loadComments = async (postId: number) => {
    setVisible(false);
    setIsLoading(true);
    setError(false);

    try {
      const commentsFromServer = await getComments(postId);

      setComments(commentsFromServer);
    } catch {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadComments(post.id);
  }, [post]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>

          <p data-cy="PostBody">{post.body}</p>
        </div>

        <div className="block">
          {isLoading && <Loader />}

          {error && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!isLoading && !comments.length && !error && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {!isLoading && !!comments.length && (
            <p className="title is-4">Comments:</p>
          )}

          {!isLoading &&
            !!comments.length &&
            comments.map(comment => (
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
                    onClick={() => removeComment(comment.id)}
                  ></button>
                </div>

                <div className="message-body" data-cy="CommentBody">
                  {comment.body}
                </div>
              </article>
            ))}

          {!visible && !error && !isLoading && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setVisible(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {visible && <NewCommentForm onSubmit={createComment} />}
      </div>
    </div>
  );
};
