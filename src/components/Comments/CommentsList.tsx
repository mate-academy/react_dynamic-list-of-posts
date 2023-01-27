import { FC } from 'react';
import { CommentItem } from './CommentItem';
import { NewCommentForm } from './NewCommentForm';
import { useComments } from '../../hooks/useComments';
import { Loader } from '../Loader';
import { useUiStore } from '../../store/uiStore';

type Props = {
  postId: number;
};

export const CommentsList: FC<Props> = ({ postId }) => {
  const { data: comments, isLoading, isError } = useComments(postId);
  const openForm = useUiStore((state) => state.setIsCommentOpen);
  const isFormOpen = useUiStore((state) => state.isCommentOpen);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <div className="notification is-danger" data-cy="CommentsError">
        Something went wrong
      </div>
    );
  }

  return (
    <>
      <p className="title is-4">Comments:</p>

      {comments.length > 0 ? (
        comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))
      ) : (
        <p className="title is-4" data-cy="NoCommentsMessage">
          No comments yet
        </p>
      )}
      {!isFormOpen && (
        <button
          data-cy="WriteCommentButton"
          type="button"
          className="button is-link"
          onClick={() => openForm(true)}
        >
          Write a comment
        </button>
      )}
      {isFormOpen && <NewCommentForm postId={postId} />}
    </>
  );
};
