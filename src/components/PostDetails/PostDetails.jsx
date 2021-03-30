import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getDateilPosts, getComments } from '../../api/api';
import './PostDetails.scss';
import { Loader } from '../Loader/Loader';
import { Details } from '../Details/Details';

export const PostDetails = ({ selectedPost }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [details, setDetails] = useState(null);
  const [comment, setComment] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    (async() => {
      const [detailsData, commentData] = await Promise.all([
        getDateilPosts(selectedPost),
        getComments(selectedPost),
      ]);

      setDetails(detailsData);
      setComment(commentData);
      setIsLoading(false);
    })();
  }, [selectedPost]);

  return (
    <div className="PostDetails">
      {(isLoading && selectedPost) && <Loader />}
      {details && (
        <Details
          selectedPost={selectedPost}
          details={details}
          comment={comment}
          setComment={setComment}
        />
      )}
    </div>
  );
};

PostDetails.propTypes = {
  selectedPost: PropTypes.number.isRequired,
};
