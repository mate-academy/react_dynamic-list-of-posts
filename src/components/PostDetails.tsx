import React, { useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';

import { Comment } from '../types/Comment';

interface PostDetailsProps {
  selectedPost: Post;
  comments: Comment[];
  stillLoading: boolean;
  hasErrorText: string | null;
  handleCommentAdd: (comment: Comment) => void;
  handleCommentDelete: (commentId: number) => void;
  deleteError: string;
}

export const PostDetails: React.FC<PostDetailsProps> = ({
  selectedPost,
  comments,
  stillLoading,
  hasErrorText,
  handleCommentAdd,
  handleCommentDelete,
  deleteError,
}) => {
  const [isWritingComment, setIsWritingComment] = useState(false);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          #{selectedPost.id}: {selectedPost.title}
        </h2>
        <p data-cy="PostBody">{selectedPost.body}</p>
      </div>
      {stillLoading && <Loader />}
      {!stillLoading && hasErrorText && (
        <div className="notification is-danger" data-cy="CommentsError">
          Something went wrong
        </div>
      )}

      {deleteError && (
        <div className="notification is-danger">{deleteError}</div>
      )}

      {!stillLoading && !hasErrorText && comments.length !== 0 && (
        <div className="block">
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
                  onClick={() => handleCommentDelete(comment.id)}
                >
                  delete button
                </button>
              </div>
              <div className="message-body" data-cy="CommentBody">
                {comment.body}
              </div>
            </article>
          ))}
        </div>
      )}
      {!stillLoading && !hasErrorText && comments.length === 0 && (
        <p className="title is-4" data-cy="NoCommentsMessage">
          No comments yet
        </p>
      )}

      {!stillLoading && !hasErrorText && !isWritingComment && (
        <button
          data-cy="WriteCommentButton"
          type="button"
          className="button is-link"
          onClick={() => setIsWritingComment(true)}
        >
          Write a comment
        </button>
      )}

      {isWritingComment && (
        <NewCommentForm postId={selectedPost.id} onAdd={handleCommentAdd} />
      )}
    </div>
  );
};
