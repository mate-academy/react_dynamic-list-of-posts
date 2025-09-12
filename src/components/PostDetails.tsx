import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment, CommentData } from '../types/Comment';

type PostDetailsProps = {
  selectedPost: Post;
  isLoadingComments: boolean;
  commentsErrorMessage: string;
  comments: Comment[];
  onCommentDelete: (commentId: number) => void;
  onCommentAdd: (commentData: CommentData) => Promise<void>;
  isAddingComment: boolean;
};

export const PostDetails: React.FC<PostDetailsProps> = ({
  selectedPost,
  isLoadingComments,
  commentsErrorMessage,
  comments,
  onCommentDelete,
  onCommentAdd,
  isAddingComment,
}) => {
  const [displayNewCommentForm, setDisplayNewCommentForm] = useState(false);

  function handleNewCommentFormToggle() {
    setDisplayNewCommentForm(!displayNewCommentForm);
  }

  useEffect(() => {
    setDisplayNewCommentForm(false);
  }, [selectedPost.id]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${selectedPost.id}: ${selectedPost.title}`}</h2>

        <p data-cy="PostBody">{selectedPost?.body}</p>
      </div>

      <div className="block">
        {isLoadingComments ? (
          <Loader />
        ) : commentsErrorMessage ? (
          <div className="notification is-danger" data-cy="CommentsError">
            {commentsErrorMessage}
          </div>
        ) : (
          // This fragment now correctly wraps all non-loading/non-error content
          <>
            {comments.length === 0 ? (
              <p className="title is-4" data-cy="NoCommentsMessage">
                No comments yet
              </p>
            ) : (
              <>
                <p className="title is-4">Comments:</p>

                {comments.map(comment => (
                  <article
                    className="message is-small"
                    key={comment.id}
                    data-cy="Comment"
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
                        onClick={() => onCommentDelete(comment.id)}
                      />
                    </div>

                    <div className="message-body" data-cy="CommentBody">
                      {comment.body}
                    </div>
                  </article>
                ))}
              </>
            )}

            {/* This block is now outside the comments.length check and will render */}
            {displayNewCommentForm ? (
              <NewCommentForm
                onCommentAdd={onCommentAdd}
                isAddingComment={isAddingComment}
              />
            ) : (
              <button
                data-cy="WriteCommentButton"
                type="button"
                className="button is-link"
                onClick={handleNewCommentFormToggle}
              >
                Write a comment
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};
