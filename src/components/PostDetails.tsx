import React, { Dispatch, SetStateAction, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { deleteComments } from '../api/comments';

type Props = {
  selectedUserPost: Post;
  comments: Comment[] | null;
  setComments: Dispatch<SetStateAction<Comment[]>>;
  isLoadingComments: boolean;
  error: string;
  setError: (error: string) => void;
  isVisibleNewCommentForm: boolean;
  setIsVisibleNewCommentForm: (isVisibleNewCommentForm: boolean) => void;
};

export const PostDetails: React.FC<Props> = ({
  selectedUserPost,
  comments,
  setComments,
  isLoadingComments,
  error,
  setError,
  isVisibleNewCommentForm,
  setIsVisibleNewCommentForm,
}) => {
  const [errorPostDetails, setErrorPostDetails] = useState(false);

  const handleDeleteComment = (commentId: number) => {
    deleteComments(commentId)
      .then(() => {
        setComments((currentComments: Comment[]) =>
          currentComments.filter(
            currentComment => currentComment.id !== commentId,
          ),
        );
      })
      .catch(() => {
        setErrorPostDetails(true);
        setError('Unable to delete a comment');
      })
      .finally(() => setErrorPostDetails(false));
  };

  const handleToVisibleForm = () => {
    setIsVisibleNewCommentForm(true);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${selectedUserPost.id}: ${selectedUserPost.title}`}</h2>
          <p data-cy="PostBody">{selectedUserPost.body}</p>
        </div>

        <div className="block">
          {selectedUserPost && isLoadingComments && <Loader />}
          {error && !isLoadingComments && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!comments?.length && !error && !isLoadingComments && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {!!comments?.length && !errorPostDetails && !isLoadingComments && (
            <>
              <p className="title is-4">Comments:</p>
              {comments.map(comment => {
                const { id, name, email, body } = comment;

                return (
                  <article
                    className="message is-small"
                    data-cy="Comment"
                    key={id}
                  >
                    <div className="message-header">
                      <a href={`mailto:${email}`} data-cy="CommentAuthor">
                        {name}
                      </a>
                      <button
                        data-cy="CommentDelete"
                        type="button"
                        className="delete is-small"
                        aria-label="delete"
                        onClick={() => {
                          handleDeleteComment(id);
                        }}
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
          {!isVisibleNewCommentForm && !isLoadingComments && !error && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={handleToVisibleForm}
            >
              Write a comment
            </button>
          )}
        </div>

        {isVisibleNewCommentForm && (
          <NewCommentForm
            selectedUserPost={selectedUserPost}
            setComments={setComments}
            setError={setError}
          />
        )}
      </div>
    </div>
  );
};
