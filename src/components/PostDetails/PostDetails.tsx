import { Loader } from '../Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../../types/Post';
import { Comment } from '../../types/Comment';
import { PostComment } from './PostComment';
import { ErrorMessages } from '../../types/ErrorMessages';

type Props = {
  selectedPost: Post | null;
  comments: Comment[];
  isOpenCommentForm: boolean;
  isLoadingComments: boolean;
  toggleCommentForm: () => void;
  handleDeleteComment: (commentId: number) => void;
  inputName: string;
  inputEmail: string;
  inputMessage: string;
  handleInputName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleInputEmail: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleInputMessage: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onResetForm: () => void;
  handleAddComment: (
    setIsSubmitted: React.Dispatch<React.SetStateAction<boolean>>,
  ) => void;
  isLoadingAdd: boolean;
  currentError: ErrorMessages | null;
};

export const PostDetails: React.FC<Props> = ({
  selectedPost,
  comments,
  isOpenCommentForm,
  isLoadingComments,
  isLoadingAdd,
  toggleCommentForm,
  handleDeleteComment,
  handleAddComment,
  inputName,
  inputEmail,
  inputMessage,
  handleInputName,
  handleInputEmail,
  handleInputMessage,
  onResetForm,
  currentError,
}) => {
  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${selectedPost?.id}: ${selectedPost?.title}`}
          </h2>

          <p data-cy="PostBody">{selectedPost?.body}</p>
        </div>

        {currentError === ErrorMessages.PostsLoadingError ? (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        ) : isLoadingComments ? (
          <Loader />
        ) : (
          <div className="block">
            {comments.length === 0 && currentError === null ? (
              <p className="title is-4" data-cy="NoCommentsMessage">
                No comments yet
              </p>
            ) : (
              <p className="title is-4">Comments:</p>
            )}

            {comments.map(comment => {
              return (
                <PostComment
                  key={comment.id}
                  comment={comment}
                  handleDeleteComment={handleDeleteComment}
                />
              );
            })}

            {!isOpenCommentForm ? (
              <button
                data-cy="WriteCommentButton"
                type="button"
                className="button is-link"
                onClick={() => toggleCommentForm()}
              >
                Write a comment
              </button>
            ) : (
              <NewCommentForm
                inputName={inputName}
                inputEmail={inputEmail}
                inputMessage={inputMessage}
                handleInputName={handleInputName}
                handleInputEmail={handleInputEmail}
                handleInputMessage={handleInputMessage}
                onResetForm={onResetForm}
                handleAddComment={handleAddComment}
                isLoadingAdd={isLoadingAdd}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
