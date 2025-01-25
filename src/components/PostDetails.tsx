import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { deleteComment, getPostComments } from '../api/comments';
import { Comment } from '../types/Comment';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [postComments, setPostComments] = useState<Comment[]>([]);
  const [isWritingComment, setIsWritingComment] = useState(false);

  useEffect(() => {
    setIsError(false);
    setIsLoading(true);
    getPostComments(post.id)
      .then(setPostComments)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, [post.id]);

  const handleDeleteComment = (commentId: number) => {
    setPostComments(prevComments =>
      prevComments.filter(comment => comment.id !== commentId),
    );
    deleteComment(commentId).catch(() => setPostComments(postComments));
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

          {isError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!isLoading && !isError && postComments.length === 0 && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {!isLoading && postComments.length > 0 && (
            <>
              <p className="title is-4">Comments:</p>

              {postComments.map(comment => (
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

          {!isWritingComment && (
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
          <NewCommentForm
            post={post}
            comments={postComments}
            onAdd={setPostComments}
          />
        )}
      </div>
    </div>
  );
};
