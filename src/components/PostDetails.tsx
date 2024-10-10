import React, { useCallback, useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { addComment, deleteComment, getCommentsByPost } from '../api/comments';

type Props = {
  post: Post | null;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isAddingComment, setIsAddingComment] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!post) {
      return;
    }

    const loadComments = async () => {
      setIsLoading(true);
      setError(false);

      try {
        const commentsFromServer = await getCommentsByPost(post.id);

        setComments(commentsFromServer);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadComments();
  }, [post]);

  useEffect(() => {
    setIsAddingComment(false);
  }, [post]);

  const handleAddComment = useCallback(
    async (commentData: Omit<Comment, 'id'>) => {
      try {
        const newComment = await addComment(commentData);

        setComments([...(comments || []), newComment]);
      } catch {
        setError(true);
      }
    },
    [comments],
  );

  const handleDeleteComment = useCallback(
    async (id: number) => {
      setComments(comments.filter(comment => comment.id !== id));
      try {
        await deleteComment(id);
      } catch {
        setError(true);
      }
    },
    [comments],
  );

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${post?.id}: ${post?.title}`}</h2>

          <p data-cy="PostBody">{post?.body}</p>
        </div>
        <div className="block">
          {isLoading && <Loader />}

          {error && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!isLoading && comments?.length === 0 && !error && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {comments && comments?.length > 0 && (
            <>
              <p className="title is-4">Comments:</p>

              {comments?.map(({ id, email, name, body }) => (
                <article
                  key={id}
                  className="message is-small"
                  data-cy="Comment"
                >
                  <div className="message-header">
                    <a href={`mailto:${email}`} data-cy="CommentAuthor">
                      {name}
                    </a>
                    <button
                      data-cy="CommentDelete"
                      type="button"
                      className="delete is-small"
                      aria-label="delete"
                      onClick={() => handleDeleteComment(id)}
                    ></button>
                  </div>

                  <div className="message-body" data-cy="CommentBody">
                    {body}
                  </div>
                </article>
              ))}
            </>
          )}
          {!isLoading && !isAddingComment && !error && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsAddingComment(true)}
            >
              Write a comment
            </button>
          )}
        </div>
        {isAddingComment && post && (
          <NewCommentForm postId={post.id} onSubmit={handleAddComment} />
        )}
      </div>
    </div>
  );
};
