import React, { memo } from 'react';
import PropTypes from 'prop-types';

export const InputCommentForm = memo(({ handleComment, comment }) => (
  <div className="form-field">
    <textarea
      onChange={handleComment}
      value={comment}
      name="body"
      placeholder="Type comment here"
      className="NewCommentForm__input"
    />
  </div>
));

InputCommentForm.propTypes = {
  handleComment: PropTypes.func.isRequired,
  comment: PropTypes.string.isRequired,
}.isRequired;
