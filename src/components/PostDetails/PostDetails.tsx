import React, { useCallback, useEffect, useState } from 'react';
import {
  createComment,
  deleteComment,
  getPostComments,
} from '../../api/comments';
import { getPostById } from '../../api/posts';
import { Post, Comment } from '../../types';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

interface Props {
  selectedPostId: number;
}

export const PostDetails: React.FC<Props> = React.memo(({ selectedPostId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isCommentsVisible, setIsCommentsVisible] = useState(true);

  const getSelectedPost = () => (
    getPostById(selectedPostId).then(data => setSelectedPost(data))
  );

  const getComments = () => {
    getPostComments(selectedPostId)
      .then(comment => setComments(comment));
  };

  const commentVisibilityToggle = () => (
    setIsCommentsVisible(!isCommentsVisible)
  );

  const removeComment = (commentId: number) => {
    setComments(comments.filter(comment => comment.id !== commentId));
    deleteComment(commentId);
  };

  const addComment = useCallback((newComment: Comment) => {
    setComments(currComments => [...currComments, newComment]);
    createComment(newComment);
  }, [comments]);

  useEffect(() => {
    getSelectedPost();
    getComments();
  }, [selectedPostId]);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{selectedPost?.title}</p>
      </section>

      <section className="PostDetails__comments">
        {comments.length
          ? (
            <button
              type="button"
              className="button"
              onClick={commentVisibilityToggle}
            >
              {
                isCommentsVisible
                  ? `Hide ${comments?.length} comments`
                  : `Show ${comments?.length} comments`
              }
            </button>
          )
          : (
            <p>No comments yet</p>
          )}

        {
          !isCommentsVisible
            ? ''
            : (
              <ul className="PostDetails__list">
                {comments.map((comment) => (
                  <li className="PostDetails__list-item" key={comment.id}>
                    <button
                      type="button"
                      className="PostDetails__remove-button button"
                      onClick={() => removeComment(comment.id)}
                    >
                      X
                    </button>
                    <p>{comment.body}</p>
                  </li>
                ))}
              </ul>
            )
        }
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm addComment={addComment} postId={selectedPostId} />
        </div>
      </section>
    </div>
  );
});
