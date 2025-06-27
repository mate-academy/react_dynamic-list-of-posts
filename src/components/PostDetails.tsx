import { Post } from '../types/Post';
import { Comment, CommentData } from '../types/Comment';
import { ServiceErrorsValues } from '../types/Errors';
import { Loader } from './Loader';
import { CommentsList } from './CommentsList';
import { NewCommentForm } from './NewCommentForm';

interface Props {
  post: Post | null;
  comments: Comment[];
  isLoadingComments: boolean;
  errorComments: ServiceErrorsValues | null;
  deleteComment: (commentId: number) => Promise<void>;
  setIsFormVisible: (value: boolean) => void;
  isFormVisible: boolean;
  addComment: (value: CommentData) => Promise<void>;
  isLoadingForAdd: boolean;
}

export const PostDetails: React.FC<Props> = ({
  post,
  comments,
  isLoadingComments,
  errorComments,
  deleteComment,
  setIsFormVisible,
  isFormVisible,
  addComment,
  isLoadingForAdd,
}) => {
  const shouldShowNoCommentsYet =
    comments.length === 0 && !isLoadingComments && errorComments === null;
  const shouldShowButtonNewPost =
    post !== null &&
    !isFormVisible &&
    errorComments === null &&
    !isLoadingComments;
  const shouldShowComments =
    post !== null && comments.length > 0 && !isLoadingComments;

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${post?.id}: ${post?.title}`}</h2>

          <p data-cy="PostBody">{post?.body}</p>
        </div>

        <div className="block">
          {isLoadingComments && <Loader />}

          {errorComments && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {shouldShowNoCommentsYet && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {shouldShowComments && (
            <CommentsList comments={comments} deleteComment={deleteComment} />
          )}

          {shouldShowButtonNewPost && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsFormVisible(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {isFormVisible && (
          <NewCommentForm
            addComment={addComment}
            isLoadingForAdd={isLoadingForAdd}
            postId={post?.id}
          />
        )}
      </div>
    </div>
  );
};
