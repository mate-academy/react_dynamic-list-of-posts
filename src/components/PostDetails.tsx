import React, { useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';

type Props = {
  comments: Comment[]
  selectPost: Post | null
  error: string
  deleteComment: (id: number) => void
  addComments:(Comment: Omit<Comment, 'id'>) => void
};

export const PostDetails: React.FC<Props> = ({
  comments,
  selectPost,
  error,
  deleteComment,
  addComments,
}) => {
  const [isActive, setIsActive] = useState(false);

  const handleWriteComment = () => {
    setIsActive(true);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${selectPost?.id}: ${selectPost?.title} `}
          </h2>

          <p data-cy="PostBody">
            {selectPost?.body}
          </p>
        </div>

        <div className="block">
          {!error ? (
            <Loader />

          ) : (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}
          {comments.length === 0 ? (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          ) : (
            <p className="title is-4">Comments:</p>)}
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
                  onClick={() => deleteComment(comment.id)}
                >
                  delete button
                </button>
              </div>

              <div className="message-body" data-cy="CommentBody">
                {comment.body}
              </div>
            </article>
          ))}
          {!isActive && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={handleWriteComment}
            >
              Write a comment
            </button>
          )}
        </div>

        {isActive && (
          <NewCommentForm
            addComments={addComments}
            selectPost={selectPost}
          />
        )}
      </div>
    </div>
  );
};
