import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { CommentsError } from './CommentsError';
import { NoCommentsMessage } from './NoCommentsMessage';
import { Comments } from './Comments';
import { WriteCommentButton } from './WriteCommentButton';
import { PostTitle } from './PostTitle';
import { PostBody } from './PostBody';
import { Comment, CommentData } from '../types/Comment';

interface PostDetailsProps {
  openedPost: Post;
  hasCommentsError: boolean;
  comments: Comment[] | [];
  hasCommentsLoader: boolean;
  handleDeleteComment: (commentId: number) => void;
  hasError: boolean;
  handleAddComment: (
    comment: CommentData & { postId: number },
    onSuccess: () => void,
  ) => void;
  hasAddCommentLoader: boolean;
  setIsCommentFormOpened: (val: boolean) => void;
  isCommentFormOpened: boolean;
}

export const PostDetails: React.FC<PostDetailsProps> = ({
  openedPost,
  hasCommentsError,
  comments,
  hasCommentsLoader,
  handleDeleteComment,
  hasError,
  handleAddComment,
  hasAddCommentLoader,
  setIsCommentFormOpened,
  isCommentFormOpened,
}) => {
  const shouldShowCommentsError = hasCommentsError && !hasError;
  const shouldShowComment = !shouldShowCommentsError && !hasCommentsLoader;
  const shouldShowNoCommentsMessage =
    comments?.length === 0 && shouldShowComment;
  const shouldShowComments = comments && shouldShowComment;
  const shouldShowCommentButton = !isCommentFormOpened && shouldShowComment;
  const shouldShowNewCommentForm = isCommentFormOpened && shouldShowComment;

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <PostTitle openedPost={openedPost} />

          <PostBody openedPost={openedPost} />
        </div>

        <div className="block">
          {hasCommentsLoader && <Loader />}

          {shouldShowCommentsError && <CommentsError />}

          {shouldShowNoCommentsMessage ? (
            <NoCommentsMessage />
          ) : (
            !hasCommentsLoader && <p className="title is-4">Comments:</p>
          )}

          {shouldShowComments && (
            <Comments
              comments={comments}
              handleDeleteComment={handleDeleteComment}
            />
          )}

          {shouldShowCommentButton && (
            <WriteCommentButton
              setIsCommentFormOpened={setIsCommentFormOpened}
            />
          )}
        </div>
        {shouldShowNewCommentForm && (
          <NewCommentForm
            handleAddComment={handleAddComment}
            openedPost={openedPost}
            hasAddCommentLoader={hasAddCommentLoader}
          />
        )}
      </div>
    </div>
  );
};
