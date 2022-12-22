import React, { useState, useCallback, useEffect } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Comment, CommentData } from '../types/Comment';

import { getComments, deleteComment, createComment } from '../api/comments';
import { Post } from '../types/Post';
import { ErrorType } from '../types/ErrorType';

type Props = {
  selectedUserPost: Post,
  selectedUserPostId: number,
  isLoadingComments: boolean,
  setIsLoadingComments: (load: boolean) => void,
  writeComment: boolean,
  setWriteComment: (load: boolean) => void,
  failedToFetch: ErrorType | null,
  setFailedToFetch: (loadData: ErrorType | null) => void,
};

export const PostDetails: React.FC<Props> = ({
  selectedUserPost,
  selectedUserPostId,
  isLoadingComments,
  setIsLoadingComments,
  writeComment,
  setWriteComment,
  failedToFetch,
  setFailedToFetch,
}) => {
  const [userComments, setUserComments] = useState<Comment[] | []>([]);
  const [isLoadingComment, setIsLoadingComment] = useState(false);

  const loadUserCommentsFromServer = useCallback(
    async () => {
      try {
        const commentsFromServer = await getComments(selectedUserPostId);

        setUserComments(commentsFromServer);
        setIsLoadingComments(false);
        setIsLoadingComment(false);
      } catch (error) {
        setFailedToFetch(ErrorType.postComments);
      }
    }, [selectedUserPostId, userComments],
  );

  useEffect(() => {
    loadUserCommentsFromServer();
  }, [selectedUserPostId]);

  const deleteCommentOnServer = useCallback(
    async (commentId) => {
      try {
        await deleteComment(commentId);
      } catch (error) {
        setFailedToFetch(ErrorType.commentDelete);
      } finally {
        setIsLoadingComment(false);
      }
    }, [userComments],
  );

  const loadCommentOnServer = async (comment: CommentData) => {
    setIsLoadingComment(true);
    try {
      await createComment({ ...comment });
    } catch (error) {
      setFailedToFetch(ErrorType.commentAdd);
    } finally {
      loadUserCommentsFromServer();
    }
  };

  const handleDeleteComent = (commentId: number) => {
    setUserComments(userComments.filter((comment) => comment.id !== commentId));
    deleteCommentOnServer(commentId);
  };

  const errorMessage = failedToFetch === ErrorType.postComments
   || failedToFetch === ErrorType.commentDelete
   || failedToFetch === ErrorType.commentAdd;

  const isLoadComments = !failedToFetch && !isLoadingComments;

  return (
    <>
      <div className="content" data-cy="PostDetails">
        <div className="content" data-cy="PostDetails">
          <div className="block">
            <h2 data-cy="PostTitle">
              {`#${selectedUserPost.id}: ${selectedUserPost.title}`}
            </h2>

            <p data-cy="PostBody">
              {selectedUserPost.body}
            </p>
          </div>

          <div className="block">
            {isLoadingComments && !failedToFetch && <Loader />}
            <>
              {errorMessage && (
                <div
                  className="notification is-danger"
                  data-cy="CommentsError"
                >
                  {failedToFetch}
                </div>
              )}

              {isLoadComments && userComments.length === 0 && (
                <p className="title is-4" data-cy="NoCommentsMessage">
                  No comments yet
                </p>
              )}

              {isLoadComments && userComments.length > 0 && (
                <>
                  <p className="title is-4">Comments:</p>
                  {userComments.map(comment => (
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
                          onClick={() => handleDeleteComent(comment.id || 0)}
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

              {isLoadComments && !writeComment && (
                <button
                  data-cy="WriteCommentButton"
                  type="button"
                  className="button is-link"
                  onClick={() => setWriteComment(true)}
                >
                  Write a comment
                </button>
              )}
            </>
          </div>

          {isLoadComments && writeComment && (
            <NewCommentForm
              selectedUserPostId={selectedUserPostId}
              isLoadingComment={isLoadingComment}
              loadCommentOnServer={loadCommentOnServer}
            />
          )}
        </div>
      </div>
    </>
  );
};
