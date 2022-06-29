import React, { useEffect, useState } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { getSelectedPost, getComments, removeComment } from '../../api/api';

type Props = {
  postId: number,
};

export const PostDetails: React.FC<Props> = ({ postId }) => {
  const [post, setPost] = useState<Post>();
  const [comments, setComments] = useState<CommentWithId[]>([]);
  const [showComments, setShowComments] = useState(true);

  const requestComments = () => {
    getComments(postId)
      .then(commentsFromServer => setComments(commentsFromServer));
  };

  useEffect(() => {
    getSelectedPost(postId)
      .then(postFromServer => setPost(postFromServer));
    requestComments();
  }, [postId]);

  const deletingComment = (idOfComment: number) => {
    removeComment(idOfComment)
      .then(() => requestComments());
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{post && post.title}</p>
      </section>

      <section className="PostDetails__comments">
        <button
          type="button"
          className="button"
          onClick={() => {
            setShowComments(state => !state);
          }}
        >
          {showComments
            ? 'Hide comments'
            : 'Show comments'}
        </button>

        {showComments && (
          <ul className="PostDetails__list">
            {comments.map(comment => (
              <li
                className="PostDetails__list-item"
                key={comment.id}
              >
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={() => {
                    deletingComment(comment.id);
                  }}
                >
                  X
                </button>
                <p>{comment.body}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            postId={postId}
            requestComments={requestComments}
          />
        </div>
      </section>
    </div>
  );
};
