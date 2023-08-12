import { deleteComment } from '../../api/posts';
import { Comment } from '../../types/Comment';
import { Post } from '../../types/Post';
import { Loader } from '../Loader';
import { NewCommentForm } from '../NewCommentForm/NewCommentForm';

type Props = {
  comments: Comment[],
  selectedPost: Post | null,
  isErrorComments: boolean,
  isLoadingComments: boolean,
  isFormShown: boolean,
  setComments: React.Dispatch<React.SetStateAction<Comment[] | null>>,
  setIsErrorComments: (v: boolean) => void,
  setIsFormShown: (v: boolean) => void,
};

export const PostDetails: React.FC<Props> = ({
  comments,
  selectedPost,
  isErrorComments,
  isLoadingComments,
  isFormShown,
  setComments,
  setIsErrorComments,
  setIsFormShown,
}) => {
  const handleDeleteComment = (commentId: number) => {
    setComments(currentComments => currentComments && currentComments
      .filter(comment => comment.id !== commentId));

    deleteComment(commentId)
      .catch(() => {
        setIsErrorComments(true);
      });
  };

  return (
    <div
      className="content"
      data-cy="PostDetails"
    >
      <div
        className="content"
        data-cy="PostDetails"
      >
        {selectedPost && (
          <div className="block">
            <h2 data-cy="PostTitle">

              {`#${selectedPost.id}: ${selectedPost.title}`}
            </h2>

            <p data-cy="PostBody">
              {selectedPost.body}
            </p>
          </div>
        )}

        <div className="block">
          {isLoadingComments && <Loader />}

          {!isLoadingComments && isErrorComments && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!isErrorComments && !isLoadingComments && comments.length < 1 && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {!isErrorComments && !isLoadingComments && comments.length > 0 && (
            <>
              <p className="title is-4">Comments:</p>

              {comments.map(comment => {
                const {
                  id,
                  name,
                  email,
                  body,
                } = comment;

                return (
                  <article
                    className="message is-small"
                    data-cy="Comment"
                    key={id}
                  >
                    <div className="message-header">
                      <a
                        href={`mailto:${email}`}
                        data-cy="CommentAuthor"
                      >
                        {name}
                      </a>
                      <button
                        data-cy="CommentDelete"
                        type="button"
                        className="delete is-small"
                        aria-label="delete"
                        onClick={() => handleDeleteComment(id)}
                      >
                        delete button
                      </button>
                    </div>

                    <div className="message-body" data-cy="CommentBody">
                      {body}
                    </div>
                  </article>
                );
              })}
            </>
          )}
          {!isErrorComments && !isLoadingComments && !isFormShown && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsFormShown(!isFormShown)}
            >
              Write a comment
            </button>
          )}

        </div>
        {!isErrorComments && selectedPost && isFormShown && (
          <NewCommentForm
            setIsErrorComments={setIsErrorComments}
            setComments={setComments}
            postId={selectedPost.id}
          />
        )}
      </div>
    </div>
  );
};
