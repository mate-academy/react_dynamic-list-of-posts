import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { addComment, deleteComment, getComments } from '../api/comments';
import { Comment } from '../types/Comment';

type Props = {
  post: Post;
  isCommenting: boolean;
  setIsCommenting: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PostDetails: React.FC<Props> = ({
  post,
  isCommenting,
  setIsCommenting,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [isCommentFormLoading, setIsCommentFormLoading] = useState(false);

  function loadComments() {
    setIsLoading(true);
    getComments(post.id)
      .then(setComments)
      .catch(e => {
        setError(e);
      })
      .finally(() => setIsLoading(false));
  }

  function handleDeleteComment(commentId: number) {
    deleteComment(commentId).catch(e => {
      setComments(comments);
      setError(e);
    });
    setComments(currenttCommets =>
      currenttCommets.filter(comment => comment.id !== commentId),
    );
  }

  function handleAddComment({ postId, name, email, body }: Comment) {
    setIsCommentFormLoading(true);
    setError(undefined);

    return addComment({ postId, name, email, body })
      .then(newComment => {
        setComments(currentCommnets => [...currentCommnets, newComment]);
      })
      .catch(e => {
        setError(e);
      })
      .finally(() => setIsCommentFormLoading(false));
  }

  useEffect(loadComments, [post]);

  return (
    <div className="content " data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            #{post.id}: {post.title}
          </h2>

          <p data-cy="PostBody">{post.body}</p>
        </div>

        <div className="block">
          {isLoading ? (
            <Loader />
          ) : !!error ? (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          ) : !comments.length ? (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          ) : (
            <p className="title is-4">Comments:</p>
          )}
          {!isLoading &&
            !error &&
            !!comments.length &&
            comments.map(comment => (
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
                    onClick={() => handleDeleteComment(comment.id)}
                  >
                    delete button
                  </button>
                </div>

                <div className="message-body" data-cy="CommentBody">
                  {comment.body}
                </div>
              </article>
            ))}

          {!isLoading && !isCommenting && !error && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsCommenting(true)}
            >
              Write a comment
            </button>
          )}
        </div>
        {isCommenting && (
          <NewCommentForm
            postId={post.id}
            onAdd={handleAddComment}
            isLoading={isCommentFormLoading}
          />
        )}
      </div>
    </div>
  );
};
