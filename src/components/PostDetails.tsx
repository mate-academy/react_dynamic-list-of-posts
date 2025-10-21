import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment, NewComment } from '../types/Comment';
import * as commentService from '../services/comment';
import PropTypes from 'prop-types';

type Props = {
  selectedPost: Post | null;
};

export const PostDetails: React.FC<Props> = ({ selectedPost }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function loadComments() {
    if (selectedPost) {
      setLoading(true);
      setError(false);
      setIsOpen(false);

      commentService
        .getPostComments(selectedPost.id)
        .then(setComments)
        .catch(() => setError(true))
        .finally(() => setLoading(false));
    }
  }

  useEffect(loadComments, [selectedPost]);

  //#region Add andDelete
  const addComment = (data: NewComment) => {
    setError(false);

    return commentService
      .addComment(data)
      .then(newComment => {
        setComments(currentComments => [...currentComments, newComment]);
      })
      .catch(() => {
        setError(true);
      });
  };

  const deleteComment = (id: number) => {
    const previousComments = comments;

    setComments(currentComments =>
      currentComments.filter(comment => comment.id !== id),
    );

    return commentService.deleteComment(id).catch(() => {
      setComments(previousComments);
      setError(true);
    });
  };
  //#endregion

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
          {loading && <Loader />}

          {error && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {selectedPost && !loading && !error && comments.length === 0 && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {selectedPost && !error && comments && comments.length > 0 && (
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
                      onClick={() => deleteComment(comment.id)}
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

          {!loading && !isOpen && !error && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsOpen(prev => !prev)}
            >
              Write a comment
            </button>
          )}
        </div>

        {isOpen && selectedPost && !error && (
          <NewCommentForm selectedPost={selectedPost} onSubmit={addComment} />
        )}
      </div>
    </div>
  );
};

const PostShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
});

PostDetails.propTypes = {
  selectedPost: PostShape,
};
