import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { createComment, getComments, deleteComment } from '../api/comments';
import { Comment, CommentData } from '../types/Comment';

interface Props {
  post: Post | null;
}

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (post?.id) {
      setIsLoading(true);
      setIsVisible(false);

      getComments(post.id)
        .then(setComments)
        .catch(() => setIsError(true))
        .finally(() => setIsLoading(false));
    }
  }, [post?.id]);

  const addNewComment = async ({ name, email, body }: CommentData) => {
    try {
      const newComment = await createComment({
        name,
        email,
        body,
        postId: post?.id || 0,
      });

      setComments(currentComments => [...currentComments, newComment]);
    } catch (error) {
      setIsError(true);
    }
  };

  const removeComment = async (commentId: number) => {
    setComments(currentComments =>
      currentComments.filter(comment => comment.id !== commentId),
    );

    await deleteComment(commentId);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${post?.id}: ${post?.title}`}</h2>

          <p data-cy="PostBody">{post?.body}</p>
        </div>

        <div className="block">
          {isLoading && <Loader />}

          {!isLoading && isError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!comments.length && !isLoading && !isError && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {!isLoading && !isError && !!comments.length && (
            <>
              <p className="title is-4">Comments:</p>
              {comments.map(comment => (
                <article
                  className="message is-small"
                  data-cy="Comment"
                  key={comment.id}
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

          {!isLoading && !isError && !isVisible && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsVisible(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {!isLoading && !isError && isVisible && (
          <NewCommentForm onSubmit={addNewComment} />
        )}
      </div>
    </div>
  );
};
