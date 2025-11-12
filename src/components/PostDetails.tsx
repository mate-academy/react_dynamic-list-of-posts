import React from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

interface Props {
  post: Post;
  comments: Comment[];
  hasError: boolean;
  isLoading: boolean;
  hiddenButton: boolean;
  setHiddenButton: React.Dispatch<React.SetStateAction<boolean>>;
  addComment: (newComment: Comment) => void;
  deleteComment: (commentId: number) => void;
}

export const PostDetails: React.FC<Props> = ({
  post,
  comments,
  hasError,
  isLoading,
  hiddenButton,
  setHiddenButton,
  addComment,
  deleteComment,
}) => {
  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>

          <p data-cy="PostBody">{post.body}</p>
        </div>

        <div className="block">
          {isLoading && <Loader />}

          {hasError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!isLoading &&
            !hasError &&
            (comments.length === 0 ? (
              <p className="title is-4" data-cy="NoCommentsMessage">
                No comments yet
              </p>
            ) : (
              <p className="title is-4">Comments:</p>
            ))}

          {comments.map(comment => {
            return (
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
            );
          })}

          {!isLoading && !hasError && !hiddenButton && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setHiddenButton(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {hiddenButton && (
          <NewCommentForm postId={post.id} addComment={addComment} />
        )}
      </div>
    </div>
  );
};
