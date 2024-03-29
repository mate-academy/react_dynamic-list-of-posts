//dgffdgfghgfhhjdfgjhdfhj
import React, { useContext } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Context, DispatchContext } from '../Store';
import { deleteComment, getComments } from '../api/coments';

export const PostDetails: React.FC = () => {
  const { currentPost, errorComments, comments, writeCommentActive } =
    useContext(Context);
  const dispatch = useContext(DispatchContext);
  const { title, body, id } = currentPost || {};
  const [loaderComments, setLoaderComments] = React.useState(false);

  useEffect(() => {
    if (id) {
      setLoaderComments(true);
      getComments(id)
        .then(response => {
          dispatch({ type: 'setComments', payload: response });
        })
        .catch(() => {
          dispatch({
            type: 'setErrorComments',
            payload: 'Something went wrong!',
          });
        })
        .finally(() => {
          setLoaderComments(false);
        });
    }
  }, [currentPost, id, dispatch]);

  const handleDeleteComment = (commentId: number) => {
    if (currentPost && comments) {
      const newComments = comments.filter(comment => comment.id !== commentId);

      deleteComment(commentId);

      dispatch({ type: 'setComments', payload: newComments });
    }
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${id}: ${title}`}</h2>

          <p data-cy="PostBody">{body}</p>
        </div>

        <div className="block">
          {loaderComments && currentPost && <Loader />}

          {errorComments && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!comments?.length && !loaderComments && !errorComments && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {!!comments?.length && (
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
            </>
          )}

          {!writeCommentActive && !loaderComments && !errorComments && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() =>
                dispatch({ type: 'setWriteCommentActive', payload: true })
              }
            >
              Write a comment
            </button>
          )}
        </div>
        {writeCommentActive && <NewCommentForm />}
      </div>
    </div>
  );
};
