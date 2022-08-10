import React, { useEffect, useState } from 'react';
import { getPostComments } from '../../api/comments';
import { getPostDetails, request } from '../../api/posts';
import { Post } from '../../Post';
import { Comment } from '../../Comment';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

type Props = {
  selectedPostId: number,
};

export const PostDetails: React.FC<Props> = ({ selectedPostId }) => {
  const [isClicked, setIsClicked] = useState<boolean>(true);
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  const loadComments = () => {
    getPostComments(selectedPostId)
      .then(res => setComments(res));
  };

  const deleteComment = (id: number) => {
    return request(`/comments/${id}`, { method: 'DELETE' })
      .then(() => loadComments());
  };

  useEffect(() => {
    getPostDetails(selectedPostId)
      .then(res => setPost(res));
    loadComments();
  }, [selectedPostId]);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        {post && <p>{post.title}</p>}
      </section>

      <section className="PostDetails__comments" data-cy="postList">
        <button
          type="button"
          className="button"
          onClick={() => setIsClicked(!isClicked)}
        >
          {isClicked ? 'Hide comments' : 'Show comments'}
        </button>

        {isClicked && (
          <ul className="PostDetails__list">
            {comments.map(comment => (
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
            ))}
            {comments.length === 0 && 'No comments yet'}
          </ul>
        )}
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            selectedPostId={selectedPostId}
            loadComments={loadComments}
          />
        </div>
      </section>
    </div>
  );
};
