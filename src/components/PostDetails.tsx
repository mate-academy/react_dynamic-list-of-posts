import React, { useState } from 'react';
import { Post } from '../types/Post';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Comment, CommentData } from '../types/Comment';
import { ErrorType } from '../types/ErrorType';

type Props = {
  selectedPost: Post | null,
  comments: Comment[],
  isLoadingComments: boolean,
  isError: ErrorType,
  onAddComment: (data: CommentData) => void,
  isPostComment: boolean,
  onDeleteComment: (commentId: number) => void,
};

export const PostDetails: React.FC<Props> = ({
  selectedPost,
  comments,
  isLoadingComments,
  isError,
  onAddComment,
  isPostComment,
  onDeleteComment,
}) => {
  const [isOpenForm, setIsOpenForm] = useState<boolean>(false);

  const handleOpenForm = () => {
    setIsOpenForm(true);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${selectedPost?.id}: ${selectedPost?.title}`}
          </h2>

          <p data-cy="PostBody">
            {selectedPost?.body}
          </p>
        </div>

        <div className="block">
          {isLoadingComments && <Loader />}

          {isError && (
            <div className="notification is-danger" data-cy="CommentsError">
              {isError}
            </div>
          )}

          {!comments.length ? (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          ) : (
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

        </div>
        {isOpenForm ? (
          <NewCommentForm
            selectedPost={selectedPost}
            isPostComment={isPostComment}
            onAddComment={onAddComment}
          />
        ) : (
          <>
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={handleOpenForm}
            >
              Write a comment
            </button>
          </>
        )}
      </div>
    </div>
  );
};
