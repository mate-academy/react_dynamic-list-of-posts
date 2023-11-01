import React, { useState, useEffect, useMemo } from 'react';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { deleteComment, getPostComments } from '../api/comments';

interface Props {
  post: Post;
  isFormActive: boolean;
  setIsFormActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PostDetails: React.FC<Props> = ({
  post,
  isFormActive,
  setIsFormActive = () => {},
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loadCommentsError, setLoadCommentsError] = useState(false);
  const [isLoaderActive, setIsLoaderActive] = useState(false);

  const isDangerErrorShow = useMemo(() => {
    return !isLoaderActive && loadCommentsError;
  }, [isLoaderActive, loadCommentsError]);

  const isWarningErrorShow = useMemo(() => {
    return !isLoaderActive && !comments.length;
  }, [isLoaderActive, comments]);

  const isPostListShow = useMemo(() => {
    return !isLoaderActive && comments.length > 0;
  }, [isLoaderActive, comments]);

  const isBtnShow = useMemo(() => {
    return !isLoaderActive && !isFormActive;
  }, [isLoaderActive, isFormActive]);

  useEffect(() => {
    setIsLoaderActive(true);
    setLoadCommentsError(false);
    setIsFormActive(false);

    getPostComments(post.id)
      .then(setComments)
      .catch(() => setLoadCommentsError(true))
      .finally(() => setIsLoaderActive(false));
  }, [post, setIsFormActive]);

  const removeComment = (commentId: number) => {
    deleteComment(commentId)
      .then(() => {
        setComments((prevState) => {
          return prevState.filter(({ id }) => id !== commentId);
        });
      })
      .catch()
      .finally();
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>

          <p data-cy="PostBody">{post.body}</p>
        </div>

        <div className="block">
          {isLoaderActive && <Loader />}

          {isDangerErrorShow && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {isWarningErrorShow && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {isPostListShow && (
            <>
              <p className="title is-4">Comments:</p>

              {comments.map((comment) => (
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
                      onClick={() => removeComment(comment.id)}
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

          {isBtnShow && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsFormActive(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {isFormActive && (
          <NewCommentForm postId={post.id} setComments={setComments} />
        )}
      </div>
    </div>
  );
};
