import React from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Store } from '../store';
import { client } from '../utils/fetchClient';

export const PostDetails: React.FC = () => {
  const {
    selectedPost,
    postComments,
    postCommentsLoading,
    postCommentsError,
    showAddForm,
    setPostComments,
    setPostCommentsError,
    setPostCommentsLoading,
    setShowAddForm,
  }
    = Store();

  const deleteComment = (commentID: number, postID: number) => {
    client.delete(`/comments/${commentID}`)
      .then(() => {
        setPostCommentsLoading(true);
        client.get(`/comments?postId=${postID}`)
          .then((res) => {
            if (Array.isArray(res)) {
              setPostComments(res);
            } else {
              throw res;
            }
          })
          .catch((res) => {
            setPostCommentsError(true);
            Error(res);
          })
          .finally(() => {
            setPostCommentsLoading(false);
          });
      })
      .catch(err => new Error(err.message));
  };

  return (
    selectedPost && (
      <div className="content" data-cy="PostDetails">
        <div className="content" data-cy="PostDetails">
          <div className="block">
            <h2 data-cy="PostTitle">
              {`#${selectedPost.id}: ${selectedPost.title}`}
            </h2>

            <p data-cy="PostBody">{selectedPost.body}</p>
          </div>

          {postCommentsLoading ? (
            <Loader />
          ) : (
            <div className="block">
              {postCommentsError && (
                <div className="notification is-danger" data-cy="CommentsError">
                  Something went wrong
                </div>
              )}

              {postComments?.length === 0 && (
                <p className="title is-4" data-cy="NoCommentsMessage">
                  No comments yet
                </p>
              )}

              {postComments && (
                <>
                  <p className="title is-4">Comments:</p>
                  {postComments.map((comment) => (
                    <article
                      className="message is-small"
                      data-cy="Comment"
                      key={comment.id}
                    >
                      <div className="message-header">
                        <a
                          href={comment.email}
                          data-cy="CommentAuthor"
                        >
                          {comment.name}
                        </a>
                        <button
                          data-cy="CommentDelete"
                          type="button"
                          className="delete is-small"
                          aria-label="delete"
                          onClick={
                            () => deleteComment(comment.id, comment.postId)
                          }
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

              <button
                data-cy="WriteCommentButton"
                type="button"
                className="button is-link"
                onClick={() => setShowAddForm(true)}
              >
                Write a comment
              </button>
            </div>
          )}

          {showAddForm && <NewCommentForm />}
        </div>
      </div>
    )
  );
};
