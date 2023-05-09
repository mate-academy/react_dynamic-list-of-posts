import React, { useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';
import { deleteComment } from '../api/posts';

interface Props {
  postComments: Comment[],
  error: string
  showCommentsLoader: boolean
  post: Post | undefined,
  getPostInfo: () => void
  setPostComments: React.Dispatch<React.SetStateAction<Comment[]>>,
  setError: React.Dispatch<React.SetStateAction<string>>
}

export const PostDetails: React.FC<Props> = ({
  postComments,
  error,
  showCommentsLoader,
  post,
  getPostInfo,
  setPostComments,
  setError,
}) => {
  const [formIsOpen, setFormIsOpen] = useState(false);

  const onRemove = (commentId: number) => {
    const index = postComments.map(comment => comment.id)
      .indexOf(commentId);

    setPostComments(postComments.slice(0, index)
      .concat(postComments.slice(index + 1)));

    deleteComment(commentId)
      .catch(() => {
        setError('Cannot delete comment');
      });
  };

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

        <div className="block">
          {showCommentsLoader ? (
            <Loader />
          ) : (
            <>
              {error ? (
                <div className="notification is-danger" data-cy="CommentsError">
                  {error}
                </div>
              ) : (
                <>
                  {!postComments.length ? (
                    <p className="title is-4" data-cy="NoCommentsMessage">
                      No comments yet
                    </p>
                  ) : (
                    <>
                      <p className="title is-4">Comments:</p>

                      <>
                        {postComments.map(comment => (
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
                                onClick={() => onRemove(comment.id)}
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
                    </>
                  )}
                </>
              )}
            </>
          )}

          {!formIsOpen ? (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setFormIsOpen(true)}
            >
              Write a comment
            </button>
          ) : null}
        </div>

        {formIsOpen ? (
          <NewCommentForm
            postId={post?.id}
            getPostInfo={getPostInfo}
          />
        ) : null}
      </div>
    </div>
  );
};
