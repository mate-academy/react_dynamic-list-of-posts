import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { delateComment, getComments, sendComment } from '../api/comment';
import { Comment } from '../types/Comment';

type Props = {
  currentPost: Post;
};

export const PostDetails: React.FC<Props> = ({ currentPost }) => {
  const [isCommentsLoader, setIsCommentsLoader] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [hasNewCommentForm, setHasNewCommentForm] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    if (!currentPost) {
      return;
    }

    setIsCommentsLoader(true);
    setHasNewCommentForm(false);

    getComments(currentPost.id)
      .then(commentsFromServer => {
        setComments(commentsFromServer);
      })
      .catch(() => setHasError(true))
      .finally(() => setIsCommentsLoader(false));
  }, [currentPost]);

  const removeCommentFromServer = (
    commentId: number,
    index: number,
    forDelete: Comment,
  ) => {
    delateComment(commentId).catch(() =>
      setComments(prevComments => {
        const workComments = [...prevComments];

        workComments.splice(index, 1, forDelete);

        return workComments;
      }),
    );
  };

  const handleDelete = (commentId: number) => {
    const index = comments.findIndex(c => c.id === commentId);
    const forDelete = { ...comments[index] };

    setComments(prevComments => {
      const workComments = [...prevComments];

      workComments.splice(index, 1);

      return workComments;
    });

    if (commentId === 0) {
      return;
    }

    removeCommentFromServer(commentId, index, forDelete);
  };

  const addCommentOnServer = (newComment: Comment) => {
    setComments(prevComments => [...prevComments, newComment]);

    return sendComment(newComment)
      .then(newFromServerComment => {
        setComments(prevComments => {
          const index = prevComments.findIndex(c => c.id === newComment.id);

          if (index === -1) {
            delateComment(newFromServerComment.id);

            return prevComments;
          }

          const workComments = [...prevComments];

          workComments.splice(index, 1, newFromServerComment);

          return workComments;
        });
      })
      .catch(() => {
        setComments(prevComments => {
          const index = prevComments.findIndex(c => c.id === 0);

          const workComments = [...prevComments];

          workComments.splice(index, 1);

          return workComments;
        });

        throw new Error();
      });
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${currentPost?.id}: ${currentPost?.title}`}
          </h2>

          <p data-cy="PostBody">{currentPost?.body}</p>
        </div>

        <div className="block">
          {isCommentsLoader && <Loader />}

          {hasError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!hasError && !isCommentsLoader && comments?.length === 0 && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {!hasError && comments?.length > 0 && (
            <>
              <p className="title is-4">Comments:</p>

              {comments.map(comment => (
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
                      onClick={() => handleDelete(comment.id)}
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

          {!hasNewCommentForm && !isCommentsLoader && !hasError && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setHasNewCommentForm(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {hasNewCommentForm && (
          <NewCommentForm
            postId={currentPost?.id}
            addCommentOnServer={addCommentOnServer}
          />
        )}
      </div>
    </div>
  );
};
