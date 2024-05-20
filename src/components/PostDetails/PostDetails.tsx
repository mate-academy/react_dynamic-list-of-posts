import React, { useContext } from 'react';
import { Loader } from '../Loader';
import { NewCommentForm } from '../NewCommentForm/NewCommentForm';
import {
  PostsSettersContext,
  PostsValueContext,
} from '../../Context/PostsContext';
import { Comment } from '../../types/Comment';

export const PostDetails: React.FC = () => {
  const {
    commentsIsLoading,
    commentsError,
    postComments,
    selectedPost,
    isCommentFormOpen,
  } = useContext(PostsValueContext);

  const { handleDeleteComment, setIsCommentFormOpen } =
    useContext(PostsSettersContext);

  const showNoCommentsMessage = !commentsIsLoading && !postComments.length;

  const handleOpenCommentForm = () => {
    setIsCommentFormOpen(true);
  };

  const showWriteCommentButton =
    !commentsError && selectedPost && !commentsIsLoading;

  return (
    selectedPost && (
      <div className="content" data-cy="PostDetails">
        <div className="content" data-cy="PostDetails">
          <div className="block">
            {selectedPost && (
              <>
                <h2 data-cy="PostTitle">{`#${selectedPost.id}: ${selectedPost.title}`}</h2>

                <p data-cy="PostBody">{selectedPost.body}</p>
              </>
            )}
          </div>

          <div className="block">
            {commentsIsLoading && <Loader />}
            {commentsError && (
              <div className="notification is-danger" data-cy="CommentsError">
                Something went wrong
              </div>
            )}
            {showNoCommentsMessage && !commentsError && (
              <p className="title is-4" data-cy="NoCommentsMessage">
                No comments yet
              </p>
            )}

            {!showNoCommentsMessage && <p className="title is-4">Comments:</p>}

            {postComments.map((comment: Comment) => {
              return (
                <article
                  className="message is-small"
                  data-cy="Comment"
                  key={comment.id}
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
                      onClick={() => handleDeleteComment(comment.id)}
                    >
                      delete button
                    </button>
                  </div>

                  <div className="message-body" data-cy="CommentBody">
                    {comment.body}
                  </div>
                </article>
              );
            })}
            {showWriteCommentButton && !isCommentFormOpen && (
              <button
                data-cy="WriteCommentButton"
                type="button"
                className="button is-link"
                onClick={handleOpenCommentForm}
              >
                Write a comment
              </button>
            )}
          </div>

          {isCommentFormOpen && <NewCommentForm />}
        </div>
      </div>
    )
  );
};
