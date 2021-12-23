import React, { useState, useEffect } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import { getPostDetailes } from '../../api/posts';
import { getComments, deleteComment, postComment } from '../../api/comments';
import { Comment } from '../../types/comment';
import './PostDetails.scss';

type Props = {
  id: number;
};

export const PostDetails: React.FC<Props> = ({ id }) => {
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isCommentHidden, setIsCommentHidden] = useState(false);

  useEffect(() => {
    async function fetchPost() {
      const [currentPost, currentComments] = await Promise.all([
        getPostDetailes(id),
        getComments(id),
      ]);

      setPost(currentPost);
      setComments(currentComments);
    }

    fetchPost();
  }, [id]);

  const toggleCommentsDisplay = () => {
    setIsCommentHidden(!isCommentHidden);
  };

  const handleDeleteCommentBtn = (commentId: Comment['id']) => {
    deleteComment(commentId)
      .then(() => getComments(id)
        .then(result => setComments(result)));
  };

  const addNewComment = (newComment: Comment) => {
    postComment(newComment)
      .then(() => getComments(id)
        .then(result => setComments(result)));
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{post?.title}</p>
      </section>

      <section className="PostDetails__comments">
        {comments.length > 0
          ? (
            <button
              type="button"
              className="button"
              onClick={toggleCommentsDisplay}
            >
              {isCommentHidden
                ? 'Show' : 'Hide'}
              {` ${comments.length} `}
              {comments.length === 1 ? 'comment' : 'comments'}
            </button>
          ) : (
            <button
              disabled
              type="button"
              className="button"
            >
              No comments yet
            </button>
          )}
        <ul className="PostDetails__list">
          {!isCommentHidden && (
            comments.map(comment => (
              <li key={comment.id} className="PostDetails__list-item">
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={() => handleDeleteCommentBtn(comment.id)}
                >
                  X
                </button>
                <p>{comment.body}</p>
              </li>
            )))}
        </ul>
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm postId={id} addNewComment={addNewComment} />
        </div>
      </section>
    </div>
  );
};
