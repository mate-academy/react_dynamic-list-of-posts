/* eslint-disable func-names */
import { useContext, useEffect, useState } from 'react';
import { Comment, IPost, IError } from '../types';
import { deleteComment, getComments } from '../utils/api';
import { AppContext } from './Context/AppContext';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

type Props = {
  post: IPost | null
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [error, setError] = useState(IError.None);

  const {
    isFormOpen,
    isLoadingComments: isLoading,
    setFormOpen,
    setLoading,
  } = useContext(AppContext);

  const { id, title, body } = post || {};
  const savedComments = comments;
  const hasError = (error === IError.Add || error === IError.Delete);
  const isButtonVisible = !isLoading && !isFormOpen && !error;

  const updateComments = (updatedComments: Comment[]) => {
    setComments(updatedComments);
  };

  const handleError = (err: IError) => setError(err);

  useEffect(() => {
    (async function () {
      if (id) {
        setLoading(true);
        try {
          setComments(await getComments(id));
        } catch {
          setError(IError.Load);
        } finally {
          setLoading(false);
        }
      }
    }());
  }, [post]);

  useEffect(() => {
    setError(IError.None);
  }, [comments]);

  const onDelete = (commentId: number) => () => {
    const filteredComments = comments
      .filter(comment => comment.id !== commentId);

    setComments(filteredComments);

    try {
      deleteComment(commentId);
    } catch {
      setComments(savedComments);
      setError(IError.Delete);
    }
  };

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

          {error === IError.Load && (
            <div
              className="notification is-danger"
              data-cy="CommentsError"
            >
              Something went wrong
            </div>
          )}

          {!isLoading && !error && (
            comments.length === 0
              ? (
                <p
                  className="title is-4"
                  data-cy="NoCommentsMessage"
                >
                  No comments yet
                </p>
              )
              : (
                <>
                  <p className="title is-4">Comments:</p>

                  {comments.map(comment => (
                    <article
                      key={comment.id}
                      className="message is-small"
                      data-cy="Comment"
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
                          onClick={onDelete(comment.id)}
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
              ))}

          {hasError && (
            <div className="notification is-danger">
              {`Could not ${error === IError.Add
                ? 'add'
                : 'delete'} comment`}
            </div>
          )}

          {isButtonVisible && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setFormOpen(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {isFormOpen && !isLoading && (
          <NewCommentForm
            postId={id as number}
            setComments={updateComments}
            comments={comments}
            setError={handleError}
          />
        )}
      </div>
    </div>
  );
};
