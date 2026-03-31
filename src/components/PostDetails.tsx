import React, { useEffect } from 'react';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { CommentData } from '../types/Comment';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

type Props = {
  post: Post;
  comments: Comment[];
  isLoadingComments: boolean;
  commentsError: boolean;
  onCommentDelete: (commentId: number) => void;
  onCommentSubmit: (data: CommentData) => Promise<void>;
};

export const PostDetails: React.FC<Props> = ({
  post,
  comments,
  isLoadingComments,
  commentsError,
  onCommentDelete,
  onCommentSubmit,
}) => {
  const [showForm, setShowForm] = React.useState(false);

  useEffect(() => {
    setShowForm(false);
  }, [post.id]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          #{post.id}: {post.title}
        </h2>

        <p data-cy="PostBody">{post.body}</p>
      </div>

      <div className="block">
        {isLoadingComments && <Loader />}

        {!isLoadingComments && commentsError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {!isLoadingComments && !commentsError && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {!isLoadingComments && !commentsError && comments.length > 0 && (
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
                    onClick={() => onCommentDelete(comment.id)}
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

      {showForm && <NewCommentForm onSubmit={onCommentSubmit} />}
    </div>
  );
};
