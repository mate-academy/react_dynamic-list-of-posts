/* eslint-disable */
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

type Props = {
  post: Post,
}

export const PostDetails: React.FC<Props> = ({ post }) => {
  const { state, dispatch } = useContext(StateContext);
  const [showNewCommentForm, setShowNewCommentForm] = useState(false);

  function handleShowCommentForm() {
    setShowNewCommentForm(!showNewCommentForm);
    dispatch({ type: ACTIONS.SHOWFORM, payload: true })
  }
  useEffect(() => {
    if (state.selectedPost.id) {
      getComments(state.selectedPost.id)
        .then(res => {
          dispatch({ type: ACTIONS.SET_COMMENTS, payload: res })
          console.log(res, 'res')
        })
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
            {`#${post.id}: `}{post.title}
          </h2>

          <p data-cy="PostBody">
            {post.body}
          </p>
        </div>

        <div className="block">
          {/* <Loader /> */}

          {/* <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>

          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p> */}


          <p className="title is-4">Comments:</p>
          {state.comments.map(comment => {
            return (
              <article className="message is-small" data-cy="Comment" key={comment.id}>
                <div className="message-header">
                  <a href="mailto:misha@mate.academy" data-cy="CommentAuthor">
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
            )
          }

          )}

          {/* <article className="message is-small" data-cy="Comment">
            <div className="message-header">
              <a
                href="mailto:misha@mate.academy"
                data-cy="CommentAuthor"
              >
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
            <div
              className="message-body"
              data-cy="CommentBody"
            >
              One more comment
            </div>
          </article> */}

          {/* <article className="message is-small" data-cy="Comment">
            <div className="message-header">
              <a
                href="mailto:misha@mate.academy"
                data-cy="CommentAuthor"
              >
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


