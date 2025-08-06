import React, { useContext, useEffect } from 'react';
import { Loader } from '../Loader';
import { NewCommentForm } from '../NewCommentForm/NewCommentForm';
import { Comments } from '../Comments';
import { Notif } from '../Notif';
import { NotificationContent } from '../../Context/NotificationManager';
import { CommentsContext } from '../../Context/CommentsContext';
import { CurrentPostContext } from '../../Context/CurrentPostContext';
import { IsFormContext } from '../../Context/IsForm';

export const PostDetails: React.FC = () => {
  const { commentForm, setCommentForm } = useContext(IsFormContext);
  const { notificationState } = useContext(NotificationContent);
  const { selectedPost } = useContext(CurrentPostContext);
  const { commentList, commentLoader } = useContext(CommentsContext);

  useEffect(() => {
    setCommentForm(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPost]);

  const handleNewComment = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setCommentForm(true);
  };

  const isPostDetailsError =
    (notificationState.alarm || notificationState.error) &&
    notificationState.source === 'PostDetails';

  const isCommentsError =
    notificationState.error && notificationState.source === 'PostDetails';

  return (
    <div className="content" data-cy="PostDetails">
      {selectedPost && (
        <div className="content" data-cy="PostDetails">
          <div className="block">
            <h2 data-cy="PostTitle">
              {`#${selectedPost.id}: ${selectedPost.title}`}
            </h2>

            <p data-cy="PostBody">{selectedPost.body}</p>
          </div>

          <div className="block">
            {commentLoader && <Loader />}

            {isPostDetailsError ? (
              <Notif />
            ) : (
              commentList.length > 0 && <Comments />
            )}

            {!commentForm && !commentLoader && !isCommentsError && (
              <button
                data-cy="WriteCommentButton"
                type="button"
                className="button is-link"
                onClick={event => handleNewComment(event)}
              >
                Write a comment
              </button>
            )}
          </div>

          {commentForm && <NewCommentForm postId={selectedPost.id} />}
        </div>
      )}
    </div>
  );
};
