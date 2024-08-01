import React, { useState, useEffect } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { deleteComment, getPostsComments } from '../services/comment';

type Props = {
  selectedPost: Post;
};

export const PostDetails: React.FC<Props> = ({ selectedPost }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isShowingForm, setIsShowingForm] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!selectedPost.id) {
      return;
    }

    setIsLoading(true);
    setComments([]);
    setIsShowingForm(false);

    getPostsComments(selectedPost.id)
      .then(setComments)
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, [selectedPost.id]);

  const onDelete = (commentId: number) => {
    deleteComment(commentId).then(() => {
      setComments(currComments =>
        currComments.filter(comment => comment.id !== commentId),
      );
    });
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            #{selectedPost.id}: {selectedPost.title}
          </h2>

          <p data-cy="PostBody">{selectedPost.body}</p>
        </div>

        <div className="block">
          {isLoading && <Loader />}

          {error && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!comments.length && !isLoading && !error && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {!!comments.length && (
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
                      onClick={() => onDelete(comment.id)}
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

          {!isShowingForm && !isLoading && !error && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsShowingForm(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {isShowingForm && (
          <NewCommentForm
            postId={selectedPost.id}
            setComments={setComments}
            setError={setError}
          />
        )}
      </div>
    </div>
  );
};
