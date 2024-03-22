import React, { useCallback, useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { createComment, getPostComments, deleteComment } from '../api/users';
import { Comment } from '../types/Comment';

type Props = {
  selectedPost: Post | null;
  isAddFormShown: boolean;
  setIsAddFormShown: (item: boolean) => void;
};

export const PostDetails: React.FC<Props> = ({
  selectedPost,
  isAddFormShown,
  setIsAddFormShown,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentsError, setCommentsError] = useState(false);
  const [loadingComments, setLoadingComments] = useState(false);

  useEffect(() => {
    if (selectedPost) {
      setLoadingComments(true);
      getPostComments(selectedPost.id)
        .then(setComments)
        .catch(error => {
          setCommentsError(true);
          throw error;
        })
        .finally(() => setLoadingComments(false));
    }
  }, [selectedPost]);

  const addComment = useCallback(
    ({ postId, name, email, body }: Omit<Comment, 'id'>) => {
      return createComment({ postId, name, email, body }).then(newComment => {
        setComments(currentComments => [...currentComments, newComment]);
      });
    },
    [],
  );

  const deleteCurrentComment = useCallback((commentId: number) => {
    return deleteComment(commentId).then(() =>
      setComments(currentComments =>
        currentComments.filter(comm => comm.id !== commentId),
      ),
    );
  }, []);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            #{selectedPost?.id}: {selectedPost?.title}
          </h2>

          <p data-cy="PostBody">{selectedPost?.body}</p>
        </div>

        <div className="block">
          {loadingComments && <Loader />}

          {commentsError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!commentsError && !comments.length && !loadingComments && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {!commentsError && comments.length > 0 && !loadingComments && (
            <p className="title is-4">Comments:</p>
          )}
          {!commentsError &&
            !loadingComments &&
            comments.map(comment => (
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
                    onClick={() => deleteCurrentComment(comment.id)}
                  >
                    delete button
                  </button>
                </div>
                <div className="message-body" data-cy="CommentBody">
                  {comment.body}
                </div>
              </article>
            ))}

          {!isAddFormShown && !commentsError && !loadingComments && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsAddFormShown(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {isAddFormShown && (
          <NewCommentForm addComment={addComment} selectedPost={selectedPost} />
        )}
      </div>
    </div>
  );
};
