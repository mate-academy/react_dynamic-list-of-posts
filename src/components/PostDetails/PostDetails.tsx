import React, { useState, useEffect } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

import {
  getPostDetails,
  getPostComments,
  addComment,
  deleteComment,
} from '../../api/post';

interface Props {
  postId: number,
}

export const PostDetails: React.FC<Props> = ({ postId }) => {
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<PostComment[]>([]);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    getPostDetails(postId)
      .then(result => {
        setPost(result);
      });

    getPostComments(postId)
      .then(result => {
        setComments(result);
      });
  }, [postId]);

  const handleDeleteComment = (commentId: number) => {
    deleteComment(commentId);

    setComments(current => current.filter(({ id }) => commentId !== id));
  };

  const handleAddComment = async (comment: Partial<PostComment>) => {
    const newComment = await addComment(comment);

    setComments(current => [...current, newComment]);
  };

  return post && (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{post.body}</p>
      </section>

      <section className="PostDetails__comments">
        {comments.length ? (
          <button
            type="button"
            className="button"
            onClick={() => setIsHidden(current => !current)}
          >
            {isHidden
              ? 'Show Comments'
              : `Hide ${comments.length} comments` }
          </button>
        ) : (
          <p>There is no comments</p>
        )}
        <ul className="PostDetails__list">
          {!isHidden && comments.map((comment) => {
            return (
              <li className="PostDetails__list-item" key={comment.id}>
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={() => handleDeleteComment(comment.id)}
                >
                  X
                </button>
                <p>{comment.body}</p>
              </li>
            );
          })}
        </ul>
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            postId={postId}
            addNewComment={handleAddComment}
          />
        </div>
      </section>
    </div>
  );
};
