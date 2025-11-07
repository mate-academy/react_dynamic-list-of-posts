import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { deleteComment, getCommentsByPost } from '../utils/fetchClient';
import { Comment } from '../types/Comment';

type Props = {
  posts: Post[];
  openPostId: number | null;
};

export const PostDetails: React.FC<Props> = ({ posts, openPostId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loadCommError, setLoadCommError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenCommentForm, setIsOpenCommentForm] = useState<number | null>(
    null,
  );

  const selectedPost = posts.find(post => post.id === openPostId);

  useEffect(() => {
    if (!openPostId) {
      setComments([]);

      return;
    }

    setLoadCommError(null);
    setIsLoading(true);
    getCommentsByPost(openPostId)
      .then(result => {
        setComments(result);
      })
      .catch(() => setLoadCommError('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, [openPostId]);

  const onSubmit = (newComment: Comment) => {
    setComments(prev => [...prev, newComment]);
  };

  const handleDeleteComment = async (commentId: number) => {
    const previousComments = comments;

    setComments(prevComments =>
      prevComments.filter(comment => comment.id !== commentId),
    );

    try {
      await deleteComment(commentId);
    } catch {
      setComments(previousComments);
      setLoadCommError('Failed to delete comment');
    }
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        {selectedPost && (
          <div className="block">
            <h2 data-cy="PostTitle">
              {`#${selectedPost.id}: ${selectedPost.title}`}
            </h2>

            <p data-cy="PostBody">{selectedPost.body}</p>
          </div>
        )}

        <div className="block">
          {isLoading && <Loader />}

          {loadCommError && (
            <div className="notification is-danger" data-cy="CommentsError">
              {loadCommError}
            </div>
          )}

          {!isLoading && !loadCommError && comments.length === 0 && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {comments.length > 0 && (
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
                      href={`mailto: ${comment.email}`}
                      data-cy="CommentAuthor"
                    >
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

          {isOpenCommentForm !== openPostId && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsOpenCommentForm(openPostId)}
            >
              Write a comment
            </button>
          )}
        </div>

        {isOpenCommentForm === openPostId && selectedPost && (
          <NewCommentForm postId={selectedPost.id} onSubmit={onSubmit} />
        )}
      </div>
    </div>
  );
};
