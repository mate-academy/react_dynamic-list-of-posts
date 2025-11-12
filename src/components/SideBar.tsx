import { PostDetails } from './PostDetails';
import { Post } from '../types/Post';
import cn from 'classnames';
import { Comment as AppComment, CommentData } from '../types/Comment';
import { TypeErrorMessages } from '../types/ErrorMessages';

interface Props {
  selectedPost: Post | null;
  comments: AppComment[];
  loadingComments: boolean;
  errorMes: TypeErrorMessages | null;
  showForm: boolean;
  onNewComment: () => void;
  addNewComment: (postId: number, data: CommentData) => Promise<AppComment>;
  deleteComment: (commentId: number) => Promise<void>;
}

export const Sidebar = ({
  selectedPost,
  comments,
  loadingComments,
  errorMes,
  showForm,
  onNewComment,
  addNewComment,
  deleteComment,
}: Props) => {
  return (
    <div
      data-cy="Sidebar"
      className={cn('tile', 'is-parent', 'is-8-desktop', 'Sidebar', {
        'Sidebar--open': selectedPost !== null,
      })}
    >
      <div className="tile is-child box is-success ">
        {selectedPost !== null && (
          <PostDetails
            comments={comments}
            selectedPost={selectedPost}
            loadingComments={loadingComments}
            errorMes={errorMes}
            showForm={showForm}
            onNewComment={onNewComment}
            addNewComment={addNewComment}
            deleteComment={deleteComment}
          />
        )}
      </div>
    </div>
  );
};
