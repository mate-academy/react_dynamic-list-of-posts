import React, { useContext, useEffect, useState } from 'react';
import { DispatchContext, StateContext } from './store/store';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { deleteComment } from '../Api/getItems';

export const PostDetails: React.FC = () => {
  const dispatch = useContext(DispatchContext);
  const {
    userPosts,
    activePostId,
    vaitingPostComments,
    errorComment,
    postComments,
  } = useContext(StateContext);
  const [isUseWrite, setIsUseWrite] = useState(false);

  const noHaveComments = !!(
    activePostId &&
    !postComments.length &&
    !errorComment &&
    !vaitingPostComments
  );

  const handleDeleteComment = (id: number) => {
    dispatch({ type: 'SET_ERRORCOMMENTS', isUse: false });
    dispatch({ type: 'DELETE_COMMENT', id: id });

    deleteComment(id).catch(() => {
      dispatch({ type: 'SET_ERRORCOMMENTS', isUse: true });
      dispatch({ type: 'BACK_DELETECOMMENT' });
    });
  };

  useEffect(() => {
    setIsUseWrite(false);
  }, [activePostId]);

  const findCommentsPost = userPosts.find(post => post.id === activePostId);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{findCommentsPost?.title}</h2>

          <p data-cy="PostBody">{findCommentsPost?.body}</p>
        </div>

        <div className="block">
          {vaitingPostComments && <Loader />}

          {errorComment && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {noHaveComments && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {!!postComments.length && (
            <>
              <p className="title is-4">Comments:</p>

              {postComments.map(({ id, name, email, body }) => (
                <article
                  className="message is-small"
                  data-cy="Comment"
                  key={id}
                >
                  <div className="message-header">
                    <a href={`mailto:${email}`} data-cy="CommentAuthor">
                      {name}
                    </a>
                    <button
                      data-cy="CommentDelete"
                      type="button"
                      className="delete is-small"
                      aria-label="delete"
                      onClick={() => handleDeleteComment(id)}
                    >
                      delete button
                    </button>
                  </div>

                  <div className="message-body" data-cy="CommentBody">
                    {body}
                  </div>
                </article>
              ))}
            </>
          )}

          {!vaitingPostComments && !isUseWrite && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsUseWrite(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {isUseWrite && <NewCommentForm />}
      </div>
    </div>
  );
};
