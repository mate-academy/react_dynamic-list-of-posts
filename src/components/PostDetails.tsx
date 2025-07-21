import { useEffect, useState } from 'react';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { deleteComment } from '../api/api';

type Props = {
  selectedPost: Post;
  errorMessage?: string;
  postComments: Comment[] | null;
  isCommentsLoading: boolean;
  onAddComment: (comment: Comment) => void;
  removeCommentById: (commentId: number) => void;
};

export const PostDetails: React.FC<Props> = ({
  selectedPost,
  errorMessage,
  postComments,
  isCommentsLoading,
  onAddComment,
  removeCommentById,
}) => {
  const [showAddCommentForm, setShowAddCommentForm] = useState(false);

  useEffect(() => {
    setShowAddCommentForm(false);
  }, [selectedPost]);

  const handleDeleteComment = async (commentId: number) => {
    removeCommentById(commentId);
    await deleteComment(commentId);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{selectedPost.title}</h2>

          <p data-cy="PostBody">{selectedPost.body}</p>
        </div>

        <div className="block">
          {isCommentsLoading && <Loader />}

          {errorMessage && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!isCommentsLoading && postComments && postComments.length === 0 ? (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          ) : (
            <>
              {!isCommentsLoading && <p className="title is-4">Comments:</p>}

              {postComments?.map(comment => (
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
              ))}
            </>
          )}

          {!showAddCommentForm && !isCommentsLoading && !errorMessage && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setShowAddCommentForm(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {showAddCommentForm && !isCommentsLoading && !errorMessage && (
          <NewCommentForm
            onAddComment={onAddComment}
            postId={selectedPost.id}
          />
        )}
      </div>
    </div>
  );
};
