import React, { useEffect, useState } from 'react';

import { Loader } from '../Loader';
import { NewCommentForm } from '../NewCommentForm/NewCommentForm';
import { Post } from '../../types/Post';
import { Comment } from '../../types/Comment';
import { deleteComment, getComments } from '../../api';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    setIsCreating(false);
    setIsLoading(true);
    getComments(post.id)
      .then(setComments)
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, [post]);

  const removeComment = (id: number) => {
    setComments(curr => curr.filter(comment => comment.id !== id));
    deleteComment(id).catch(() => {
      setComments(comments);
    });
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>

          <p data-cy="PostBody">{post.body}</p>
        </div>

        <div className="block">
          {isLoading && <Loader />}

          {!isLoading && errorMessage && (
            <div className="notification is-danger" data-cy="CommentsError">
              {errorMessage}
            </div>
          )}

          {!errorMessage && !isLoading && !comments.length && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {!isLoading && !!comments.length && (
            <p className="title is-4">Comments:</p>
          )}

          {!isLoading &&
            !!comments.length &&
            comments.map(comment => (
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
                    onClick={() => removeComment(comment.id)}
                  ></button>
                </div>

                <div className="message-body" data-cy="CommentBody">
                  {comment.body}
                </div>
              </article>
            ))}

          {!errorMessage && !isLoading && !isCreating && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsCreating(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {isCreating && (
          <NewCommentForm post={post} updateComments={setComments} />
        )}
      </div>
    </div>
  );
};
