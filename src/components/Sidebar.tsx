import classNames from 'classnames';
import { PostDetails } from './PostDetails';
import { Post } from '../types/Post';
import { Comment, CommentData } from '../types/Comment';

interface SidebarProps {
  openedPost: Post;
  hasCommentsError: boolean;
  comments: Comment[] | [];
  hasCommentsLoader: boolean;
  handleDeleteComment: (postId: number) => void;
  hasError: boolean;
  handleAddComment: (
    comment: CommentData & { postId: number },
    onSuccess: () => void,
  ) => void;
  hasAddCommentLoader: boolean;
  setIsCommentFormOpened: (val: boolean) => void;
  isCommentFormOpened: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
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
  return (
    <div
      data-cy="Sidebar"
      className={classNames(
        'tile',
        'is-parent',
        'is-8-desktop',
        'Sidebar',
        'Sidebar--open',
      )}
    >
      <div className="tile is-child box is-success ">
        <PostDetails
          openedPost={openedPost}
          hasCommentsError={hasCommentsError}
          comments={comments}
          hasCommentsLoader={hasCommentsLoader}
          handleDeleteComment={handleDeleteComment}
          hasError={hasError}
          handleAddComment={handleAddComment}
          hasAddCommentLoader={hasAddCommentLoader}
          setIsCommentFormOpened={setIsCommentFormOpened}
          isCommentFormOpened={isCommentFormOpened}
        />
      </div>
    </div>
  );
};
