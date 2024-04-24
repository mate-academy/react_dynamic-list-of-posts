import React from 'react';
// import { Loader } from './Loader';
import * as commentService from '../api/comments';

import { NewCommentForm } from './NewCommentForm';
import {
  useGlobalDispatchContext,
  useGlobalStateContext,
} from './GlobalStateProvider';
import { Loader } from './Loader';

export const PostDetails: React.FC = () => {
  const { selectedPost, comments, sidebarError, isCommentsLoading } =
    useGlobalStateContext();
  const dispatch = useGlobalDispatchContext();

  const [isActive, setIsActive] = React.useState(false);

  const handleOnSetActive = () => setIsActive(!isActive);

  const handleOnDeleteComment = (id: number) => {
    dispatch({
      type: 'DELETE_COMMENT',
      payload: id,
    });

    commentService.deleteComment(id);
  };

  if (sidebarError) {
    return (
      <div className="notification is-danger" data-cy="CommentsError">
        {sidebarError}
      </div>
    );
  }

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        {selectedPost && (
          <div className="block">
            <h2 data-cy="PostTitle">
              #{selectedPost.id}: {selectedPost.title}
            </h2>

            <p data-cy="PostBody">{selectedPost.body}</p>
          </div>
        )}

        <div className="block">
          {isCommentsLoading ? (
            <Loader />
          ) : (
            <>
              <p
                className="title is-4"
                data-cy={!comments.length ? 'NoCommentsMessage' : ''}
              >
                {!comments.length ? 'No comments yet' : 'Comments:'}
              </p>

              {comments.map(comment => {
                const { name, body, email, id } = comment;

                return (
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
                        onClick={() => handleOnDeleteComment(id)}
                      >
                        delete button
                      </button>
                    </div>

                    <div className="message-body" data-cy="CommentBody">
                      {body}
                    </div>
                  </article>
                );
              })}

              {!isActive && (
                <button
                  data-cy="WriteCommentButton"
                  type="button"
                  className="button is-link"
                  onClick={handleOnSetActive}
                >
                  Write a comment
                </button>
              )}
            </>
          )}
        </div>

        {isActive && !sidebarError && !isCommentsLoading && (
          <NewCommentForm id={selectedPost?.id || null} />
        )}
      </div>
    </div>
  );
};
