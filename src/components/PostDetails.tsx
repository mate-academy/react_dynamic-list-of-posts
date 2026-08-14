import React, { useCallback, useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { CommentData, PostComment } from '../types/Comment';
import {
  addPostComment,
  deletePostComment,
  getPostComments,
} from '../services/comment.service';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<PostComment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
  const [error, setError] = useState({
    load: false,
    add: false,
    delete: false,
  });

  const loadComments = useCallback(() => {
    setIsLoading(true);
    setError(prev => ({ ...prev, load: false }));
    setIsFormVisible(false);

    getPostComments(post.id)
      .then(setComments)
      .catch(() => setError(prev => ({ ...prev, load: true })))
      .finally(() => setIsLoading(false));
  }, [post.id]);

  const resetErrors = () => {
    setError({
      load: false,
      add: false,
      delete: false,
    });
  };

  const addComment = async ({ name, email, body }: CommentData) => {
    resetErrors();

    try {
      const createdComment = await addPostComment({
        name,
        email,
        body,
        postId: post.id,
      });

      setComments(prevComments => [...prevComments, createdComment]);
    } catch {
      setError(prev => ({ ...prev, add: true }));
    }
  };

  const deleteComment = async (commentId: number) => {
    const prevComments = [...comments];

    resetErrors();
    setComments(prev => prev.filter(c => c.id !== commentId));

    try {
      await deletePostComment(commentId);
    } catch {
      setError(prev => ({ ...prev, delete: true }));
      setComments(prevComments);
    }
  };

  useEffect(() => {
    if (!post?.id) {
      return;
    }

    loadComments();
  }, [loadComments, post?.id]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>

        <p data-cy="PostBody">{post.body}</p>
      </div>

      <div className="block">
        {isLoading && <Loader />}

        {!isLoading && (error.load || error.delete || error.add) && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {!isLoading && !error.load && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {comments.length > 0 && !isLoading && !error.load && (
          <>
            <p className="title is-4">Comments:</p>
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
                    onClick={() => deleteComment(comment.id)}
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

        {!isLoading && !error.load && !isFormVisible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setIsFormVisible(true)}
          >
            Write a comment
          </button>
        )}
      </div>

      {!isLoading && !error.load && isFormVisible && (
        <NewCommentForm onSubmit={addComment} />
      )}
    </div>
  );
};
