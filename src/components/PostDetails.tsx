import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { client, deleteComment } from '../utils/fetchClient';
import { Comment } from '../types/Comment';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isWritingComment, setIsWritingComment] = useState(false);

  const loadComments = async (postId: number) => {
    setIsWritingComment(false);
    setIsLoading(true);
    setError('');

    try {
      const fetchedComments = await client.get<Comment[]>(
        `/comments?postId=${postId}`,
      );

      setComments(fetchedComments);
    } catch (err) {
      setError('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadComments(post.id);
  }, [post]);

  const removeComment = (id: number) => {
    const previousComments = [...comments];

    setComments(curr => curr.filter(comment => comment.id !== id));

    deleteComment(id).catch(() => {
      setComments(previousComments);
      setError('Failed to delete the comment');
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

          {error && (
            <div className="notification is-danger" data-cy="CommentsError">
              {error}
            </div>
          )}
          {!isLoading && !comments.length && !error && (
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

          {!isWritingComment && !error && !isLoading && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsWritingComment(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {isWritingComment && (
          <NewCommentForm post={post} updateCommentList={setComments} />
        )}
      </div>
    </div>
  );
};
