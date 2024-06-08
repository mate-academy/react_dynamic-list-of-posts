import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { createComment, getComments } from '.././utils/postServices';
import { Comment, CommentData } from '../types/Comment';

type Props = {
  selectedPost: Post | null;
};

export const PostDetails: React.FC<Props> = ({ selectedPost }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreatingMode, setIsCreatingMode] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const addComment = (newComment: CommentData) => {
    const comment: Comment = {
      id: 0,
      postId: selectedPost?.id || 0,
      ...newComment,
    };

    setIsLoading(true);

    createComment(comment)
      .then(() => {
        setComments(currentComments => [...currentComments, comment]);
      })
      .catch(() => {
        setErrorMessage('Unable to add a comment');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setIsCreatingMode(false);
    if (selectedPost) {
      setIsLoading(true);

      getComments(selectedPost.id)
        .then(data => setComments(data as unknown as Comment[]))
        .catch(() => setErrorMessage('Something went wrong'))
        .finally(() => setIsLoading(false));
    }
  }, [selectedPost, selectedPost?.id]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${selectedPost?.id} ${selectedPost?.title}`}
          </h2>

          <p data-cy="Postody">{selectedPost?.body}</p>
        </div>

        <div className="block">
          {isLoading && <Loader />}

          {errorMessage && (
            <div className="notification is-danger" data-cy="CommentsError">
              {errorMessage}
            </div>
          )}

          {comments.length === 0 ? (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          ) : (
            <>
              <p className="title is-4">Comments:</p>

              {comments.map(comment => (
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

          {/* <article className="message is-small" data-cy="Comment">
            <div className="message-header">
              <a href="mailto:misha@mate.academy" data-cy="CommentAuthor">
                Misha Hrynko
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
              One more comment
            </div>
          </article>

          <article className="message is-small" data-cy="Comment">
            <div className="message-header">
              <a href="mailto:misha@mate.academy" data-cy="CommentAuthor">
                Misha Hrynko
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
              {'Multi\nline\ncomment'}
            </div>
          </article> */}

          {!isCreatingMode && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsCreatingMode(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {isCreatingMode && (
          <NewCommentForm onSubmit={addComment} isLoading={isLoading} />
        )}
      </div>
    </div>
  );
};
