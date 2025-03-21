import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { deleteComment, getComments } from '../api/posts';
import { Comment } from '../types/Comment';

type Props = {
  selectedPost: Post;
};

export const PostDetails: React.FC<Props> = ({ selectedPost }) => {
  const [loader, setLoader] = useState(false);
  const [commentsLoadingError, setCommentsLoadingError] = useState(false);
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [emptyComments, setEmptyComments] = useState(false);
  const [newCommentRequest, setNewCommentRequest] = useState<boolean | null>(
    null,
  );

  useEffect(() => {
    setComments(null);
    setNewCommentRequest(false);
    setLoader(true);

    getComments(selectedPost.id)
      .then(res => {
        setComments(res);
      })
      .catch(() => setCommentsLoadingError(true))
      .finally(() => {
        setLoader(false);
      });
  }, [selectedPost.id]);

  useEffect(() => {
    if (comments?.length) {
      setEmptyComments(false);

      return;
    }

    setEmptyComments(true);
  }, [comments]);

  function handleCommentDelete(data: Comment) {
    setComments(prevComments =>
      prevComments?.filter(comment => comment.id !== data.id),
    );

    deleteComment(data);
  }

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
          {loader && <Loader />}

          {!loader && (
            <>
              {commentsLoadingError && (
                <div className="notification is-danger" data-cy="CommentsError">
                  Something went wrong
                </div>
              )}

              {!commentsLoadingError && emptyComments ? (
                <p className="title is-4" data-cy="NoCommentsMessage">
                  No comments yet
                </p>
              ) : (
                <p className="title is-4">Comments:</p>
              )}

              {comments?.map(comment => (
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
                      onClick={() => handleCommentDelete(comment)}
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
        </div>

        {!loader && (
          <>
            {newCommentRequest && (
              <NewCommentForm
                comments={comments}
                post={selectedPost}
                setComments={setComments}
              />
            )}

            {!newCommentRequest && !commentsLoadingError && (
              <button
                data-cy="WriteCommentButton"
                type="button"
                className="button is-link"
                onClick={() => setNewCommentRequest(true)}
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
