import React from 'react';
import PropTypes from 'prop-types';

const Comment = ({ commentProps }) => (
  <>
    <section className="post__comments--body text">
      {commentProps.body}
    </section>
    <section className="post__comments--author author">
      <div className="author--name">
        {` Name: ${commentProps.name}`}
      </div>
      <div className="author--email">
        {`E-mail: ${commentProps.email}`}
      </div>
    </section>
  </>
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
