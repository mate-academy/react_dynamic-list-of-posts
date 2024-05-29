import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { getPostComments } from '../api';
import { Comment } from '../types/Comment';
import { CommentItem } from './CommentItem';

interface Props {
  post: Post;
}

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const { id, title, body } = post;

  useEffect(() => {
    setIsLoading(true);
    setIsFormVisible(false);
    getPostComments(post.id)
      .then(setComments)
      .catch(() => setError('Unable get comments'))
      .finally(() => setIsLoading(false));
  }, [post]);

  const addComment = (newComment: Comment) => {
    setComments(currentComments => [...currentComments, newComment]);
  };

  const deleteComment = (commentId: number) => {
    setComments(currentComments =>
      currentComments.filter(c => c.id !== commentId),
    );
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${id}: ${title}`}</h2>

          <p data-cy="PostBody">{body}</p>
        </div>

        <div className="block">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {error && (
                <div className="notification is-danger" data-cy="CommentsError">
                  {error}
                </div>
              )}

              {!error && (
                <>
                  {!comments.length ? (
                    <p className="title is-4" data-cy="NoCommentsMessage">
                      No comments yet
                    </p>
                  ) : (
                    <>
                      <p className="title is-4">Comments:</p>
                      {comments.map(comment => (
                        <CommentItem
                          key={comment.id}
                          comment={comment}
                          removeComment={deleteComment}
                        />
                      ))}
                    </>
                  )}

                  {!isFormVisible && (
                    <button
                      data-cy="WriteCommentButton"
                      type="button"
                      className="button is-link"
                      onClick={() => setIsFormVisible(true)}
                    >
                      Write a comment
                    </button>
                  )}
                </>
              )}
            </>
          )}
        </div>

        {isFormVisible && !error && (
          <NewCommentForm
            postId={post.id}
            addComment={addComment}
            setError={setError}
          />
        )}
      </div>
    </div>
  );
};
