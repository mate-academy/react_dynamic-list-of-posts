import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { deleteComment } from '../api/comments';

type Props = {
  post: Post | null;
  loading: boolean;
  comments: Comment[] | null;
  onCommentsListChange: React.Dispatch<React.SetStateAction<Comment[]>>;
  onErrorSet: (value: boolean) => void;
  errorComment: boolean;
};

export const PostDetails: React.FC<Props> = ({
  post,
  loading,
  comments,
  onCommentsListChange,
  onErrorSet,
  errorComment,
}) => {
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (errorComment) {
      timer = setTimeout(() => {
        onErrorSet(false);
      }, 4000);
    }

    return () => clearTimeout(timer);
  }, [errorComment]);

  const handleDeleteComment = (id: number) => {
    deleteComment(id)
      .then(() => {
        onCommentsListChange(prevState =>
          prevState.filter(comment => comment.id !== id),
        );
      })
      .catch(() => onErrorSet(true));
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{post && `#${post.id}: ${post.title}`}</h2>

          <p data-cy="PostBody">{post && post.body}</p>
        </div>

        <div className="block">
          {loading && <Loader />}
          {errorComment && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!loading && !errorComment && (
            <>
              {(!comments || !comments.length) && (
                <p className="title is-4" data-cy="NoCommentsMessage">
                  No comments yet
                </p>
              )}
              {comments && !!comments.length && (
                <p className="title is-4">Comments:</p>
              )}
            </>
          )}

          {comments &&
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

          {!loading && !formVisible && !errorComment && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setFormVisible(prevState => !prevState)}
            >
              Write a comment
            </button>
          )}
        </div>

        {formVisible && post && (
          <NewCommentForm
            postId={post.id}
            onCommentsListChange={onCommentsListChange}
            onErrorSet={onErrorSet}
          />
        )}
      </div>
    </div>
  );
};
