import React, { useContext, useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { DispatchContext, StateContext } from '../Store';
import { deleteComment, getComments } from '../api/comments';

type Props = {
  selectedPost: Post;
};

export const PostDetails: React.FC<Props> = ({ selectedPost }) => {
  const { id, title, body } = selectedPost;
  const [load, setLoad] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [hasForm, setHasForm] = useState(false);

  const { comments } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const handleDelete = (commentId: number) => {
    deleteComment(commentId);
    dispatch({ type: 'deleteComment', id: commentId });
  };

  useEffect(() => {
    setLoad(true);

    getComments(id)
      .then(response => {
        dispatch({ type: 'setComments', comments: response });
        setHasForm(false);
      })
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setLoad(false));
  }, [dispatch, id]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${id}: ${title}`}</h2>

          <p data-cy="PostBody">{body}</p>
        </div>

        <div className="block">
          {load && <Loader />}

          {errorMessage && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!comments.length && !load && !errorMessage && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {!!comments.length && !load && (
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
                      onClick={() => handleDelete(comment.id)}
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

          {!hasForm && !load && !errorMessage && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setHasForm(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {hasForm && <NewCommentForm id={id} />}
      </div>
    </div>
  );
};
