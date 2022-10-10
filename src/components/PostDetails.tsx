import React, { useCallback, useEffect, useState } from 'react';
import { IComment } from '../types/Comment';
import { IPost } from '../types/Post';
import { deleteComment, getComments } from '../utils/fetchClient';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

interface Props {
  activePost: IPost;
}

export const PostDetails: React.FC<Props> = ({ activePost }) => {
  const [comments, setComments] = useState<IComment[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isOpenForm, setIsOpenForm] = useState<boolean>(false);

  const handleDeleteComment = useCallback((id: number) => {
    setComments(comments?.filter((comment: IComment) => {
      return comment.id !== id;
    }));

    deleteComment(id);
  }, [comments]);

  const handleAddComment = useCallback((comment: IComment) => {
    setComments([comment, ...comments]);
  }, [comments]);

  const openForm = useCallback(() => {
    setIsOpenForm(true);
  }, []);

  useEffect(() => {
    setIsLoading(true);

    getComments(activePost.id)
      .then(setComments)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, [activePost]);

  const { id, title, body } = activePost;

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${id}: ${title}`}
          </h2>

          <p data-cy="PostBody">
            {body}
          </p>
        </div>

        <div className="block">
          {isLoading && <Loader />}

          {isError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {comments?.length !== 0 ? (
            <div style={{ marginBottom: '1em' }}>
              <p className="title is-4">Comments:</p>

              {comments?.map((comment: IComment) => (
                <article
                  className="message is-small"
                  data-cy="Comment"
                  key={comment.id}
                >
                  <div className="message-header">
                    <a
                      href="mailto:misha@mate.academy"
                      data-cy="CommentAuthor"
                    >
                      {comment.name}
                    </a>
                    <button
                      data-cy="CommentDelete"
                      type="button"
                      className="delete is-small"
                      aria-label="delete"
                      onClick={() => handleDeleteComment(comment.id)}
                    >
                      delete button
                    </button>
                  </div>

                  <div className="message-body" data-cy="CommentBody">
                    {comment.body}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {!isOpenForm && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={openForm}
            >
              Write a comment
            </button>
          )}
        </div>
        {isOpenForm && (
          <NewCommentForm
            post={activePost}
            handleAddComment={handleAddComment}
          />
        )}
      </div>
    </div>
  );
};
