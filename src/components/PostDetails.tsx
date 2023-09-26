import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import { Post } from '../types/Post';
import { deleteComment, getComments } from '../utils/loadutil';
import { StateContext } from './AppContext';
import { ACTIONS } from '../utils/enums';
import { NewCommentForm } from './NewCommentForm';
import { Comment } from '../types/Comment';
import { Loader } from './Loader';

type Props = {
  post: Post,
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const { state, dispatch } = useContext(StateContext);
  const [showNewCommentForm, setShowNewCommentForm] = useState(false);

  function handleShowCommentForm() {
    setShowNewCommentForm(!showNewCommentForm);
    dispatch({ type: ACTIONS.SHOWFORM, payload: true });
  }

  useEffect(() => {
    if (state.selectedPost.id) {
      dispatch({ type: ACTIONS.IS_LOADING, payload: true });
      getComments(state.selectedPost.id)
        .then(res => {
          if ('error' in res) {
            dispatch({ type: ACTIONS.SET_ERROR, payload: 'error' });
          }

          dispatch({ type: ACTIONS.SET_COMMENTS, payload: res });
          dispatch({ type: ACTIONS.IS_LOADING, payload: true });
        })
        .catch(() => dispatch({ type: ACTIONS.SET_ERROR, payload: 'error' }))
        .finally(() => dispatch({ type: ACTIONS.IS_LOADING, payload: false }));
    }
  }, [post.id, state.selectedPost.id]);

  function handleDelete(comment: Comment) {
    dispatch({ type: ACTIONS.DELETE_COMMENT, payload: comment });
    deleteComment(comment.id);
  }

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${post.id}: `}
            {post.title}
          </h2>

          <p data-cy="PostBody">
            {post.body}
          </p>
        </div>

        <div className="block">
          {state.isLoading && (
            <Loader />
          )}

          {state.error === 'error' && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          <p className="title is-4">Comments:</p>
          {state.comments.map(comment => {
            return (
              <article
                className="message is-small"
                data-cy="Comment"
                key={comment.id}
              >
                <div className="message-header">
                  <a href={comment.email} data-cy="CommentAuthor">
                    {comment.name}
                  </a>
                  <button
                    data-cy="CommentDelete"
                    type="button"
                    className="delete is-small"
                    aria-label="delete"
                    onClick={() => handleDelete(comment)}
                  >
                    delete button
                  </button>
                </div>

                <div className="message-body" data-cy="CommentBody">
                  {comment.body}
                </div>
              </article>
            );
          })}

          {!state.showForm ? (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={handleShowCommentForm}
            >
              Write a comment
            </button>
          ) : (
            <NewCommentForm />
          )}
        </div>

      </div>
    </div>
  );
};
