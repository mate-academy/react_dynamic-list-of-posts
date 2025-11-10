import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { usePosts } from './hooks/usePosts';
import { useComments } from './hooks/useComments';
import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

type Props = {
  userId: number | null;
  selectedPostId: number | null;
  showNewCommentForm: boolean;
  setShowNewCommentForm: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PostDetails: React.FC<Props> = ({
  userId,
  selectedPostId,
  showNewCommentForm,
  setShowNewCommentForm,
}) => {
  const { posts, loading: postsLoading, error } = usePosts(userId);
  const {
    comments: initialComments,
    loading: commentsLoading,
    error: commentsError,
  } = useComments(selectedPostId);
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const post = posts.find(p => p.id === selectedPostId);

  useEffect(() => {
    setComments(initialComments);
  }, [initialComments]);

  if (!post) {
    return postsLoading ? (
      <Loader />
    ) : (
      <div className="block">
        <div className="notification is-danger" data-cy="PostsLoadingError">
          Something went wrong!
        </div>
      </div>
    );
  }

  const addComment = (newComment: Comment) => {
    setComments(prev => [...prev, newComment]);
  };

  const handleDelete = async (commentId: number) => {
    setComments(prev => prev.filter(comment => comment.id !== commentId));

    try {
      await client.delete(`/comments/${commentId}`);
    } catch {
      alert('Something went wrong!');
      setComments(prev => [...prev, comments.find(c => c.id === commentId)!]);
    }
  };

  return (
    <>
      {error ? (
        <>
          <div className="block">
            <h2 data-cy="PostTitle">
              #{post.id}: {post.title}
            </h2>
            <p data-cy="PostBody">{post.body}</p>
          </div>
          <div className="block">
            <div className="notification is-danger" data-cy="PostsLoadingError">
              Something went wrong!
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="block">
            <h2 data-cy="PostTitle">
              #{post.id}: {post.title}
            </h2>
            <p data-cy="PostBody">{post.body}</p>
          </div>

          <div className="block">
            {commentsError ? (
              <div className="notification is-danger" data-cy="CommentsError">
                Something went wrong while loading comments!
              </div>
            ) : commentsLoading ? (
              <Loader />
            ) : comments.length === 0 ? (
              <p data-cy="NoCommentsMessage">No comments yet</p>
            ) : (
              <>
                <h3>Comments</h3>
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
                        className="delete"
                        aria-label="delete"
                        onClick={() => handleDelete(comment.id)}
                        data-cy="CommentDelete"
                      />
                    </div>
                    <div className="message-body" data-cy="CommentBody">
                      {comment.body}
                    </div>
                  </article>
                ))}
              </>
            )}

            {!showNewCommentForm && !commentsError && (
              <button
                type="button"
                className="button is-link"
                onClick={() => setShowNewCommentForm(true)}
                data-cy="WriteCommentButton"
              >
                Write a comment
              </button>
            )}

            {showNewCommentForm && !commentsError && (
              <NewCommentForm postId={post.id} onAddComment={addComment} />
            )}
          </div>
        </>
      )}
    </>
  );
};
