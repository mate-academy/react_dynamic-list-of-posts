import React, { useContext } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { ContextList } from './ListProvider/ListProvider';

export const PostDetails: React.FC = () => {
  const {
    selectPost,
    comments,
    isButtonComment,
    setIsButtonComment,
    postLoad,
    handleDeleteComment,
    errorCommentsMessage,
  } = useContext(ContextList);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          {!errorCommentsMessage && (
            <>
              <h2 data-cy="PostTitle">
                {`#${selectPost?.id}: ${selectPost?.title}`}
              </h2>

              <p data-cy="PostBody">{selectPost?.body}</p>
            </>
          )}
        </div>
        <div className="block">
          {postLoad && <Loader />}
          {errorCommentsMessage && !postLoad && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}
          {comments.length === 0 && !errorCommentsMessage && !postLoad && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {!postLoad && comments.length > 0 && (
            <p className="title is-4">Comments:</p>
          )}
          {!postLoad &&
            comments.map(comment => (
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
                    onClick={() => handleDeleteComment(comment)}
                  >
                    delete button
                  </button>
                </div>

                <div className="message-body" data-cy="CommentBody">
                  {comment.body}
                </div>
              </article>
            ))}
          {!isButtonComment && !errorCommentsMessage && !postLoad && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsButtonComment(true)}
            >
              Write a comment
            </button>
          )}
        </div>
        {isButtonComment && <NewCommentForm />}
      </div>
    </div>
  );
};
