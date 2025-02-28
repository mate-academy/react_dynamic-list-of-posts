import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment, CommentData } from '../types/Comment';
import { client } from '../utils/fetchClient';

interface PostDetailsProps {
  post: Post | null;
}

export const PostDetails: React.FC<PostDetailsProps> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (post?.id) {
      setLoading(true);
      setIsError(false);
      setShowForm(false);
      setComments([]);

      client
        .get<Comment[]>(`/comments?postId=${post?.id}`)
        .then(res => setComments(res))
        .catch(() => setIsError(true))
        .finally(() => setLoading(false));
    }
  }, [post]);

  const onDeleteComment = (commentId: number) => {
    setComments(currentComments =>
      currentComments.filter(comment => commentId !== comment.id),
    );

    client.delete(`/comments/${commentId}`);
  };

  const addComment = async (commentData: CommentData) => {
    if (!post?.id) {
      return;
    }

    try {
      const newComment = await client.post<Comment>('/comments', {
        ...commentData,
        postId: post.id,
      });

      setComments(currentComments => [...currentComments, newComment]);
    } catch (e) {
      setIsError(true);
    }
  };

  const showLoader = loading;
  const showError = !loading && isError;
  const showContent = !loading && !isError;
  const hasComments = comments.length > 0;
  const showButton = !showForm && !showLoader && !showError;

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${post?.id}: ${post?.title}`}</h2>

          <p data-cy="PostBody">{post?.body}</p>
        </div>

        <div className="block">
          {showLoader && <Loader />}

          {showError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {showContent && (
            <>
              {!hasComments && (
                <p className="title is-4" data-cy="NoCommentsMessage">
                  No comments yet
                </p>
              )}

              {hasComments && (
                <>
                  <p className="title is-4">Comments:</p>

                  {comments.map(comment => (
                    <article
                      key={comment.id}
                      className="message is-small"
                      data-cy="Comment"
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
                          onClick={() => onDeleteComment(comment.id)}
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
            </>
          )}

          {showButton && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setShowForm(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {showForm && !showError && <NewCommentForm addComment={addComment} />}
      </div>
    </div>
  );
};
