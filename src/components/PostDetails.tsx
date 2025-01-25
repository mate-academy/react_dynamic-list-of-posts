import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

interface Props {
  selectedPost: Post;
}

export const PostDetails: React.FC<Props> = ({ selectedPost }) => {
  const { id, title, body } = selectedPost;

  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [showCommentForm, setShowCommentForm] = useState(false);

  const loadComments = async () => {
    setIsLoading(true);
    setError('');

    try {
      const commentsResponse = await client.get<Comment[]>(
        `/comments?postId=${id}`,
      );

      setComments(commentsResponse);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to fetch comments');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    setError('');

    try {
      await client.delete(`/comments/${commentId}`);

      setComments(prevComments =>
        prevComments.filter(comment => comment.id !== commentId),
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to delete comment');
    }
  };

  useEffect(() => {
    setShowCommentForm(false);
    loadComments();
  }, [id]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${id} ${title}`}</h2>

          <p data-cy="PostBody">{body}</p>
        </div>
        <div className="block">
          {isLoading && <Loader />}

          {error && (
            <div className="notification is-danger" data-cy="CommentsError">
              {error ? error : 'Something went wrong!'}
            </div>
          )}

          {!isLoading && !error && comments.length > 0 ? (
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
          ) : (
            !isLoading &&
            !error &&
            comments.length === 0 && (
              <p className="title is-4" data-cy="NoCommentsMessage">
                No comments yet
              </p>
            )
          )}

          {!isLoading && !showCommentForm && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setShowCommentForm(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {showCommentForm && (
          <NewCommentForm
            selectedPostId={selectedPost.id}
            comments={comments}
            setComments={setComments}
            setError={setError}
          />
        )}
      </div>
    </div>
  );
};
