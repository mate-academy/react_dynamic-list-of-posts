import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useEffect } from 'react';
import { getPostDetails } from '../../api/posts';
import { getPostComments } from '../../api/coments';
import { removeCommentFromServer } from '../../api/coments';
import { Loader } from '../Loader';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

export const PostDetails = ({ selectedPostId }) => {
  const [postDetail, setPostDetail] = useState('');
  const [postComments, setPostComments] = useState('');
  const [visibleComments, setVisibleComments] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingComments, setLoadComments] = useState('');

  const loadComments = () => (
    getPostComments(selectedPostId)
      .then(response => setPostComments(response))
  );

  useEffect(() => {
    setLoading(true);
    const loadData = async() => {
      await getPostDetails(selectedPostId)
        .then(response => setPostDetail(response));

      await loadComments();
      setLoading(false);
    };

    loadData();
  }, [selectedPostId]);

  const changeVisibleComments = () => {
    setVisibleComments(!visibleComments);
  };

  const removeComment = async({ target }) => {
    setLoadComments(true);
    await removeCommentFromServer(target.dataset.commentid);
    await loadComments();
    setLoadComments(false);
  };

  if (loading) {
    return <Loader />
  }

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{postDetail && postDetail.body}</p>
      </section>

      {loadingComments
        ? (
          <Loader />
        ) : (
          <section className="PostDetails__comments">
            {postComments && postComments.length
              ? (
                <button
                  type="button"
                  className="button"
                  onClick={changeVisibleComments}
                >
                  {visibleComments ? 'Hide' : 'Show'}
                  {` - ${postComments.length} - `}
                  comments
                </button>
              ) : (
                <h4>no comments</h4>
              )}

            <ul className="PostDetails__list">
              {(postComments && visibleComments)
              && postComments.map(comment => (
                <li className="PostDetails__list-item" key={comment.id}>
                  <button
                    type="button"
                    className="PostDetails__remove-button button"
                    data-commentid={comment.id}
                    onClick={removeComment}
                  >
                    X
                  </button>
                  <p>{comment.body}</p>
                </li>
              ))}
            </ul>
          </section>
        )}

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            setLoadComments={setLoadComments}
            postId={selectedPostId}
            loadComments={loadComments}
          />
        </div>
      </section>
    </div>
  );
};

PostDetails.propTypes = {
  selectedPostId: PropTypes.number.isRequired,
};
