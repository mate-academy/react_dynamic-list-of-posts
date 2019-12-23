import React from 'react';
import PropTypes from 'prop-types';
import User from './User';
import Comments from './Comments';

const Post = ({ postElems }) => (
  <>
    <h1 className="post__title title">
      {postElems.title}
    </h1>
    <section className="post__user author">
      <User user={postElems.user} />
    </section>
    <article className="post__body text">
      {postElems.body}
    </article>
    <Comments comments={postElems.postComments} />
  </>
);

Post.propTypes = {
  postElems: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
    PropTypes.array,
  ])),
};
Post.defaultProps = { postElems: [] };
export default Post;
