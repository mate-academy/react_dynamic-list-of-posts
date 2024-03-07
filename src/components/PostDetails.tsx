import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { deleteComment, getPostComments } from '../api/CommentsAPI';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const { id, title, body } = post;
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [hasAddForm, setHasAddForm] = useState(false);

  useEffect(() => {
    setHasAddForm(false);
    setIsLoading(true);

    getPostComments(post.id)
      .then(setComments)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, [post]);

  const handleDelete = (commentId: number) => {
    setComments(prev => prev.filter(comment => comment.id !== commentId));

    deleteComment(commentId).catch(() => {
      setComments(comments);
      setHasError(true);
    });
  };

  const noComments = !comments.length && !hasError && !isLoading;
  const hasComments = !!comments.length && !hasError && !isLoading;

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${id}: ${title}`}</h2>

          <p data-cy="PostBody">{body}</p>
        </div>

        <div className="block">
          {isLoading && <Loader />}

          {hasError && !isLoading && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {noComments && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {hasComments && (
            <>
              <p className="title is-4">Comments:</p>

              {comments.map(comment => (
                <article className="message is-small" data-cy="Comment">
                  <div className="message-header">
                    <a href={`mailto:${comment.email}`} data-cy="CommentAuthor">
                      {comment.name}
                    </a>
                    <button
                      data-cy="CommentDelete"
                      type="button"
                      className="delete is-small"
                      aria-label="delete"
                      onClick={() => handleDelete(comment.id)}
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

          {!hasError && !isLoading && !hasAddForm && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setHasAddForm(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {hasAddForm && <NewCommentForm setComments={setComments} postId={id} />}
      </div>
    </div>
  );
};
