import React, { useEffect, useState } from 'react';
import { Post } from '../types/Post';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Comment } from '../types/Comment';
import { getComments, removeComment } from '../api/comments';
import { CommentCard } from './CommentCard/CommentCard';

type Props = {
  post: Post;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isNewCommentForm, setIsNewCommentForm] = useState(false);

  const loadComments = (postId: number) => {
    getComments(postId)
      .then(data => {
        setComments(data);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    loadComments(post.id);
  }, [post.id]);

  const deleteComment = (commentId: number) => {
    setIsLoading(true);
    setIsError(false);

    removeComment(commentId)
      .then(() => {
        if (comments) {
          const newComments: Comment[] = comments
            .filter(c => c.id !== commentId);

          setComments(newComments);
        }
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${post.id}: ${post.title}`}
          </h2>

          <p data-cy="PostBody">
            {post.body}
          </p>
        </div>

        <div className="block">
          {isLoading && (
            <Loader />
          )}

          {isError && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!comments?.length ? (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          ) : (
            <>
              <p className="title is-4">Comments:</p>

              {comments.map(comment => (
                <CommentCard
                  comment={comment}
                  deleteComment={deleteComment}
                  key={comment.id}
                />
              ))}
            </>
          )}

          <button
            data-cy="WriteCommentButton"
            type="button"
            className="button is-link"
            onClick={() => setIsNewCommentForm(true)}
          >
            Write a comment
          </button>
        </div>

        {isNewCommentForm && (
          <NewCommentForm
            postId={post.id}
            loadComments={loadComments}
          />
        )}
      </div>
    </div>
  );
};
