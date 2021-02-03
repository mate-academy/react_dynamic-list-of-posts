import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { NewCommentForm } from '../NewCommentForm';
import { Comment } from '../Comment';
import './PostDetails.scss';

export const PostDetails = ({
  post,
  comments,
  onDeleteComment,
  onLoadComments,
  onAddComment,
}) => {
  const [isHideComments, setIsHideComments] = useState(false);
  const { body, id } = post;

  useEffect(() => {
    setIsHideComments(false);
  }, [id]);

  useEffect(() => updateComments());

  const updateComments = () => {
    onLoadComments(id);
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{body}</p>
      </section>
      <section className="PostDetails__comments">
        <button
          type="button"
          className="button"
          onClick={() => {
            setIsHideComments(current => !current);
            updateComments();
          }}
        >
          {`${isHideComments ? 'Show' : 'Hide'} ${comments.length} comments`}
        </button>

        {!isHideComments && (
          <ul className="PostDetails__list">
            {comments.map(comment => (
              <li key={comment.id} className="PostDetails__list-item">
                <Comment
                  comment={comment}
                  onDeleteComment={onDeleteComment}
                />
              </li>
            ))}
          </ul>
        )}

      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm postId={id} createComment={onAddComment} />
        </div>
      </section>
    </div>
  );
};

PostDetails.propTypes = {
  post: PropTypes.shape({
    body: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDeleteComment: PropTypes.func.isRequired,
  onLoadComments: PropTypes.func.isRequired,
  onAddComment: PropTypes.func.isRequired,
};
