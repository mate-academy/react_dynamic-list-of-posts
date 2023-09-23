import { CommentType } from '../../types/Comment';
import { PostType } from '../../types/Post';
import { CommentsList } from '../CommentsList/CommentsList';
import { useComments } from '../Contexts/CommentsContext';
import { NewCommentForm } from '../NewCommentForm/NewCommentForm';

type Props = {
  onAddComment: (status: boolean) => void,
  onDeleteComment: (id: number) => void,
  comments: CommentType[],
  isNewComment: boolean,
  hasError: boolean,
  selectedPost: PostType,
};

export const PostDetails: React.FC<Props> = ({
  onAddComment,
  onDeleteComment,
  comments,
  isNewComment,
  hasError,
  selectedPost,
}) => {
  const { setComments } = useComments();

  const toggleAddCommentForm = () => {
    onAddComment(true);
  };

  const handleDeleteComment = (commentId: number) => {
    setComments(prev => prev.filter(({ id }) => id !== commentId));
    onDeleteComment(commentId);
  };

  return (
    <>
      {!hasError ? (
        <>
          <CommentsList
            comments={comments}
            onDelete={handleDeleteComment}
          />
          {isNewComment ? (
            <NewCommentForm selectedPost={selectedPost} />
          ) : (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={toggleAddCommentForm}
            >
              Write a comment
            </button>
          )}
        </>

      ) : (
        <div className="notification is-danger" data-cy="CommentsError">
          Something went wrong
        </div>
      )}
    </>
  );
};
