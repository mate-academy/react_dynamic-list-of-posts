import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { client } from '../utils/fetchClient';
import { Comment } from '../types/Comment';

type Props = {
  postId: number;
  postTitle: string;
  postBody: string;
};

export const PostDetails: React.FC<Props> = ({
  postId,
  postTitle,
  postBody,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isCommentsLoading, setIsCommentsLoading] = useState<boolean>(false);
  const [commentsError, setCommentsError] = useState<boolean>(false);
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);

  useEffect(() => {
    setIsCommentsLoading(true);

    if (commentsError) {
      setCommentsError(false);
    }

    if (comments.length) {
      setComments([]);
    }

    if (isFormVisible) {
      setIsFormVisible(false);
    }

    client
      .get<Comment[]>(`/comments?postId=${postId}`)
      .then(setComments)
      .catch(() => setCommentsError(true))
      .finally(() => setIsCommentsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId]);

  const handleDeleteComment = (commId: number): void => {
    setComments(comments.filter(comm => comm.id !== commId));
    client.delete(`/comments/${commId}`).catch(() => {});
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${postId}: ${postTitle}`}</h2>

          <p data-cy="PostBody">{postBody}</p>
        </div>

        <div className="block">
          {isCommentsLoading && <Loader />}

          {commentsError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!comments.length && !commentsError && !isCommentsLoading && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {!!comments.length && !commentsError && !isCommentsLoading && (
            <>
              <p className="title is-4">Comments:</p>

              {comments.map(comment => {
                const { id: commId, name, email, body: commentBody } = comment;

                return (
                  <article
                    key={commId}
                    className="message is-small"
                    data-cy="Comment"
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
                        onClick={() => handleDeleteComment(commId)}
                      >
                        delete button
                      </button>
                    </div>

                    <div className="message-body" data-cy="CommentBody">
                      {commentBody}
                    </div>
                  </article>
                );
              })}
            </>
          )}

          {!commentsError && !isCommentsLoading && !isFormVisible && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsFormVisible(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {isFormVisible && !commentsError && (
          <NewCommentForm
            comments={comments}
            updateComments={setComments}
            postId={postId}
            addCommentsError={setCommentsError}
          />
        )}
      </div>
    </div>
  );
};
