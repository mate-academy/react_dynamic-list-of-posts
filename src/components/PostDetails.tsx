import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { getCommentsByPostId } from '../utils/httpClient';
import { CommentComponent } from './CommentComponent';

export interface PostDetailsType {
  post: Post;
}

export const PostDetails: React.FC<PostDetailsType> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [commentAdd, setCommentAdd] = useState(false);

  useEffect(() => {
    setLoading(true);
    setCommentAdd(false);

    getCommentsByPostId(post.id)
      .then(response => {
        setComments(response);
      })
      .catch(() => {
        setError('Something went wrong');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [post]);

  const addCommentToArr = (com: Comment) => {
    setComments([...comments, com]);
  };

  const removeCommentById = (id: number) => {
    setComments(prev => [...prev.filter(com => com.id !== id)]);
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
          {loading && <Loader />}

          {error && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {comments && !loading && !error && (
            <>
              {comments.length === 0 ? (
                <p className="title is-4" data-cy="NoCommentsMessage">
                  No comments yet
                </p>
              ) : (
                <>
                  <p className="title is-4">Comments:</p>

                  {comments.map(comment => (
                    <CommentComponent
                      key={comment.id}
                      comment={comment}
                      removeComment={removeCommentById}
                    />
                  ))}
                </>
              )}
            </>
          )}

          {!commentAdd && !loading && !error && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setCommentAdd(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {commentAdd && <NewCommentForm addCom={addCommentToArr} />}
      </div>
    </div>
  );
};
