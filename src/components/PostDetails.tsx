import React, { useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

type Props = {
  selectedPost: Post,
  comments: Comment[],
  loadingComments: boolean,
  loadingCommentsError: boolean,
  handleResponse: (response: Comment) => void,
  handleDelete: (id: number) => void,
  deletingCommentError: boolean,
};

export const PostDetails: React.FC<Props> = (
  {
    selectedPost,
    comments,
    loadingComments,
    loadingCommentsError,
    handleResponse,
    handleDelete,
    deletingCommentError,
  },
) => {
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);

  const handleFormVisibility = () => {
    setIsFormVisible(false);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${selectedPost.id}: ${selectedPost.title}`}
          </h2>

          <p data-cy="PostBody">
            {selectedPost.body}
          </p>
        </div>

        <div className="block">
          {loadingComments && <Loader />}

          {loadingCommentsError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {comments.length === 0 && !loadingComments && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {comments.length > 0 && !loadingComments
          && (
            <>
              <p className="title is-4">Comments:</p>
              {comments.map(comment => (
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
                      onClick={() => handleDelete(comment.id)}
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

          {deletingCommentError && (
            <p className="help is-danger" data-cy="ErrorMessage">
              Unable to add comment, try again.
            </p>
          )}

          {!isFormVisible && (
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
            handleFormVisibility={handleFormVisibility}
            handleResponse={handleResponse}
          />
        )}
      </div>
    </div>
  );
};
