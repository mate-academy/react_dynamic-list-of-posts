import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';

import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { getComment, deleteComment } from '../api/ApiMethods';
import { NewCommentForm } from './NewCommentForm';

type Props = {
  openedPost: Post | null,
  setIsFormOpen: (value: boolean) => void,
  isFormOpen: boolean,
};

export const PostDetails: React.FC<Props> = ({
  openedPost,
  setIsFormOpen,
  isFormOpen,
}) => {
  const [postComments, setPostComments] = useState<Comment[]>([]);
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDeleteComments = (commentId: number) => {
    deleteComment(commentId)
      .then(() => {
        setPostComments(prev => prev
          .filter(comment => comment.id !== commentId));
      })
      .catch(() => setHasError(true));
  };

  useEffect(() => {
    if (openedPost) {
      setLoading(true);
      setHasError(false);

      getComment(openedPost.id)
        .then(resolvedPostComments => setPostComments(resolvedPostComments))
        .catch(() => setHasError(true))
        .finally(() => setLoading(false));
    }
  }, [openedPost]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${openedPost?.id}: ${openedPost?.title}`}</h2>

          <p data-cy="PostBody">{openedPost?.body}</p>
        </div>

        {!hasError && (
          <div className="block">
            {loading ? (
              <Loader />
            ) : (
              <>
                {postComments.length === 0 ? (
                  <p className="title is-4" data-cy="NoCommentsMessage">
                    No comments yet
                  </p>
                ) : (
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
                            href={`mailto:${comment.email}`}
                            data-cy="CommentAuthor"
                          >
                            {comment.name}
                          </a>
                          <button
                            data-cy="CommentDelete"
                            type="button"
                            className="delete is-small"
                            aria-label="delete"
                            onClick={() => handleDeleteComments(comment.id)}
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

                {!isFormOpen && (
                  <button
                    data-cy="WriteCommentButton"
                    type="button"
                    className="button is-link"
                    onClick={() => setIsFormOpen(true)}
                  >
                    Write a comment
                  </button>
                )}
              </>
            )}
          </div>
        )}

        {hasError && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {isFormOpen && (
          <NewCommentForm
            openPost={openedPost}
            setPostComments={setPostComments}
            setHasError={setHasError}
            setOpenForm={setIsFormOpen}
          />
        )}
      </div>
    </div>
  );
};
