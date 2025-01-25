import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';
import { useState } from 'react';

type Props = {
  selectedPost: Post;
  comments: Comment[];
  setComments: (comments: Comment[]) => void;
  isSideBarLoading: boolean;
  isError: boolean;
  setIsError: (isError: boolean) => void;
  isFormVisible: boolean;
  setIsFormVisible: (isFormVisible: boolean) => void;
};

export const PostDetails: React.FC<Props> = ({
  selectedPost,
  comments,
  isSideBarLoading,
  isError,
  setIsError,
  isFormVisible,
  setIsFormVisible,
  setComments,
}) => {
  const [isDeleteButtonLoading, setIsDeleteButtonLoading] = useState(false);

  const handleCommentDeleteButton = (commentId: number) => {
    setIsDeleteButtonLoading(true);

    client
      .delete(`/comments/${commentId}`)
      .catch(() => setIsError(true))
      .finally(() => {
        setIsDeleteButtonLoading(false);
      });

    setComments(comments.filter(comment => comment.id !== commentId));
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${selectedPost.id}: ${selectedPost.title}`}</h2>

          <p data-cy="PostBody">{selectedPost.body}</p>
        </div>

        <div className="block">
          {(isSideBarLoading || isDeleteButtonLoading) && <Loader />}

          {isError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!isSideBarLoading &&
            !isError &&
            (comments.length === 0 ? (
              <p className="title is-4" data-cy="NoCommentsMessage">
                No comments yet
              </p>
            ) : (
              <>
                <p className="title is-4">Comments:</p>

                {comments.map(comment => (
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
                        onClick={() => handleCommentDeleteButton(comment.id)}
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
            ))}

          {!isSideBarLoading && !isError && !isFormVisible && (
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
            selectedPost={selectedPost}
            comments={comments}
            setComments={setComments}
            setIsError={setIsError}
          />
        )}
      </div>
    </div>
  );
};
