import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';
import { Comment } from '../types/Comment';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isWriting, setIsWriting] = useState(false);

  const commentsError = error === 'commentsError' ? true : false;
  const deleteError = error === 'deleteError' ? true : false;

  useEffect(() => {
    setIsLoading(true);
    client
      .get<Comment[]>(`/comments?postId=${post.id}`)
      .then(res => setComments(res))
      .catch(() => setError('commentsError'))
      .finally(() => setIsLoading(false));
  }, [post.id]);

  const handleDeleteComment = (comment: Comment) => {
    setComments(prev =>
      prev.filter(prevComment => prevComment.id !== comment.id),
    );
    client.delete(`/comments/${comment.id}`).catch(() => {
      setComments(comments);
      setError('deleteError');
    });
  };

  const handleSubmit = (newComment: Comment) => {
    setComments(prev => [...prev, newComment]);
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            #{post.id}: {post.title}
          </h2>

          <p data-cy="PostBody">{post.body}</p>
        </div>

        <div className="block">
          {isLoading && <Loader />}

          {commentsError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!isLoading && !commentsError && (
            <>
              {!comments.length ? (
                <p className="title is-4" data-cy="NoCommentsMessage">
                  No comments yet
                </p>
              ) : (
                !!comments.length && <p className="title is-4">Comments:</p>
              )}
              {deleteError && (
                <div className="notification is-danger" data-cy="CommentsError">
                  Something went wrong. Can &apos;t delete the comment.
                </div>
              )}
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
                      onClick={() => handleDeleteComment(comment)}
                    ></button>
                  </div>

                  <div className="message-body" data-cy="CommentBody">
                    {comment.body}
                  </div>
                </article>
              ))}

              {!isWriting && (
                <button
                  data-cy="WriteCommentButton"
                  type="button"
                  className="button is-link"
                  onClick={() => {
                    setIsWriting(true);
                  }}
                >
                  Write a comment
                </button>
              )}
            </>
          )}
        </div>

        {isWriting && (
          <NewCommentForm onSubmit={handleSubmit} postId={post.id} />
        )}
      </div>
    </div>
  );
};
