import React, { useContext, useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { AppContext } from './AppContext';
import { Comment, CommentData } from '../types/Comment';

export const PostDetails: React.FC = () => {
  const { selectedPost, getPostComments } = useContext(AppContext);
  const [isCommentsLoaded, setIsCommentsLoaded] = useState(true);
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [commentFormVisible, setCommentFormVisible] = useState(false);

  useEffect(() => {
    if (selectedPost) {
      setIsCommentsLoaded(true);
      setCommentFormVisible(false);

      getPostComments(selectedPost.id)
        .then(postComments => {
          setComments(postComments);
        })
        .catch(() => setComments(null))
        .finally(() => setIsCommentsLoaded(false));
    }
  }, [selectedPost, getPostComments]);

  const renderComments = (commentsList: Comment[] | null) => {
    if (!commentsList) {
      return (
        <div className="notification is-danger" data-cy="CommentsError">
          Something went wrong
        </div>
      );
    }

    if (commentsList.length) {
      return (
        <>
          <p className="title is-4">Comments:</p>

          {commentsList.map((comment: CommentData) => {
            const { name, email, body } = comment;

            return (
              <article className="message is-small" data-cy="Comment">
                <div className="message-header">
                  <a href={`mailto:${email}`} data-cy="CommentAuthor">
                    {name}
                  </a>
                  <button
                    data-cy="CommentDelete"
                    type="button"
                    className="delete is-small"
                    aria-label="delete"
                  >
                    delete button
                  </button>
                </div>

                <div className="message-body" data-cy="CommentBody">
                  {body}
                </div>
              </article>
            );
          })}
        </>
      );
    }

    return (
      <p className="title is-4" data-cy="NoCommentsMessage">
        No comments yet
      </p>
    );
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {selectedPost?.title}
          </h2>

          <p data-cy="PostBody">
            {selectedPost?.body}
          </p>
        </div>

        <div className="block">
          {isCommentsLoaded ? (
            <Loader />
          ) : (
            <>
              {comments ? renderComments(comments) : renderComments(null)}

              {!commentFormVisible && comments && (
                <button
                  data-cy="WriteCommentButton"
                  type="button"
                  className="button is-link"
                  onClick={() => setCommentFormVisible(true)}
                >
                  Write a comment
                </button>
              )}

              {commentFormVisible && comments && <NewCommentForm />}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
