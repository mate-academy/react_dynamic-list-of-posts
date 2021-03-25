import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { getDateilPosts, getComments } from '../../api/api';
import { Loader } from '../Loader/Loader';
import { Comments } from '../Comments/Comments';

export const PostDetails = ({ selectedPost }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDisable, setIsDiseble] = useState(true);
  const [details, setDetails] = useState(null);
  const [comment, setComment] = useState(null);

  const onDisable = () => setIsDiseble(!isDisable);
  const editComment = useCallback(setComment, []);

  useEffect(() => {
    setIsLoading(true);
    const getPostDetailsData = async() => {
      const [detailsData, commentData] = await Promise.all([
        getDateilPosts(selectedPost),
        getComments(selectedPost),
      ]);

      setDetails(detailsData);
      setComment(commentData);
      setIsLoading(false);
    };

    getPostDetailsData();
  }, [selectedPost]);

  return (
    <div className="PostDetails">
      {(isLoading && selectedPost) && <Loader />}
      {details && (
        <>
          <h2>Post details:</h2>

          <section className="PostDetails__post">
            <p>{details.title}</p>
          </section>

          <section className="PostDetails__comments">
            <button
              type="button"
              className="button"
              onClick={onDisable}
            >
              {`Hide ${comment && comment.length} comments`}
            </button>

            <ul
              className="PostDetails__list"
              hidden={isDisable}
            >
              {comment && comment.map(item => (
                <Comments
                  key={item.id}
                  comment={item}
                  selectedPost={selectedPost}
                  editComment={editComment}
                />
              ))}
            </ul>
          </section>

          <section>
            <div className="PostDetails__form-wrapper">
              <NewCommentForm
                selectedPost={selectedPost}
                editComment={editComment}
              />
            </div>
          </section>
        </>
      )}
    </div>
  );
};

PostDetails.propTypes = {
  selectedPost: PropTypes.number.isRequired,
};
