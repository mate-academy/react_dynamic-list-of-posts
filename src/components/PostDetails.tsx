import React, { useState, useEffect } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

type Props = {
  selectedPost: Post | null;
  comments: Comment[];
  commentsLoading: boolean;
  commentsError: boolean;
  onAddComment: (newComment: Comment) => void;
  onDeleteComment: (commentId: number) => void;
};

export const PostDetails: React.FC<Props> = ({
  selectedPost,
  comments,
  commentsError,
  commentsLoading,
  onAddComment,
  onDeleteComment,
}) => {
  const [visibleForm, setVisibleForm] = useState(false);

  useEffect(() => {
    setVisibleForm(false);
  }, [selectedPost]);

  if (selectedPost === null) {
    return null;
  }

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          {`#${selectedPost.id}: ${selectedPost.title}`}
        </h2>

        <p data-cy="PostBody">{selectedPost.body}</p>
      </div>

      <div className="block">
        {commentsLoading && <Loader />}

        {commentsError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {!commentsLoading && !commentsError && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {comments.length > 0 && <p className="title is-4">Comments:</p>}

        {comments.length > 0 &&
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

        {!visibleForm && !commentsLoading && !commentsError && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setVisibleForm(true)}
          >
            Write a comment
          </button>
        )}
      </div>

      {visibleForm && (
        <NewCommentForm onAddComment={onAddComment} postId={selectedPost.id} />
      )}
    </div>
  );
};
