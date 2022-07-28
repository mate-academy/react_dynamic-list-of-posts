import React, { useState, useEffect } from 'react';
import { getPostComments, removeComment } from '../../api/comments';
import { PostDetailsProps, Comment } from '../../types';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

export const PostDetails: React.FC<PostDetailsProps> = ({ post }) => {
  const [postComments, setPostComments] = useState<Comment[]>();
  const [shouldShowComments, setShouldShowComments] = useState(true);

  const deleteComment = async (commentId: number) => {
    await removeComment(commentId);
    if (post) {
      setPostComments(await getPostComments(post.id));
    }
  };

  const fetchPostComments = async () => {
    if (!post?.id) {
      return;
    }

    setPostComments(await getPostComments(post.id));
  };

  useEffect(() => {
    try {
      fetchPostComments();
    } catch (error) {
      throw new Error();
    }
  }, [post]);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{post?.title}</p>
      </section>

      <section
        className="PostDetails__comments"
        data-cy="postDetails"
      >
        {postComments?.length ? (
          <button
            type="button"
            className="button"
            onClick={() => {
              setShouldShowComments(!shouldShowComments);
            }}
          >
            {shouldShowComments ? 'Hide' : 'Show'}
            {' '}
            {postComments?.length}
            {' '}
            comments
          </button>
        ) : (
          <p>Add first comment</p>
        )}

        <ul className="PostDetails__list">
          {shouldShowComments && (
            postComments?.map(comment => (
              <li className="PostDetails__list-item" key={comment.id}>
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={() => deleteComment(comment.id)}
                >
                  X
                </button>
                <p>{comment.body}</p>
              </li>
            ))
          )}
        </ul>
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            postId={post?.id || null}
            fetchComments={fetchPostComments}
          />
        </div>
      </section>
    </div>
  );
};
