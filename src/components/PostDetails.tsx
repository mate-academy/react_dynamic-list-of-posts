import React, { useState, useCallback, useEffect } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Comment } from '../types/Comment';

import { getComments, deleteComment } from '../api/comments';
import { Post } from '../types/Post';

type Props = {
  selectedUserPost: Post,
  selectedUserPostId: number,
  isLoadingComments: boolean,
  setIsLoadingComments: (load: boolean) => void,
  writeComment: boolean,
  setWriteComment: (load: boolean) => void,
};

export const PostDetails: React.FC<Props> = ({
  selectedUserPost,
  selectedUserPostId,
  isLoadingComments,
  setIsLoadingComments,
  writeComment,
  setWriteComment,

}) => {
  const [userComments, setUserComments] = useState<Comment[] | []>([]);
  const [isLoadingComment, setIsLoadingComment] = useState(false);
  const [failedToFetchComments, setFailedToFetchComments] = useState(false);

  const loadUserCommentsFromServer = useCallback(
    async () => {
      try {
        setFailedToFetchComments(false);
        setIsLoadingComment(false);
        const commentsFromServer = await getComments(selectedUserPostId);

        setUserComments(commentsFromServer);
      } catch (error) {
        setFailedToFetchComments(true);
      } finally {
        setIsLoadingComments(false);
      }
    }, [selectedUserPostId],
  );

  useEffect(() => {
    loadUserCommentsFromServer();
  }, [selectedUserPostId]);

  const deleteCommentOnServer = useCallback(
    async (commentId) => {
      try {
        setFailedToFetchComments(false);
        await deleteComment(commentId);
      } catch (error) {
        setFailedToFetchComments(true);
      } finally {
        loadUserCommentsFromServer();
      }
    }, [],
  );

  const handleDeleteComent = (commentId: number) => {
    deleteCommentOnServer(commentId);
  };

  return (
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
          {isLoadingComments
            ? <Loader />
            : (
              <>
                {failedToFetchComments && (
                  <div
                    className="notification is-danger"
                    data-cy="CommentsError"
                  >
                    Something went wrong
                  </div>
                )}
                {userComments.length === 0
                  && !failedToFetchComments
                  && (
                    <p className="title is-4" data-cy="NoCommentsMessage">
                      No comments yet
                    </p>
                  )}

                {userComments.length > 0 && !failedToFetchComments && (
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
                            onClick={() => handleDeleteComent(comment.id)}
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
              </>
            )}

          {!writeComment && !isLoadingComments && !failedToFetchComments && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setWriteComment(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {writeComment && !failedToFetchComments && (
          <NewCommentForm
            selectedUserPostId={selectedUserPostId}
            setIsLoadingComment={setIsLoadingComment}
            isLoadingComment={isLoadingComment}
            loadUserCommentsFromServer={loadUserCommentsFromServer}
            setFailedToFetchComments={setFailedToFetchComments}
          />
        )}
      </div>
    </div>
  );
};
