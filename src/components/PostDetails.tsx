import React, { useCallback, useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';
import { Comment, CommentData } from '../types/Comment';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState('');
  const [isFormActive, setIsFormActive] = useState(false);

  const addComment = useCallback((comment: CommentData) => {
    setError('');

    return client
      .post<Comment>('/comments', comment)
      .then(createdComment => {
        setComments(prevComments => [...prevComments, createdComment]);
        setError('');
      })
      .catch(err => {
        setError(`Can't add a comment. Try again`);
        throw err;
      });
  }, []);

  const deleteComment = useCallback(
    (commentId: number) => {
      setError('');

      setComments(prevComments =>
        prevComments.filter(comment => commentId !== comment.id),
      );

      client.delete(`/comments/${commentId}`).catch(err => {
        setComments(comments);
        setError(`Can't delete a comment. Try again`);
        throw err;
      });
    },
    [comments],
  );

  const handleWriteCommentClick = useCallback(() => {
    setIsFormActive(true);
  }, []);

  useEffect(() => {
    setIsLoaded(false);
    setError('');
    setLoading(true);
    setIsFormActive(false);

    client
      .get<Comment[]>(`/comments?postId=${post.id}`)
      .then(commentsFromServer => {
        setComments(commentsFromServer);
        setIsLoaded(true);
      })
      .catch(() => setError('Something went wrong'))
      .finally(() => {
        setLoading(false);
      });
  }, [post.id]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>

          <p data-cy="PostBody">{post.body}</p>
        </div>

        <div className="block">
          {loading && <Loader />}

          {error && (
            <div className="notification is-danger" data-cy="CommentsError">
              {error}
            </div>
          )}

          {isLoaded &&
            (comments.length === 0 ? (
              <p className="title is-4" data-cy="NoCommentsMessage">
                No comments yet
              </p>
            ) : (
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
                        onClick={() => deleteComment(comment.id)}
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

          {isLoaded && !isFormActive && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={handleWriteCommentClick}
            >
              Write a comment
            </button>
          )}
        </div>

        {isFormActive && (
          <NewCommentForm selectedPost={post} addComment={addComment} />
        )}
      </div>
    </div>
  );
};
