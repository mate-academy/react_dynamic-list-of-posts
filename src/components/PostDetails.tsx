import React, { useContext, useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { DispatchContext, StateContext } from './PostsProvider';
import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';
import { Comment } from '../types/Comment';
import { Error } from '../types/Error';
import { URL } from '../types/Url';

export const PostDetails: React.FC = () => {
  const {
    selectedPost,
    postComments,
    errorMessage,
  } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const { body, id, title } = selectedPost as Post;

  const [isFormVisible, setIsFormVisible] = useState(false);

  const hasCommentsError = errorMessage === Error.Comments;
  const isLoading = !postComments && !hasCommentsError;
  const hasComments = !hasCommentsError && !!postComments?.length;
  const hasNoComments
    = !postComments?.length
    && !isLoading
    && !hasCommentsError;
  const isButtonVisible = !hasCommentsError && !isFormVisible;

  useEffect(() => {
    (async () => {
      try {
        const comments = await client.get<Comment[]>(`${URL.Comments}?postId=${id}`);

        dispatch({ type: 'loadComments', payload: comments });
      } catch (error) {
        dispatch({ type: 'error', payload: Error.Comments });
      }
    })();
  }, [dispatch, id]);

  useEffect(() => {
    setIsFormVisible(false);
  }, [id]);

  const writeComment = () => {
    setIsFormVisible(true);
  };

  const deleteComment = async (commetId: number) => {
    try {
      dispatch({ type: 'deleteComment', payload: commetId });
      await client.delete(`${URL.Comments}/${commetId}`);
    } catch (error) {
      dispatch({ type: 'error', payload: Error.DeleteComment });
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

          {hasCommentsError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong!
            </div>
          )}

          {hasNoComments && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {hasComments && (
            <>
              <p className="title is-4">Comments:</p>

              {postComments.map(comment => (
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
            </>
          )}

          {isButtonVisible && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={writeComment}
            >
              Write a comment
            </button>
          )}
        </div>

        {isFormVisible && <NewCommentForm />}
      </div>
    </div>
  );
};
