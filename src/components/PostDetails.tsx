import React, { useEffect, useState } from 'react';
import { Comment } from '../types/Comment';
import { NewComment } from '../types/NewComment';
import { Post } from '../types/Post';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

interface Props {
  post: Post | undefined;
  comments: Comment[];
  isCommentsError: boolean;
  areCommentsLoading: boolean;
  addNewComment: (comment: NewComment, postId: number) => Promise<void>;
  removeCommentFromList: (commentId: number) => void;
}

export const PostDetails: React.FC<Props> = ({
  post,
  comments,
  isCommentsError,
  areCommentsLoading,
  addNewComment,
  removeCommentFromList,
}) => {
  const [isButtonHidden, setIsButtonHidden] = useState<boolean>(false);

  const buttonClickHandler = () => {
    setIsButtonHidden(true);
  };

  useEffect(() => setIsButtonHidden(false), [post]);

  if (!post) {
    return null;
  }

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${post.id}: ${post.title}`}
          </h2>

          <p data-cy="PostBody">
            {post.body}
          </p>
        </div>

        <div className="block">
          {areCommentsLoading && <Loader />}

          {(!areCommentsLoading && isCommentsError) && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {(!areCommentsLoading && !comments.length) && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {(!areCommentsLoading && comments.length > 0) && (
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
                      onClick={() => removeCommentFromList(comment.id)}
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

          {!isButtonHidden ? (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={buttonClickHandler}
            >
              Write a comment
            </button>
          )
            : (
              <NewCommentForm
                postId={post.id}
                addNewComment={addNewComment}
              />
            )}
        </div>

      </div>
    </div>
  );
};
