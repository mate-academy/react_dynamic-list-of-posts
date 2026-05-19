import React from 'react';
import { PostContext } from './PostContext';
// import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Loader } from './Loader';

export const PostDetails: React.FC = () => {
  const {
    post,
    postComments = [],
    openCommentForm,
    setOpenCommentForm = () => {},
    deleteComment,
    commentsError,
    commentsLoading,
    setPostComments,
  } = React.useContext(PostContext)!;

  const handleRemove = async (id: number) => {
    setPostComments(current => current.filter(comment => comment.id !== id));

    await deleteComment(id);
  };

  React.useEffect(() => {
    setOpenCommentForm(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            #{post?.id}: {post?.title}
          </h2>

          <p data-cy="PostBody">{post?.body}</p>
        </div>

        <div className="block">
          {commentsLoading && <Loader />}

          {commentsError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!commentsLoading && postComments.length === 0 && !commentsError && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}
          {!commentsLoading && postComments.length > 0 && (
            <p className="title is-4">Comments:</p>
          )}
          {Array.isArray(postComments) &&
            !commentsLoading &&
            postComments.map(c => (
              <article
                className="message is-small"
                data-cy="Comment"
                key={c.id}
              >
                <div className="message-header">
                  <a href={`mailto:${c.email}`} data-cy="CommentAuthor">
                    {c.name}
                  </a>

                  <button
                    data-cy="CommentDelete"
                    type="button"
                    className="delete is-small"
                    aria-label="delete"
                    onClick={() => handleRemove(c.id)}
                  >
                    delete button
                  </button>
                </div>

                <div className="message-body" data-cy="CommentBody">
                  {c.body}
                </div>
              </article>
            ))}
          {!commentsLoading && !openCommentForm && !commentsError && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setOpenCommentForm(current => !current)}
            >
              Write a comment
            </button>
          )}
        </div>
        {openCommentForm && !commentsLoading && <NewCommentForm />}
      </div>
    </div>
  );
};
