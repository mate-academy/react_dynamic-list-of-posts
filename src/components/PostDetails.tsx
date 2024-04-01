import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { client } from '../utils/fetchClient';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

type Props = {
  selectedPost: Post | null;
};

export const PostDetails: React.FC<Props> = ({ selectedPost }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isCommentsLoading, setIsCommentsLoading] = useState<boolean>(false);
  const [commentsError, setCommentsError] = useState<boolean>(false);
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);

  const { id: postId, title, body } = selectedPost || {};

  useEffect(() => {
    if (selectedPost) {
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
        .get<Comment[]>(`/comments?postId=${selectedPost.id}`)
        .then(setComments)
        .catch(() => setCommentsError(true))
        .finally(() => setIsCommentsLoading(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPost]);

  const handleDeleteComment = (id: number): void => {
    setComments(comments.filter(comm => comm.id !== id));
    client.delete(`/comments/${id}`).catch(() => {});
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{title}</h2>

          <p data-cy="PostBody">{body}</p>
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
                const { id, name, email, body: commentBody } = comment;

                return (
                  <article
                    key={id}
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
                        onClick={() => handleDeleteComment(id)}
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
            postId={postId as number}
            addCommentsError={setCommentsError}
          />
        )}
      </div>
    </div>
  );
};
