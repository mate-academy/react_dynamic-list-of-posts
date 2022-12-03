import React, { useState } from 'react';
import { getPostComments, deleteComment } from '../api/comments';
import { Comment } from '../types/Comment';
import { Errors } from '../types/Errors';
import { Post } from '../types/Post';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

type Props = {
  selectedPost: Post | undefined,
};

export const PostDetails: React.FC<Props> = ({ selectedPost }) => {
  const [comments, setComments] = React.useState<Comment[]>();
  const [error, setError] = useState(Errors.None);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isAdding, setIsAdding] = React.useState(false);

  React.useEffect(() => {
    setComments(undefined);
    setIsAdding(false);

    if (selectedPost) {
      setIsLoading(true);
      getPostComments(selectedPost.id)
        .then(result => setComments(result))
        .catch(() => setError(Errors.Common))
        .finally(() => setIsLoading(false));
    }
  }, [selectedPost]);

  const removeComment = (comment: Comment) => {
    const prevComments = comments;

    setComments((prevState) => {
      return prevState?.filter(item => item.id !== comment.id);
    });

    deleteComment(comment.id)
      .catch(() => {
        setError(Errors.DeleteComment);
        setComments(prevComments);
      });
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${selectedPost?.id}: ${selectedPost?.title}`}
          </h2>

          <p data-cy="PostBody">
            {selectedPost?.body}
          </p>
        </div>

        <div className="block">
          {isLoading && <Loader />}

          {error !== Errors.None && (
            <div className="notification is-danger" data-cy="CommentsError">
              {error}
            </div>
          )}

          {comments
            && (comments.length === 0
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
                      className="message is-small"
                      data-cy="Comment"
                      key={comment.id}
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
                          onClick={() => removeComment(comment)}
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
              ))}

          {(!isAdding && !isLoading && error === Errors.None) && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsAdding(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {isAdding && (
          <NewCommentForm
            selectedPost={selectedPost}
            comments={comments}
            setComments={setComments}
            setError={setError}
          />
        )}
      </div>
    </div>
  );
};
