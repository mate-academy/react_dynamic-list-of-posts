import { Loader } from './Loader';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { NewCommentForm } from './NewCommentForm';
import { Dispatch, SetStateAction } from 'react';
import { deleteComment } from '../utils/fetchClient';

type Props = {
  selectedUserPost: Post | null;
  commentsOfPostId: Comment[];
  isPostCommentsLoading: boolean;
  errorMessage: string;
  setIsAddCommentFormActive: (state: boolean) => void;
  isAddCommentFormActive: boolean;
  setCommentsOfPostId: Dispatch<SetStateAction<Comment[]>>;
  setErrorMessage: (error: string) => void;
};

export const PostDetails: React.FC<Props> = ({
  selectedUserPost,
  commentsOfPostId,
  isPostCommentsLoading,
  errorMessage,
  setIsAddCommentFormActive,
  isAddCommentFormActive,
  setCommentsOfPostId,
  setErrorMessage,
}) => {
  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            #{selectedUserPost?.id}: {selectedUserPost?.title}
          </h2>

          <p data-cy="PostBody">{selectedUserPost?.body}</p>
        </div>

        {isPostCommentsLoading ? (
          <Loader />
        ) : (
          <>
            {' '}
            <div className="block">
              {Boolean(errorMessage.length) && (
                <div className="notification is-danger" data-cy="CommentsError">
                  {errorMessage}
                </div>
              )}

              {commentsOfPostId.length === 0 && !errorMessage && (
                <p className="title is-4" data-cy="NoCommentsMessage">
                  No comments yet
                </p>
              )}

              {Boolean(commentsOfPostId.length) && (
                <>
                  <p className="title is-4">Comments:</p>

                  {commentsOfPostId.map(comment => (
                    <article
                      className="message is-small"
                      data-cy="Comment"
                      key={comment.id}
                    >
                      <div className="message-header">
                        <a
                          href={`mailto:${comment.email}`}
                          data-cy="CommentAuthor"
                        >
                          {comment.name}
                        </a>
                        <button
                          data-cy="CommentDelete"
                          type="button"
                          className="delete is-small"
                          aria-label="delete"
                          onClick={() => {
                            deleteComment(comment.id).then(() => {
                              setCommentsOfPostId(prevComments =>
                                prevComments.filter(
                                  currComment => currComment.id !== comment.id,
                                ),
                              );
                            });
                          }}
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

              {!isAddCommentFormActive && !Boolean(errorMessage.length) && (
                <button
                  data-cy="WriteCommentButton"
                  type="button"
                  className="button is-link"
                  onClick={() => setIsAddCommentFormActive(true)}
                >
                  Write a comment
                </button>
              )}
            </div>
          </>
        )}

        {isAddCommentFormActive && (
          <NewCommentForm
            selectedUserPost={selectedUserPost}
            setCommentsOfPostId={setCommentsOfPostId}
            setErrorMessage={setErrorMessage}
          />
        )}
      </div>
    </div>
  );
};
