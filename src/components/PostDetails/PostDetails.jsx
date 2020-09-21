import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { PostComments } from '../PostComments';
import './PostDetails.scss';
import { getPostDetails } from '../../api/posts';

export const PostDetails = ({ selectPostId }) => {
  const [postById, setPostById] = useState(null);

  useEffect(() => {
    if (selectPostId === 0) {
      setPostById(null);
    } else {
      getPostDetails(selectPostId).then(result => setPostById(result));
    }
  }, [selectPostId]);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      {!postById || (
        <section className="PostDetails__post">
          <p className="PostDetails__title">{postById.title}</p>
          <PostComments selectPostId={selectPostId} />
        </section>
      )}

    </div>
  );
};

PostDetails.propTypes = {
  selectPostId: PropTypes.number.isRequired,
};
