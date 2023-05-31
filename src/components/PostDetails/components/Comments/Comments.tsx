import { FC, useContext, useEffect } from 'react';
import { Message } from '../Message';
import { Notif, Error, CommentsProps } from '../../../../types';
import { Button, Notification } from '../../../index';
import { PostDetailsContext } from '../../../../context';

export const Comments: FC<CommentsProps> = ({
  isForm,
  setIsForm,
  removeComment,
}) => {
  const { error, comments } = useContext(PostDetailsContext);

  useEffect(() => () => setIsForm(false), []);

  const showForm = () => setIsForm(true);

  return (
    <>
      {!comments.length ? (
        <p className="title is-4" data-cy="NoCommentsMessage">
          No comments yet
        </p>
      ) : (
        <>
          <p className="title is-4">Comments:</p>

          {error === Error.RemoveComment && (
            <Notification type={Notif.Danger} text="Something went wrong!" />
          )}

          {comments.map(comment => (
            <Message
              key={comment.id}
              comment={{ ...comment }}
              removeComment={removeComment}
            />
          ))}
        </>
      )}

      {!isForm && (
        <Button dataCy="WriteCommentButton" onClick={showForm}>
          Write a comment
        </Button>
      )}
    </>
  );
};
