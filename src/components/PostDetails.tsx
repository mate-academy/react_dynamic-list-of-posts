import { memo, useContext } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { PostsContext } from '../store/PostsContext';
import { CommentsContext } from '../store/CommentsContext';

export const PostDetails = memo(function PostDetailsComponent() {
  const {
    comments,
    errorMessage,
    loading,
    deletedComment,
    openForm,
    setOpenForm,
  } = useContext(CommentsContext);
  const { selectedPost } = useContext(PostsContext);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            #{selectedPost?.id}: {selectedPost?.title}
          </h2>

          <p data-cy="PostBody">{selectedPost?.body}</p>
        </div>

        <div className="block">
          {loading ? (
            <Loader />
          ) : errorMessage ? (
            <div className="notification is-danger" data-cy="CommentsError">
              {errorMessage}
            </div>
          ) : comments.length ? (
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
                      onClick={() => deletedComment(comment.id)}
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
          ) : (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {!openForm && !loading && !errorMessage && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setOpenForm(!openForm)}
            >
              Write a comment
            </button>
          )}
        </div>

        {openForm && <NewCommentForm />}
      </div>
    </div>
  );
});
