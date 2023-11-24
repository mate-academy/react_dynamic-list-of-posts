import React, { useContext, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { PostContext } from './PostContext';

export const PostDetails: React.FC = () => {
  const {
    selectedPost,
    comments,
    isLoadingComments,
    hasCommentsError,
  } = useContext(PostContext);

  const [isOpenNewCommentForm, setIsOpenNewCommentForm] = useState(false);

  const noCommentsMsg
  = !isLoadingComments && !hasCommentsError && !comments.length;

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

          {hasCommentsError
            && (
              <div
                className="notification is-danger"
                data-cy="CommentsError"
              >
                Something went wrong
              </div>
            )}

          {noCommentsMsg
            && (
              <p
                className="title is-4"
                data-cy="NoCommentsMessage"
              >
                No comments yet
              </p>
            )}

          {!!comments.length && <p className="title is-4">Comments:</p>}

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
                  disabled={isOpenNewCommentForm}
                >
                  delete button
                </button>
              </div>

              <div className="message-body" data-cy="CommentBody">
                {comment.body}
              </div>
            </article>
          ))}

          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setIsOpenNewCommentForm(true)}
          >
            Write a comment
          </button>
        </div>

        {isOpenNewCommentForm && <NewCommentForm />}
      </div>
    </div>
  );
};
