import { useContext } from 'react';
import { StateContext } from '../../store';
import { Messages } from '../../libs/enums';
import { CommentsItem } from './CommentsItem';

export const CommentsList: React.FC = () => {
  const {
    comments: { comments },
  } = useContext(StateContext);

  const hasComments = !!comments.length;

  return (
    hasComments ? (
      <>
        <p className="title is-4">Comments:</p>

        {comments.map(comment => (
          <CommentsItem
            key={comment.id}
            comment={comment}
          />
        ))}
      </>
    ) : (
      <p className="title is-4" data-cy="NoCommentsMessage">
        {Messages.NoCommentsYet}
      </p>
    )
  );
};
