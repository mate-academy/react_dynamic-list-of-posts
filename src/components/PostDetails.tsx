import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

type Props = {
  selectedPost: Post | undefined;
  commentsError: boolean;
  setCommentsError: (value: boolean) => void;
  loadingComments: boolean;
  postComments: Comment[];
  onAdd: (comment: Comment) => void;
  onDelete: (commentId: number) => void;
};

export const PostDetails: React.FC<Props> = ({
  selectedPost,
  commentsError,
  setCommentsError,
  loadingComments,
  postComments,
  onAdd,
  onDelete,
}) => {
  const [showCommentForm, setShowCommentForm] = useState(false);

  useEffect(() => {
    setShowCommentForm(false);
  }, [selectedPost]);

  if (!selectedPost) {
    return;
  }

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
          {loadingComments && <Loader />}

          {commentsError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!loadingComments && !commentsError && !postComments.length && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {!loadingComments && !commentsError && postComments.length > 0 && (
            <>
              <p className="title is-4">Comments:</p>

              {postComments.map(comment => (
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

          {!loadingComments && !commentsError && !showCommentForm && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setShowCommentForm(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {showCommentForm && !commentsError && (
          <NewCommentForm
            selectedPost={selectedPost}
            onAdd={onAdd}
            setCommentsError={setCommentsError}
          />
        )}
      </div>
    </div>
  );
};
