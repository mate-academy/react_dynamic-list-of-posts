import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Comment, CommentData } from '../types/Comment';
import { Post } from '../types/Post';

type Props = {
  comments: Comment[];
  selectedPost: Post;
  isLoading: boolean;
  errorMessage: string;
  onCommentDelete: (id: number) => void;
  onCommentAdd: (comment: CommentData) => Promise<void>;
};

export const PostDetails: React.FC<Props> = ({
  comments,
  selectedPost,
  isLoading,
  errorMessage,
  onCommentDelete,
  onCommentAdd,
}) => {
  const [isFormShown, setIsFormShown] = useState(false);

  useEffect(() => setIsFormShown(false), [selectedPost]);

  const handleCommentDelete = (commentId: number) => onCommentDelete(commentId);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${selectedPost.id}: ${selectedPost.title}`}
          </h2>

          <p data-cy="PostBody">
            {selectedPost.body}
          </p>
        </div>

        <div className="block">
          {isLoading && <Loader />}

          {errorMessage && (
            <div className="notification is-danger" data-cy="CommentsError">
              {errorMessage}
            </div>
          )}

          {comments.length === 0 && !isLoading && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {comments.length > 0 && !isLoading && (
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
            </>
          )}

          {!isFormShown && !isLoading && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsFormShown(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {isFormShown && (
          <NewCommentForm
            postId={selectedPost.id}
            onCommentAdd={onCommentAdd}
          />
        )}
      </div>
    </div>
  );
};
