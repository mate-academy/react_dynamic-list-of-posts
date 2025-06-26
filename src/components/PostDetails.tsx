import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment, CommentData } from '../types/Comment';

type PostDetailsProps = {
  selectedPost: Post;
  comments: Comment[];
  isLoadingComments: boolean;
  commentsError: string;
  onDelete: (commentId: number) => void;
  onAddComment: (
    commentData: CommentData & { postId: number },
  ) => Promise<void>;
};

export const PostDetails: React.FC<PostDetailsProps> = ({
  selectedPost,
  comments,
  isLoadingComments,
  commentsError,
  onDelete,
  onAddComment,
}) => {
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setShowForm(false);
  }, [selectedPost.id]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            #{selectedPost.id}: {selectedPost.title}
          </h2>

          <p data-cy="PostBody">{selectedPost.body}</p>
        </div>

        <div className="block">
          {isLoadingComments && <Loader />}

          {commentsError && (
            <div className="notification is-danger" data-cy="CommentsError">
              {commentsError}
            </div>
          )}

          {comments.length === 0 && !commentsError && !isLoadingComments ? (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          ) : (
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
                  onClick={() => onDelete(comment.id)}
                />
              </div>

              <div className="message-body" data-cy="CommentBody">
                {comment.body}
              </div>
            </article>
          ))}

          {!isLoadingComments && !commentsError && !showForm && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setShowForm(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {showForm && (
          <NewCommentForm
            postId={selectedPost.id}
            onAddComment={onAddComment}
          />
        )}
      </div>
    </div>
  );
};
