import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { PostComment } from '../types/PostComment';
import { ErrorMessage } from '../types/ErrorMessage';

interface Props {
  post: Post;
  comments: PostComment[];
  isLoading: boolean;
  addNewComment: (comment: Omit<PostComment, 'id'>) => Promise<void>;
  deleteComment: (commentId: number) => void;
  errorMessage: ErrorMessage;
}

export const PostDetails: React.FC<Props> = ({
  post,
  comments,
  isLoading,
  addNewComment,
  deleteComment,
  errorMessage,
}) => {
  const [isFormShown, setIsFormShown] = useState(false);

  useEffect(() => {
    setIsFormShown(false);
  }, [post]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">
          #{post.id}: {post.title}
        </h2>

        <p data-cy="PostBody">{post.body}</p>
      </div>

      <div className="block">
        {isLoading && <Loader />}

        {!isLoading && errorMessage && (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        )}

        {!isLoading && !errorMessage && comments.length > 0 && (
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
                    onClick={() => deleteComment(comment.id)}
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

        {!isLoading && !errorMessage && comments.length === 0 && (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        )}

        {!isFormShown && !isLoading && !errorMessage && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setIsFormShown(true)}
          >
            Write a comment
          </button>
        )}
      </div>

      {isFormShown && !isLoading && !errorMessage && (
        <NewCommentForm postId={post.id} addNewComment={addNewComment} />
      )}
    </div>
  );
};
