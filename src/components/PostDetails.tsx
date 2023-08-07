import React from 'react';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { deleteComment } from '../api/api';

type Props = {
  selectedPost: Post;
  isLoadingComments: boolean;
  error: boolean;
  setError: (v: boolean) => void;
  comments: Comment[];
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  activeForm: Post | null;
  setActiveForm: (v: Post | null) => void;
};

export const PostDetails: React.FC<Props> = ({
  isLoadingComments, error, setError, selectedPost, comments, setComments,
  activeForm, setActiveForm,
}) => {
  const handleDelete = (commentId: number) => {
    setComments(currentComments => currentComments.filter(
      currentComment => currentComment.id !== commentId,
    ));

    deleteComment(commentId)
      .catch(() => setError(true));
  };

  return (
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
        {isLoadingComments && (
          <Loader />
        )}
        {!isLoadingComments && error && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {!isLoadingComments && !error && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {!isLoadingComments && !error && comments.length !== 0 && (
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

        {!isLoadingComments && !error && activeForm !== selectedPost && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setActiveForm(selectedPost)}
          >
            Write a comment
          </button>
        )}
      </div>

      {!isLoadingComments && !error && activeForm === selectedPost && (
        <NewCommentForm
          selectedPost={selectedPost}
          setComments={setComments}
          setError={setError}
        />
      )}
    </div>
  );
};
