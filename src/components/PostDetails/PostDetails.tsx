import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { NewCommentForm } from '../NewCommentForm';
import { Post } from '../../types/Post';
import { deleteComment, getPostComments } from '../../api/posts';
import cm from '../../types/Comment';

type Props = {
  post: Post | null;
  selectedPostId: number;
};

export const PostDetails: React.FC<Props> = ({
  post,
  selectedPostId,
}) => {
  const [comments, setComments] = useState<cm[]>([]);
  const [commentsLoadingError, setCommentsLoadingError] = useState(false);
  const [isCommentsLoading, setIsCommentsLoading] = useState(false);
  const [isComment, setIsComment] = useState(false);
  const [commentsLoaded, setCommentLoaded] = useState(false);
  const [isDeletionError, setIsDeletionError] = useState(false);
  const getCommentsFromServer = async () => {
    setComments([]);
    try {
      if (post) {
        setCommentLoaded(false);
        setIsCommentsLoading(true);

        const commentsFromServer = await getPostComments(post.id);

        setComments(commentsFromServer);
        setIsCommentsLoading(false);
        setCommentLoaded(true);
      }
    } catch {
      setCommentsLoadingError(true);
    }
  };

  useEffect(() => {
    getCommentsFromServer();
  }, [post]);

  useEffect(() => {
    if (isComment) {
      setIsComment(false);
    }
  }, [selectedPostId]);

  const handleDeleteComment = async (commentId: number) => {
    setComments(prevComments => prevComments
      .filter(comment => comment.id !== commentId));
    try {
      await deleteComment(commentId);
    } catch {
      setIsDeletionError(true);
    }
  };

  const handleAddCommentToState = (comment: cm) => {
    setComments(prevComments => [...prevComments, comment]);
  };

  return (
    <div className="content" data-cy="PostDetails">
      {post && (
        <div className="content" data-cy="PostDetails">
          <div className="block">
            <h2 data-cy="PostTitle">
              {post.title}
            </h2>

            <p data-cy="PostBody">
              {post.body}
            </p>
          </div>

          <div className="block">
            {isCommentsLoading && <Loader />}

            {commentsLoadingError && (
              <div className="notification is-danger" data-cy="CommentsError">
                Something went wrong
              </div>
            )}

            {commentsLoaded && (
              !comments.length
                ? (
                  <p className="title is-4" data-cy="NoCommentsMessage">
                    No comments yet
                  </p>
                )
                : (
                  <>
                    <p className="title is-4">Comments:</p>

                    {comments.map(comment => (
                      <article
                        key={comment.id}
                        className="message is-small"
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
                            onClick={() => {
                              handleDeleteComment(comment.id);
                            }}
                          >
                            delete button
                          </button>
                        </div>

                        <div className="message-body" data-cy="CommentBody">
                          {comment.body}
                        </div>
                        {isDeletionError && (
                          <div className="notification is-danger">
                            <button
                              type="button"
                              aria-label="delete-comment-button"
                              className="delete"
                              onClick={() => {
                                setIsDeletionError(false);
                              }}
                            />
                            Can`t delete comment
                          </div>
                        )}
                      </article>
                    ))}
                  </>
                ))}

            {!isComment && (
              <button
                data-cy="WriteCommentButton"
                type="button"
                className="button is-link"
                onClick={() => {
                  setIsComment(prevState => !prevState);
                }}
              >
                Write a comment
              </button>
            )}
          </div>

          {isComment
            && (
              <NewCommentForm
                selectedPostId={selectedPostId}
                handleAddCommentToState={handleAddCommentToState}
              />
            )}
        </div>
      )}
    </div>
  );
};
