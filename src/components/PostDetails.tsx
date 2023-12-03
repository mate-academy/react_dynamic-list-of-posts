import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';
import { Comment, CommentData } from '../types/Comment';

type Props = {
  post: Post | undefined;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);

  const handleDeleteComment = (id: number) => {
    setComments(comments.filter(comment => comment.id !== id));
    client.delete(`/comments/${id}`);
  };

  const handleAddComment = (newComment: CommentData) => {
    return client
      .post('/comments', {
        ...newComment,
        postId: post?.id,
      })
      .then(data => {
        setComments([...comments, data as Comment]);
      });
  };

  useEffect(() => {
    if (post) {
      setIsLoading(true);
      setShowForm(false);

      client.get(`/comments?postId=${post.id}`)
        .then(data => setComments(data as Comment[]))
        .catch(() => setHasError(true))
        .finally(() => setIsLoading(false));
    }
  }, [post]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        {post && (
          <>
            <div className="block">
              <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>
              <p data-cy="PostBody">{post.body}</p>
            </div>

            <div className="block">
              {isLoading && <Loader />}

              {!isLoading && hasError && (
                <div className="notification is-danger" data-cy="CommentsError">
                  Something went wrong
                </div>
              )}

              {!isLoading && !comments.length && (
                <p className="title is-4" data-cy="NoCommentsMessage">
                  No comments yet
                </p>
              )}

              {!isLoading && !!comments.length && (
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

              {!isLoading && !hasError && !showForm && (
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

            {showForm && <NewCommentForm onAdd={handleAddComment} />}
          </>
        )}
      </div>
    </div>
  );
};
