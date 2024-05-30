import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { Post } from '../types/Post';
import { Comment as com } from '../types/Comment';
import { getComments } from '../api/comments';
import { NewCommentForm } from './NewCommentForm';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<com[] | undefined>();
  const [isCommentsLoad, setIsCommentsLoad] = useState(false);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setIsCommentsLoad(true);

    getComments(post.id)
      .then(result => {
        setComments(result);
        setIsCommentsLoad(false);
      })
      .catch(() => {
        setError('');
      });
  }, [post]);

  const handleDeleteComment = () => {};

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{post.title}</h2>

          <p data-cy="PostBody">{post.body}</p>
        </div>

        <div className="block">
          {isCommentsLoad && <Loader />}
          {error && (
            <div className="notification is-danger" data-cy="CommentsError">
              {error}
            </div>
          )}

          {!comments && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          <p className="title is-4">Comments:</p>
          {comments?.map((comment, index) => (
            <article className="message is-small" data-cy="Comment" key={index}>
              <div className="message-header">
                <a href={`mailto:${comment.email}`} data-cy="CommentAuthor">
                  {comment.name}
                </a>
                <button
                  data-cy="CommentDelete"
                  type="button"
                  className="delete is-small"
                  aria-label="delete"
                  onClick={handleDeleteComment}
                >
                  delete button
                </button>
              </div>

              <div className="message-body" data-cy="CommentBody">
                {comment.body}
              </div>
            </article>
          ))}

          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setShowForm(!showForm)}
          >
            Write a comment
          </button>
        </div>

        {showForm && <NewCommentForm />}
      </div>
    </div>
  );
};
