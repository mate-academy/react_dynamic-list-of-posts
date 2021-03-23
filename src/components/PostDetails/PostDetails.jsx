import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { NewCommentForm } from '../NewCommentForm';
import { Comment } from '../Comment';
import { Loader } from '../Loader';
import { getPostDetails } from '../../api/posts';
import { getPostComments } from '../../api/comments';

import './PostDetails.scss';

export function PostDetails({
  selectedPostId,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [postDetail, setPostDetail] = useState(null);
  const [postComment, setPostComment] = useState(null);

  const setVisibility = useCallback(() => setIsVisible(!isVisible), []);
  const updateComments = useCallback(setPostComment, []);

  useEffect(() => {
    setIsLoading(true);
    async function fetchData() {
      const [detailsData, commentsData] = await Promise.all([
        getPostDetails(selectedPostId),
        getPostComments(selectedPostId),
      ]);

      setPostDetail(detailsData);
      setPostComment(commentsData);
      setIsLoading(false);
    }

    fetchData();
  }, [selectedPostId]);

  return (
    <div className="PostDetails">
      {(isLoading && !!selectedPostId) && <Loader />}
      {
        (postDetail && (
        <>
          <h2>Post details:</h2>

          <section className="PostDetails__post">
            <p>{postDetail.title}</p>
          </section>

          <section className="PostDetails__comments">
            <button
              type="button"
              className="button"
              onClick={setVisibility}
            >
              {`Hide ${postComment && postComment.length} comments`}
            </button>

            <ul
              className="PostDetails__list"
              hidden={isVisible}
            >
              {postComment && postComment.map(comment => (
                <Comment
                  key={comment.id}
                  comment={comment}
                  selectedPostId={selectedPostId}
                  onUpdateComments={updateComments}
                />
              ))}
            </ul>
          </section>

          <section>
            <div className="PostDetails__form-wrapper">
              <NewCommentForm
                postId={selectedPostId}
                onUpdateComments={updateComments}
                selectedPostId={selectedPostId}
              />
            </div>
          </section>
        </>
        ))
      }
    </div>
  );
}

PostDetails.propTypes = {
  selectedPostId: PropTypes.number.isRequired,
};
