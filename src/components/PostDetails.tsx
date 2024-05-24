import React, { useContext, useEffect } from 'react';
import { Loader } from './Loader';
import { Comments } from './Comments';
import { NewCommentForm } from './NewCommentForm';
import { client } from '../utils/fetchClient';
import { DispatchContext, StateContext } from '../context/GlobalPostsProvider';
import classNames from 'classnames';
import { CommentType } from '../types/CommentType';

export const PostDetails: React.FC = () => {
  const {
    choosedPost, comments, isCommentsLoading,
    commentsFetchError, isOpenNewCommentForm, isWriteButtonHidden
  } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    const fetchComment = async () => {
      try {
        dispatch({ type: 'isCommentsLoading', isCommentsLoading: true });
        const fetchedComment = await client.get<CommentType[]>(`/comments?postId=${choosedPost?.id}`);

        dispatch({ type: 'setComments', comments: fetchedComment });
      } catch (error) {
        dispatch({ type: 'setCommentsFetchError', commentsFetchError: true });
      } finally {
        dispatch({ type: 'isCommentsLoading', isCommentsLoading: false });
      }
    };

    fetchComment();
  }, [choosedPost, dispatch]);

  const handleOpenNewCommentForm = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    dispatch({ type: 'isWriteButtonHidden', isWriteButtonHidden: false });
    dispatch({ type: 'isOpenNewCommentForm', isOpenNewCommentForm: true });
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            #{choosedPost?.id}: {choosedPost?.title}
          </h2>

          <p data-cy="PostBody">
            {choosedPost?.body}
          </p>
        </div>

        <div className="block">
          {isCommentsLoading && comments.length >= 0 && <Loader />}

          {commentsFetchError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!isCommentsLoading && comments.length === 0 &&
            !commentsFetchError && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {!isCommentsLoading && comments.length > 0 && !commentsFetchError && (
            <>
              <p className="title is-4">Comments:</p>
              {comments.filter(comment => comment?.name).map((comment) => {
                return (
                  <Comments key={comment?.id} comment={comment} />
                );
              })}
            </>
          )}

          {!isCommentsLoading && isWriteButtonHidden && !commentsFetchError && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className={classNames(
                "button is-link",
                { "is-hidden": isOpenNewCommentForm }
              )}
              onClick={handleOpenNewCommentForm}
            >
              Write a comment
            </button>
          )}
        </div>

        {isOpenNewCommentForm && !commentsFetchError && <NewCommentForm />}
      </div>
    </div>
  );
};
