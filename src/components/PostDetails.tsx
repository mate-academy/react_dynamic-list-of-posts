import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';
import { NewCommentForm } from './NewCommentForm';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isCommentForm, setIsCommentForm] = useState(false);

  const onDelete = (id: number) => {
    setComments(prev => prev.filter(com => com.id !== id));

    client.delete(`/comments/${id}`);
  };

  useEffect(() => {
    setIsCommentForm(false);
    setError(false);
    setLoading(true);

    client
      .get<Comment[]>(`/comments?postId=${post.id}`)
      .then(result => setComments(result))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [post]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>

          <p data-cy="PostBody">{post.body}</p>
        </div>

        <div className="block">
          {loading && <Loader />}

          {error ? (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          ) : (
            <>
              {!loading && comments.length === 0 && (
                <p className="title is-4" data-cy="NoCommentsMessage">
                  No comments yet
                </p>
              )}
              {comments.length > 0 && !loading && (
                <p className="title is-4">Comments:</p>
              )}

              {comments.map(c => (
                <article
                  key={c.id}
                  className="message is-small"
                  data-cy="Comment"
                >
                  <div className="message-header">
                    <a href={`mailto:${c.email}`} data-cy="CommentAuthor">
                      {c.name}
                    </a>
                    <button
                      data-cy="CommentDelete"
                      type="button"
                      className="delete is-small"
                      aria-label="delete"
                      onClick={() => onDelete(c.id)}
                    >
                      delete button
                    </button>
                  </div>

                  <div className="message-body" data-cy="CommentBody">
                    {c.body}
                  </div>
                </article>
              ))}

              {!isCommentForm && !loading && (
                <button
                  data-cy="WriteCommentButton"
                  type="button"
                  className="button is-link"
                  onClick={() => setIsCommentForm(true)}
                >
                  Write a comment
                </button>
              )}

              {isCommentForm && (
                <NewCommentForm
                  post={post}
                  setAddError={setError}
                  onAdd={(newComment: Comment) =>
                    setComments(prev => [...prev, newComment])
                  }
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
