import React, { useContext } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { ContextUsers } from './UsersContext';
import { deleteComment } from './api/deleteComment';
// import { getComments } from './api/getComments';

export const PostDetails: React.FC = () => {
  const {
    selectedPost,
    comments,
    visibleLoader,
    errInLoadingComments,
    showErrComments,
    visibleForm,
    setVisibleForm,
    setComments,
  } = useContext(ContextUsers);

  const handleDeleteComment = (commentId: number) => {
    deleteComment(commentId).then(() =>
      setComments(prevState =>
        prevState.filter(comment => comment.id !== commentId),
      ),
    );

    // if (selectedPost) {
    //   getComments(selectedPost.id).then(setComments);
    // }
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${selectedPost?.id}: ${selectedPost?.title}`}</h2>

          <p data-cy="PostBody">{selectedPost?.body}</p>
        </div>

        <div className="block">
          {visibleLoader && <Loader />}

          {showErrComments && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!comments.length && !visibleLoader && !errInLoadingComments && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {!!comments.length && !visibleLoader && (
            <p className="title is-4">Comments:</p>
          )}

          {!!comments.length &&
            !visibleLoader &&
            comments.map(comment => {
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
                      onClick={() => handleDeleteComment(comment.id)}
                      type="button"
                      className="delete is-small"
                      aria-label="delete"
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

          {!visibleForm && !visibleLoader && !showErrComments && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              onClick={() => setVisibleForm(state => !state)}
              className="button is-link"
            >
              Write a comment
            </button>
          )}
        </div>

        {visibleForm && <NewCommentForm />}
      </div>
    </div>
  );
};
