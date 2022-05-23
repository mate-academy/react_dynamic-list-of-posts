import React, { useState, useEffect } from 'react';
import { addNewComment, deleteComment, getPostComments } from '../../api/comments';
import { getPostDetails } from '../../api/posts';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

interface Props {
  selectedPostId: number,
}

export const PostDetails: React.FC<Props> = ({ selectedPostId }) => {
  const [selectedPost, setSelectedPost] = useState({
    id: 0,
    userId: 0,
    title: '',
    body: '',
  });
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentsIsVisible, setCommentsIsVisible] = useState(true);

  const hadnleDeleteComment = (commentId: number) => {
    deleteComment(commentId);
    setComments(current => current.filter(({ id }) => commentId !== id));
  };

  const handleAddComment = async (newComment: Partial<Comment>) => {
    const res = await addNewComment(newComment);

    setComments(current => [...current, res]);
  };

  useEffect(() => {
    getPostDetails(selectedPostId)
      .then(post => setSelectedPost(post));
    getPostComments(selectedPostId)
      .then(commentsFromServer => setComments(commentsFromServer));
  }, [selectedPostId]);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{selectedPost.title}</p>
      </section>

      <section className="PostDetails__comments">
        {comments.length
          ? (
            <button
              type="button"
              className="button"
              onClick={() => setCommentsIsVisible(!commentsIsVisible)}
            >
              {commentsIsVisible ? `Hide ${comments.length} comment` : 'Show comments'}
            </button>
          )
          : (
            'Nobody has commented yet. Be the first!'
          )}

        {commentsIsVisible
        && (
          <ul className="PostDetails__list">
            {comments.map(comment => {
              const { body, id } = comment;

              return (
                <li
                  className="PostDetails__list-item"
                  key={id}
                >
                  <button
                    type="button"
                    className="PostDetails__remove-button button"
                    onClick={() => hadnleDeleteComment(id)}
                  >
                    X
                  </button>
                  <p>{body}</p>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            postId={selectedPost.id}
            onAddNewComment={handleAddComment}
          />
        </div>
      </section>
    </div>
  );
};
