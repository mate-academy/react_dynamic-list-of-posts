import PropTypes from 'prop-types';
import React from 'react';
import Comment from './Comment';

const Post = ({ ownpost }) => (
  <>
    <section className="post">
      <h1 className="post__title">
        {ownpost.title}
      </h1>
      <p className="post__text">
        {ownpost.body}
      </p>
    </section>
    <section className="userSection">
      {ownpost.user.name}
      <br />
      {ownpost.user.email}
      <br />
      {ownpost.user.address.street}
      {ownpost.user.address.suite}
      {ownpost.user.address.city}
      {ownpost.user.address.zipcode}
      {ownpost.user.address.geo.lat}
      {ownpost.user.address.geo.lng}
    </section>
    <section className="commentSection">
      {
        ownpost.comments.map(comment => (
          <Comment key={comment.id} comment={comment} />))
      }
    </section>
  </>
);

Post.propTypes = { ownpost: PropTypes.objectOf(PropTypes.any).isRequired };

export default Post;
