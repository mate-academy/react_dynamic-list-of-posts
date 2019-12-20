import React from 'react';
import PropTypes from 'prop-types';

const Comment = ({ commentProps }) => (
  <React.Fragment key={commentProps.id}>
    <section className="post__comments--body text">
      {commentProps.body}
    </section>
    <section className="post__comments--author author">
      {` Name: ${commentProps.name}`}
      <br />
      {`E-mail: ${commentProps.email}`}
    </section>
    <br />
  </React.Fragment>
);

Comment.propTypes = {
  commentProps: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
    PropTypes.array,
  ])),
};
Comment.defaultProps = { commentProps: [] };
export default Comment;
