import React, { useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment, CommentData } from '../types/Comment';

interface PostDetailsProps {
  post: Post;
  comments: Comment[];
  commentsError: boolean;
  areCommentsLoading: boolean;
  onCommentAdd: (comment: CommentData) => Promise<void>,
  onCommentDelete: (commentId: number) => void,
}

export const PostDetails: React.FC<PostDetailsProps> = ({
  post,
  comments,
  commentsError,
  areCommentsLoading,
  onCommentAdd,
  onCommentDelete,
}) => {
  const [isFormDisplayed, setIsFormDisplayed] = useState(false);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>

        <p data-cy="PostBody">{post.body}</p>
      </div>

      <div className="block">
        {areCommentsLoading ? (
          <Loader />
        ) : (
          <>
            {commentsError && (
              <div className="notification is-danger" data-cy="CommentsError">
                Something went wrong
              </div>
            )}

            {!comments.length ? (
              <p className="title is-4" data-cy="NoCommentsMessage">
                No comments yet
              </p>
            ) : (
              <>
                <p className="title is-4">Comments:</p>
                {comments.map((comment) => {
                  const {
                    name, email, body, id,
                  } = comment;

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
                          onClick={() => onCommentDelete(id)}
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
            {isFormDisplayed ? (
              <NewCommentForm
                onCommentAdd={onCommentAdd}
              />
            ) : (
              <button
                data-cy="WriteCommentButton"
                type="button"
                className="button is-link"
                onClick={() => setIsFormDisplayed(true)}
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
