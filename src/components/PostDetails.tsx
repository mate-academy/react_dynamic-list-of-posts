import React, { useContext, useEffect } from 'react';
import { UserListContext } from './listContext';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { deleteComment } from './todosApi/api-todos';

export const PostDetails: React.FC = () => {
  const {
    errorComments,
    comments,
    post,
    selectedPostId,
    loaderDetails,
    buttonAddComment,
    setButtonAddComment,
    addComment,
    setAddComent,
    setButtonLoading,
    fetchUserComments,
    setComments,
  } = useContext(UserListContext);

  const selectedPost = post.find(po => po.id === selectedPostId);

  const handleAddComment = () => {
    setAddComent(prev => !prev);
    setButtonAddComment(false);
    setButtonLoading(false);
  };

  useEffect(() => {
    if (selectedPostId) {
      fetchUserComments(selectedPostId);
    }
  }, [selectedPostId]);

  const handleDeleteButton = (commentId: number) => {
    setComments(prevComments =>
      prevComments.filter(comment => comment.id !== commentId),
    );
    deleteComment(commentId).catch(() => {});
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            #{selectedPost?.id}: {selectedPost?.title}
          </h2>

          <p data-cy="PostBody">{selectedPost?.body}</p>

          <div className="block">
            {loaderDetails ? (
              <Loader />
            ) : (
              <>
                {errorComments && (
                  <div
                    className="notification is-danger"
                    data-cy="CommentsError"
                  >
                    Something went wrong
                  </div>
                )}
                {!errorComments && !comments.length && (
                  <p className="title is-4" data-cy="NoCommentsMessage">
                    No comments yet
                  </p>
                )}
                {comments.length > 0 && !errorComments && (
                  <>
                    <p className="title is-4">Comments:</p>
                    {comments.map(com => (
                      <article
                        className="message is-small"
                        data-cy="Comment"
                        key={com.id}
                      >
                        <div className="message-header">
                          <a
                            href={`mailto:${com.email}`}
                            data-cy="CommentAuthor"
                          >
                            {com.name}
                          </a>
                          <button
                            data-cy="CommentDelete"
                            type="button"
                            className="delete is-small"
                            aria-label="delete"
                            onClick={() => handleDeleteButton(com.id)}
                          >
                            delete button
                          </button>
                        </div>

                        <div className="message-body" data-cy="CommentBody">
                          {com.body}
                        </div>
                      </article>
                    ))}
                  </>
                )}
                {!errorComments && buttonAddComment && (
                  <button
                    data-cy="WriteCommentButton"
                    type="button"
                    className="button is-link"
                    onClick={handleAddComment}
                  >
                    Write a comment
                  </button>
                )}
                {addComment && <NewCommentForm />}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
