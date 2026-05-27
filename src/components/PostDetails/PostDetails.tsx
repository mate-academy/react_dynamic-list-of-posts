import React from 'react';

import { Loader } from '../Loader';
import { NewCommentForm } from '../NewCommentForm/NewCommentForm';

import { Post } from '../../types/Post';
import { Comment } from '../../types/Comment';

type Props = {
  post: Post;
  comments: Comment[];
  isLoadingComments: boolean;
  commentsError: string;
  onDeleteComment: (commentId: number) => void;
  isCommentFormVisible: boolean;
  showCommentForm: () => void;
  onAddComment: (name: string, email: string, body: string) => Promise<void>;
};

export const PostDetails: React.FC<Props> = ({
  post,
  comments,
  isLoadingComments,
  commentsError,
  onDeleteComment,
  isCommentFormVisible,
  showCommentForm,
  onAddComment,
}) => {
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

        {!!commentsError && (
          <div className="notification is-danger" data-cy="CommentsError">
            {commentsError}
          </div>
        )}

        {!isLoadingComments && !commentsError && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {!!comments.length && (
          <>
            <p className="title is-4">Comments:</p>

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
                    onClick={() => onDeleteComment(comment.id)}
                  />
                </div>

                <div className="message-body" data-cy="CommentBody">
                  {comment.body}
                </div>
              </article>
            ))}
          </>
        )}

        {!isLoadingComments && !commentsError && !isCommentFormVisible && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={showCommentForm}
          >
            Write a comment
          </button>
        )}
      </div>

      {isCommentFormVisible && <NewCommentForm onSubmit={onAddComment} />}
    </div>
  );
};
