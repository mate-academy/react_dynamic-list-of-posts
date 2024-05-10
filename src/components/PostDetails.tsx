import React, { useContext } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { PostsContext } from '../postsContext';
import { deleteComment } from '../api/client';
import { Comment } from '../types/Comment';

export const PostDetails: React.FC = () => {
  const {
    selectedPost,
    comments,
    loadingComments,
    error,
    writeCommentButton,
    setWriteCommentButton,
    setComments,
  } = useContext(PostsContext);

  const handleCommentDelete = (comment: Comment) => {
    const prevComments = [...comments];

    setComments(currentComments =>
      currentComments.filter(c => c.id !== comment.id),
    );

    deleteComment(comment.id).catch(() => {
      setComments(prevComments);
    });
  };

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
          {loadingComments && <Loader />}

          {error && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!comments.length && !error && !loadingComments && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {!!comments.length && !error && !loadingComments && (
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
                      onClick={() => handleCommentDelete(comment)}
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

          {!writeCommentButton && !error && !loadingComments && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setWriteCommentButton(true)}
            >
              Write a comment
            </button>
          )}
        </div>
        {writeCommentButton && <NewCommentForm />}
      </div>
    </div>
  );
};
