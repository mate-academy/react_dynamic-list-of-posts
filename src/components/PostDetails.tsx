import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

interface PostDetailsProps {
  post: Post | null;
}

export const PostDetails: React.FC<PostDetailsProps> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [commentsError, setCommentsError] = useState<string | null>(null);
  const [showNewCommentForm, setShowNewCommentForm] = useState(false);

  useEffect(() => {
    setShowNewCommentForm(false);
  }, [post]);

  useEffect(() => {
    if (post) {
      setLoadingComments(true);
      setCommentsError(null);
      setComments([]);

      client
        .get(`/comments?postId=${post.id}`)
        .then(data => setComments(data as Comment[]))
        .catch(() => setCommentsError('Failed to load comments'))
        .finally(() => setLoadingComments(false));
    }
  }, [post]);

  if (!post) {
    return <p data-cy="NoPostSelected">Select a post to see details</p>;
  }

  const handleDeleteComment = (commentId: number) => {
    setComments(prev => prev.filter(comment => comment.id !== commentId));

    client.delete(`/comments/${commentId}`).catch(err => {
      // eslint-disable-next-line no-console
      console.error('Failed to delete comment', err);
    });
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
          {loadingComments && <Loader />}
          {commentsError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}
          {!loadingComments && !commentsError && comments.length === 0 && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {!loadingComments && !commentsError && comments.length > 0 && (
            <>
              <p className="title is-4">Comments:</p>
              {comments.map(comment => (
                <article
                  key={comment.id}
                  className="message is-small"
                  data-cy="Comment"
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
                      onClick={() => handleDeleteComment(comment.id)}
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
        </div>

        {!loadingComments && !commentsError && !showNewCommentForm && (
          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setShowNewCommentForm(true)}
          >
            Write a comment
          </button>
        )}
        {showNewCommentForm && (
          <NewCommentForm
            postId={post.id}
            onCommentAdded={(newComment: Comment) =>
              setComments([...comments, newComment])
            }
          />
        )}
      </div>
    </div>
  );
};
