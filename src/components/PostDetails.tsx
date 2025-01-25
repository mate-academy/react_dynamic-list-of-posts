import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

interface PostDetailsProps {
  activePost: Post | null;
  comments: Comment[] | undefined;
  isCommentsError: boolean;
  isCommentsLoading: boolean;
  handleAddComment: (newComment: Comment, postId: number) => Promise<void>;
  handleDeleteComment: (commentId: number) => void;
}

export const PostDetails: React.FC<PostDetailsProps> = ({
  activePost,
  comments,
  isCommentsError,
  isCommentsLoading,
  handleAddComment,
  handleDeleteComment,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setIsEditing(false);
  }, [activePost]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            #{activePost?.id}: {activePost?.title}
          </h2>

          <p data-cy="PostBody">{activePost?.body}</p>
        </div>

        <div className="block">
          {isCommentsLoading && <Loader />}

          {isCommentsError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!isCommentsLoading && !isCommentsError && comments?.length === 0 && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {!isCommentsLoading && !isCommentsError && (
            <>
              <p className="title is-4">Comments:</p>

              {comments?.map(comment => (
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

              {!isEditing && (
                <button
                  data-cy="WriteCommentButton"
                  type="button"
                  className="button is-link"
                  onClick={() => setIsEditing(true)}
                >
                  Write a comment
                </button>
              )}
            </>
          )}
        </div>

        {isEditing && (
          <NewCommentForm
            postId={activePost?.id}
            handleAddComment={handleAddComment}
          />
        )}
      </div>
    </div>
  );
};
