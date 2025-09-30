import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import PropTypes from 'prop-types';

type Props = {
  comments: Comment[];
  openedPost: Post;
  isLoading: boolean;
  errorMessage: string | null;
  openForm: boolean;
  setOpenForm: (value: boolean) => void;
  addCommentHandler: (
    postId: number,
    name: string,
    email: string,
    body: string,
  ) => void;
  handleDeleteComment: (id: number) => void;
};

export const PostDetails: React.FC<Props> = ({
  comments,
  openedPost,
  isLoading,
  errorMessage,
  openForm,
  setOpenForm,
  addCommentHandler,
  handleDeleteComment,
}) => {
  const handleDeleteBtnClick = (id: number) => {
    handleDeleteComment(id);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${openedPost.id}: ${openedPost.title}`}
          </h2>

          <p data-cy="PostBody">{openedPost.body}</p>
        </div>

        <div className="block">
          {isLoading && <Loader />}

          {errorMessage && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!isLoading && !errorMessage && comments.length === 0 && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}
          {!isLoading && !errorMessage && comments.length > 0 && (
            <>
              <p className="title is-4">Comments:</p>

              {comments.map(comment => (
                <article
                  key={comment.id}
                  className="message is-small"
                  data-cy="Comment"
                >
                  <div className="message-header">
                    <a href={`mailto:${comment.email}`} data-cy="CommentAuthor">
                      {comment.name}
                    </a>
                    <button
                      data-cy="CommentDelete"
                      type="button"
                      className="delete is-small"
                      aria-label="delete"
                      onClick={() => handleDeleteBtnClick(comment.id)}
                    >
                      delete button
                    </button>
                  </div>

                  <div className="message-body" data-cy="CommentBody">
                    {comment.body}
                  </div>
                </article>
              ))}
            </>
          )}

          {!openForm && !isLoading && !errorMessage && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setOpenForm(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {openForm && (
          <NewCommentForm
            openedPost={openedPost}
            isLoading={isLoading}
            addCommentHandler={addCommentHandler}
          />
        )}
      </div>
    </div>
  );
};

PostDetails.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      postId: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
    }),
  ).isRequired as React.Validator<Comment[]>,
  openedPost: PropTypes.shape({
    id: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
  isLoading: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  openForm: PropTypes.bool.isRequired,
  setOpenForm: PropTypes.func.isRequired,
  addCommentHandler: PropTypes.func.isRequired,
  deleteCommentHandler: PropTypes.func.isRequired,
};
