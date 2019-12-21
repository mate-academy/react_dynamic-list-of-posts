import PropTypes from 'prop-types';
import React from 'react';
import User from './User';
import CommentList from './CommentList';

const Post = ({ ownpost }) => (
  <>
    <section className="onepost">
      <h1 className="tileOfPost">
        {ownpost.title}
      </h1>
      <p className="bodypost">
        {ownpost.body}
      </p>
    </section>
    <User user={ownpost.user} />
    <CommentList findcommet={ownpost.comments} />
  </>
);

Post.propTypes = { ownpost: PropTypes.objectOf(PropTypes.any).isRequired };

export default Post;
