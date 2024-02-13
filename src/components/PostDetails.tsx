/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { deleteComment, getPostCommets } from '../utils/api';
import { Comment } from '../types/Comment';
import { ERROR_MESSAGE } from '../variables';

interface Props {
  choosedPost: Post | null
}

export const PostDetails: React.FC<Props> = ({
  choosedPost,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreate, setIsCreate] = useState(false);
  const [postErrorMessage, setPostErrorMessage] = useState('');

  useEffect(() => {
    setPostErrorMessage('');

    if (choosedPost) {
      getPostCommets(choosedPost?.id)
        .then(setComments)
        .catch(() => setPostErrorMessage(ERROR_MESSAGE))
        .finally(() => setIsLoading(false));
    }
  }, [choosedPost?.id]);

  function handlerDelete(currentCommentId: number) {
    setPostErrorMessage('');

    setComments(currentComments => currentComments
      .filter(currComment => currComment.id !== currentCommentId));

    deleteComment(currentCommentId)
      .then()
      .catch(() => setComments(comments))
      .finally();
  }

  const conditionForComments = !comments.length
    && !isLoading
    && !postErrorMessage;

  const conditionForCreationComment = !isLoading
    && comments.length >= 0
    && !isCreate
    && !postErrorMessage;

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${choosedPost?.id}: ${choosedPost?.title}`}
          </h2>

          <p data-cy="PostBody">
            {choosedPost?.body}
          </p>
        </div>

        <div className="block">
          {isLoading && <Loader />}

          {postErrorMessage && !isLoading && (
            <div className="notification is-danger" data-cy="CommentsError">
              {postErrorMessage}
            </div>
          )}

          {conditionForComments && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {comments.length > 0 && (
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
                      onClick={() => handlerDelete(comment.id)}
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

          {conditionForCreationComment && (
            <button
              onClick={() => setIsCreate(true)}
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
            >
              Write a comment
            </button>
          )}

        </div>

        {isCreate && (
          <NewCommentForm
            choosedPost={choosedPost}
            setComments={setComments}
            setPostErrorMessage={setPostErrorMessage}
          />
        )}
      </div>
    </div>
  );
};
