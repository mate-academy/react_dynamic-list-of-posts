import React, { useEffect, useState } from 'react';
import { Post } from '../types/Post';
import { Loader } from './Loader';
import { Comment } from '../types/Comment';
import { NewCommentForm } from './NewCommentForm';
import { Error, ErrorMessages } from '../types/Error';

type Props = {
  post: Post | undefined;
  comments: Comment[];
  isLoadingComments: boolean;
  addComment: (comment: {}) => void;
  deleteComment: (id: number) => void;
  error: Error;
};

export const PostDetails: React.FC<Props> = ({
  post, comments, isLoadingComments, addComment, deleteComment, error,
}) => {
  const [isClickedCommentButton, setisClickedCommentButton] = useState(false);

  const handleWriteCommentButton = () => {
    setisClickedCommentButton(true);
  };

  useEffect(() => {
    setisClickedCommentButton(false);
  }, [post]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${post?.id}: ${post?.title}`}
          </h2>

          <p data-cy="PostBody">
            {post?.body}
          </p>
        </div>

        {isLoadingComments ? (
          <Loader />
        ) : (
          <div className="block">
            {!!comments.length && (
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
                        onClick={() => {
                          deleteComment(comment.id);
                        }}
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

            {(error.message !== ErrorMessages.ErrorLoadComments)
            && !comments.length && (
              <p className="title is-4" data-cy="NoCommentsMessage">
                No comments yet
              </p>
            )}

            {(!isClickedCommentButton
            && (error.message !== ErrorMessages.ErrorLoadComments)) && (
              <button
                data-cy="WriteCommentButton"
                type="button"
                className="button is-link"
                onClick={handleWriteCommentButton}
              >
                Write a comment
              </button>
            )}

            {(error.message === ErrorMessages.ErrorLoadComments) && (
              <div
                data-cy="CommentsError"
                className={`notification is-danger ${!error.isError && 'hidden'}`}
              >
                {error.message}
                <br />
              </div>
            )}
          </div>
        )}

        {isClickedCommentButton
          && <NewCommentForm postId={post?.id} addComment={addComment} />}
      </div>
    </div>
  );
};
