import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { createComment, deleteComment, getPostComments } from './api/users';
import { Comment } from '../types/Comment';

type Props = {
  selectedPost: Post | null;
};

export const PostDetails: React.FC<Props> = ({ selectedPost }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorComments, setIsErrorComments] = useState(false);
  const [isShownForm, setIsShownForm] = useState(false);

  const isNoComments =
    selectedPost && comments.length === 0 && !isLoading && !isErrorComments;

  useEffect(() => {
    setIsErrorComments(false);
    setIsShownForm(false);
    if (selectedPost) {
      setIsLoading(true);
      getPostComments(selectedPost.id)
        .then(setComments)
        .catch(() => setIsErrorComments(true))
        .finally(() => setIsLoading(false));
    }
  }, [selectedPost]);

  const addComment = ({ name, email, body, postId }: Omit<Comment, 'id'>) => {
    return createComment({ name, email, body, postId }).then(newComment =>
      setComments(currentComments => [...currentComments, newComment]),
    );
  };

  const handleDeleteComment = (commentId: number) => {
    setComments(currentComments =>
      currentComments.filter(comment => comment.id !== commentId),
    );
    deleteComment(commentId);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${selectedPost?.id}: ${selectedPost?.title}`}
          </h2>

          <p data-cy="PostBody">{selectedPost?.body}</p>
        </div>

        <div className="block">
          {isLoading && <Loader />}

          {isErrorComments && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {isNoComments && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {comments.length > 0 && !isLoading && !isErrorComments && (
            <>
              <p className="title is-4">Comments:</p>
              {comments.map(comment => {
                return (
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
                        onClick={() => handleDeleteComment(comment.id)}
                      ></button>
                    </div>

                    <div className="message-body" data-cy="CommentBody">
                      {comment.body}
                    </div>
                  </article>
                );
              })}
            </>
          )}

          {!isLoading && !isErrorComments && !isShownForm && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsShownForm(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {isShownForm && (
          <NewCommentForm onAdd={addComment} selectedPost={selectedPost} />
        )}
      </div>
    </div>
  );
};
