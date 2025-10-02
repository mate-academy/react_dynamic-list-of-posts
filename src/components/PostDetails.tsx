import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Comment, CommentData } from '../types/Comment';
import { Post } from '../types/Post';

type Props = {
  comments: Comment[];
  error: string;
  post: Post;
  selectedPostId: number | null;
  commentsLoading: boolean;
  onSubmitForm: (comment: CommentData, postId: number) => Promise<void>;
  onDeleteComment: (id: number) => void;
};

export const PostDetails: React.FC<Props> = ({
  comments,
  error,
  post,
  selectedPostId,
  commentsLoading,
  onSubmitForm,
  onDeleteComment,
}) => {
  const [isShowingForm, setIsShowingForm] = useState(false);

  useEffect(() => {
    setIsShowingForm(false);
  }, [selectedPostId]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>

        <p data-cy="PostBody">{post.body}</p>
      </div>

      <div className="block">
        {commentsLoading && <Loader />}

        {error && (
          <div className="notification is-danger" data-cy="CommentsError">
            {error}
          </div>
        )}

        {!commentsLoading && !error && (
          <>
            {comments.length === 0 ? (
              <p className="title is-4" data-cy="NoCommentsMessage">
                No comments yet
              </p>
            ) : (
              <>
                <p className="title is-4">Comments:</p>

                {comments.map(comment => (
                  <article
                    className="message is-small"
                    data-cy="Comment"
                    key={comment.id}
                  >
                    <div className="message-header">
                      <a
                        href={`mailto:${comment.email}`}
                        data-cy="CommentAuthor"
                      >
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
              </>
            )}
            {!isShowingForm && (
              <button
                data-cy="WriteCommentButton"
                type="button"
                className="button is-link"
                onClick={() => {
                  setIsShowingForm(true);
                }}
              >
                Write a comment
              </button>
            )}
          </>
        )}
      </div>

      {!error && isShowingForm && (
        <NewCommentForm post={post} onSubmitForm={onSubmitForm} />
      )}
    </div>
  );
};
