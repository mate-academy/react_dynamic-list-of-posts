import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { deleteComment, getComments } from '../api/comments';

type Props = {
  selectedPost: Post;
};

export const PostDetails: React.FC<Props> = ({ selectedPost }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [error, setError] = useState(false);
  const [isNewCommentError, setIsNewCommentError] = useState(false);
  const [isOpenNewComment, setIsOpenNewComment] = useState(false);

  const noErrors = !isNewCommentError && !error;

  useEffect(() => {
    setIsLoading(true);
    setIsNewCommentError(false);
    setIsOpenNewComment(false);

    if (selectedPost) {
      getComments(selectedPost.id)
        .then(setComments)
        .catch(() => {
          setError(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [selectedPost]);

  const handleDeleteComment = (commentId: number) => {
    setComments(prevComments => prevComments.filter(c => c.id !== commentId));

    deleteComment(commentId).catch(() => setComments(comments));
  };

  const handleNewComment = () => {
    setIsOpenNewComment(true);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${selectedPost.id}: ${selectedPost.title}`}</h2>

          <p data-cy="PostBody">{selectedPost.body}</p>
        </div>

        <div className="block">
          {isLoading && <Loader />}

          {!noErrors && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong!
            </div>
          )}

          {!comments.length && noErrors && !isLoading && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {!!comments.length && noErrors && !isLoading && (
            <>
              <p className="title is-4">Comments:</p>

              {comments.map(comment => (
                <article
                  key={comment.id}
                  className="message is-small"
                  data-cy="Comment"
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
                      onClick={() => handleDeleteComment(comment.id)}
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

          {!isOpenNewComment && noErrors && !isLoading && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={handleNewComment}
            >
              Write a comment
            </button>
          )}
        </div>

        {isOpenNewComment && (
          <NewCommentForm
            postId={selectedPost.id}
            setComments={setComments}
            setIsNewCommentError={setIsNewCommentError}
          />
        )}
      </div>
    </div>
  );
};
