import React, { useState } from 'react';
import PropTypes, { object } from 'prop-types';
import { NewCommentForm } from '../NewCommentForm';
import { CommentsList } from './CommenstList';

import './PostDetails.scss';

export const PostDetails = ({
  selectedPostDetails,
  postComments,
  selectedPostId,
  addComment,
  deleteComment,
}) => {
  const [hideComments, setHideComments] = useState(false);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{selectedPostDetails.body}</p>
      </section>

      <section className="PostDetails__comments">
        {postComments.length !== 0
        && (
          <button
            type="button"
            className="button"
            onClick={() => setHideComments(!hideComments)}
          >
            {!hideComments ? 'Hide ' : 'Show '}
            { postComments.length }
            { postComments.length === 1 ? ' comment' : ' comments'}
          </button>
        )
        }

        {!hideComments
        && (
          <CommentsList
            postComments={postComments}
            deleteComment={deleteComment}
          />
        )
        }
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            selectedPostId={selectedPostId}
            addComment={addComment}
          />
        </div>
      </section>
    </div>
  );
};

PostDetails.propTypes = {
  selectedPostId: PropTypes.number.isRequired,
  addComment: PropTypes.func.isRequired,
  selectedPostDetails: PropTypes.shape({
    body: PropTypes.string.isRequired,
  }).isRequired,
  postComments: PropTypes.arrayOf(object).isRequired,
  deleteComment: PropTypes.func.isRequired,
};
