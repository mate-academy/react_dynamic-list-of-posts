import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';

type Props = {
  onSubmit: (comment: Omit<Comment, 'id'>) => Promise<void>;
  comments: Comment[];
  onDelete: (value: number) => void;
  selectedPost?: Post;
  isLoading: boolean;
  errorComments: boolean;
};

export const PostDetails: React.FC<Props> = ({
  comments,
  selectedPost,
  isLoading,
  errorComments,
  onSubmit,
  onDelete,
}) => {
  const [isWriting, setIsWriting] = useState(false);

  useEffect(() => {
    setIsWriting(false);
  }, [selectedPost?.id]);

  let content;

  if (errorComments) {
    content = (
      <div className="notification is-danger" data-cy="CommentsError">
        Something went wrong
      </div>
    );
  } else if (isLoading) {
    content = <Loader />;
  } else if (comments.length > 0) {
    content = (
      <>
        <p className="title is-4">Comments:</p>

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
                  onClick={() => onDelete(comment.id)}
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

        {!isWriting ? (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => {
              setIsWriting(true);
            }}
          >
            Write a comment
          </button>
        ) : (
          <NewCommentForm onSubmit={onSubmit} selectedPost={selectedPost} />
        )}
      </>
    );
  } else {
    content = (
      <>
        <p className="title is-4" data-cy="NoCommentsMessage">
          No comments yet
        </p>

        {!isWriting ? (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link "
            onClick={() => setIsWriting(true)}
          >
            Write a comment
          </button>
        ) : (
          <NewCommentForm onSubmit={onSubmit} selectedPost={selectedPost} />
        )}
      </>
    );
  }

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            #{selectedPost?.id}: {selectedPost?.title}
          </h2>

          <p data-cy="PostBody">{selectedPost?.body}</p>
        </div>

        <div className="block">{content}</div>
      </div>
    </div>
  );
};
