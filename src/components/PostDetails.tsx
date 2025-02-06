import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { client } from '../utils/fetchClient';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

interface Props {
  post: Post | null;
  postId: number;
}

export const PostDetails: React.FC<Props> = ({ post, postId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [openPostId, setOpenPostId] = useState<number | null>(null);

  const handleAddComment = (newComment: Comment) => {
    setComments(prevComments => [...prevComments, newComment]);
  };

  useEffect(() => {
    if (post === null) {
      return;
    }

    const fetchComments = async () => {
      setCommentsLoading(true);
      setError(false);

      try {
        const response = await client.get<Comment[]>(
          `/comments?postId=${post.id}`,
        );

        setComments(response);
      } catch {
        setError(true);
      } finally {
        setCommentsLoading(false);
      }
    };

    fetchComments();
  }, [post]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="block">
        <h2 data-cy="PostTitle">{`#${post?.id}: ${post?.title}`}</h2>
        <p data-cy="PostBody">{post?.body}</p>
      </div>

      <div className="block">
        <p className="title is-4">Comments:</p>

        {error ? (
          <div className="notification is-danger" data-cy="CommentsError">
            Something went wrong
          </div>
        ) : commentsLoading ? (
          <Loader />
        ) : comments.length === 0 ? (
          <p className="title is-4" data-cy="NoCommentsMessage">
            No comments yet
          </p>
        ) : (
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
                >
                  delete button
                </button>
              </div>

              <div className="message-body" data-cy="CommentBody">
                {comment.body}
              </div>
            </article>
          ))
        )}

        <button
          data-cy="WriteCommentButton"
          type="button"
          className="button is-link"
          onClick={() => setOpenPostId(post?.id ?? null)}
        >
          Write a comment
        </button>
      </div>

      {openPostId === post?.id && (
        <NewCommentForm postId={postId} onAddComment={handleAddComment} />
      )}
    </div>
  );
};
