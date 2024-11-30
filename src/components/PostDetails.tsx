import { FC, useEffect, useState } from 'react';

import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

import { deleteComment, getPostComments } from '../utils/api';

import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';

interface Props {
  post: Post;
}

export const PostDetails: FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isForm, setIsForm] = useState(false);

  const handleDeleteComment = (commentId: number) => {
    deleteComment(commentId).catch(() => {
      setError(true);
    });

    setComments(currentComments =>
      currentComments.filter(comment => comment.id !== commentId),
    );
  };

  useEffect(() => {
    if (!post.id) {
      return;
    }

    setIsLoading(true);
    setIsForm(false);
    setError(false);
    setComments([]);

    getPostComments(post.id)
      .then(setComments)
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, [post.id]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${post.id}: ${post.title}`}</h2>

          <p data-cy="PostBody">{post.body}</p>
        </div>

        <div className="block">
          {isLoading && <Loader />}

          {error && !isLoading && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!comments.length && !isLoading && !error && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {!!comments.length && (
            <>
              <p className="title is-4">Comments:</p>

              {comments.map(comment => (
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

          {!isLoading && !isForm && !error && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsForm(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {isForm && (
          <NewCommentForm postId={post.id} updateComments={setComments} />
        )}
      </div>
    </div>
  );
};
