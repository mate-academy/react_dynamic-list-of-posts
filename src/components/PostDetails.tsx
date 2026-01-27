import React from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';

type Props = {
  selectedPost: Post | null;
  comments: Comment[];
  isLoading: boolean;
  hasError: boolean;
  writeComment: boolean;
  onWriteComment: (value: boolean) => void;
  onDeleteComment: (id: number) => void;
  addComment: (name: string, email: string, body: string) => Promise<void>;
  isAdding: boolean;
};

export const PostDetails: React.FC<Props> = ({
  selectedPost,
  comments,
  isLoading,
  hasError,
  writeComment,
  onWriteComment,
  onDeleteComment,
  addComment,
  isAdding,
}) => {
  if (!selectedPost) {
    return null;
  }

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${selectedPost.id}: ${selectedPost.title}`}
          </h2>

          <p data-cy="PostBody">{selectedPost.body}</p>
        </div>

        <div className="block">
          {isLoading && <Loader />}

          {hasError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!isLoading && !hasError && comments.length === 0 && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {!isLoading && !hasError && comments.length > 0 && (
            <p className="title is-4">Comments:</p>
          )}

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
                  onClick={() => onDeleteComment(comment.id)}
                >
                  delete button
                </button>
              </div>

              <div className="message-body" data-cy="CommentBody">
                {comment.body}
              </div>
            </article>
          ))}

          {!isLoading && !hasError && !writeComment && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => onWriteComment(!writeComment)}
            >
              Write a comment
            </button>
          )}
        </div>

        {writeComment && (
          <NewCommentForm addComment={addComment} isAdding={isAdding} />
        )}
      </div>
    </div>
  );
};
