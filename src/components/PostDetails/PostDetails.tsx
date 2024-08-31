import React, { useEffect, useState } from 'react';

import { Loader } from '../Loader';
import { NewCommentForm } from '../NewCommentForm';
import { useAppContext } from '../../BLoC/App/AppContext';
import { Notification } from '../Notification';
import { Future } from '../Future';
import { CommentCard } from '../CommentCard';

import { NotificationType } from '../../enums';

export const PostDetails: React.FC = () => {
  const { selectedPost, comments } = useAppContext();

  const [hasCommentForm, setHasCommentForm] = useState(false);

  useEffect(() => setHasCommentForm(false), [selectedPost]);

  function handleInitiateComment() {
    setHasCommentForm(true);
  }

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${selectedPost?.id}: ${selectedPost?.title}`}
          </h2>

          <p data-cy="PostBody">{selectedPost?.body}</p>
        </div>

        <div className="block">
          <Future
            future={comments}
            whilePending={() => <Loader />}
            whileError={() => {
              return (
                <Notification
                  type={NotificationType.Error}
                  text="Something went wrong!"
                  data-cy="CommentsError"
                />
              );
            }}
            whileReady={value => {
              return (
                <>
                  {value?.length === 0 ? (
                    <p className="title is-4" data-cy="NoCommentsMessage">
                      No comments yet
                    </p>
                  ) : (
                    <>
                      <p className="title is-4">Comments:</p>

                      {value?.map(comment => (
                        <CommentCard key={comment.id} comment={comment} />
                      ))}
                    </>
                  )}

                  {!hasCommentForm && (
                    <button
                      onClick={handleInitiateComment}
                      data-cy="WriteCommentButton"
                      type="button"
                      className="button is-link"
                    >
                      Write a comment
                    </button>
                  )}
                </>
              );
            }}
          />
        </div>

        {hasCommentForm && <NewCommentForm />}
      </div>
    </div>
  );
};
