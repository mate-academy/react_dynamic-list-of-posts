import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import * as commentsServices from '../api/apiCommentsFromServer';
import { Post } from '../types/Post';
import { AppComment } from '../types/Comment';

type Props = {
  selectedPostId: number | null;
  selectedPost: Post | undefined;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
};

export const PostDetails: React.FC<Props> = ({
  selectedPostId,
  selectedPost,
  error,
  setError,
}) => {
  const [comments, setComments] = useState<AppComment[]>([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [isWriteComment, setIsWriteComment] = useState(false);
  const [errorDeletion, setErrorDeletion] = useState('');

  useEffect(() => {
    if (selectedPostId) {
      setIsLoadingComments(true);

      commentsServices
        .getComments(selectedPostId)
        .then(setComments)
        .catch(() => setError('Something went wrong!'))
        .finally(() => setIsLoadingComments(false));
    }

    setIsWriteComment(false);
  }, [selectedPostId]);

  function deleteComment(commentId: number) {
    setErrorDeletion('');

    const prevComments = comments;

    setComments(currentComments =>
      currentComments.filter(comment => comment.id !== commentId),
    );

    return commentsServices.deleteComment(commentId).catch(e => {
      setComments(prevComments);
      setErrorDeletion('Unable to delete a comment');
      throw e;
    });
  }

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
          {isLoadingComments && <Loader />}
          {!isLoadingComments && error && (
            <div className="notification is-danger" data-cy="CommentsError">
              {error}
            </div>
          )}
          {!isLoadingComments && !error && comments.length === 0 && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}
          {!isLoadingComments && !error && comments.length > 0 && (
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
              {errorDeletion && (
                <div className="notification is-danger" data-cy="CommentsError">
                  {errorDeletion}
                </div>
              )}
            </>
          )}
          {!isLoadingComments && !error && !isWriteComment && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsWriteComment(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {isWriteComment && (
          <NewCommentForm
            setComments={setComments}
            selectedPostId={selectedPostId}
          />
        )}
      </div>
    </div>
  );
};
