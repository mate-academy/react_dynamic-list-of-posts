import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getPostComments } from '../../api/comments';
import { getPostDetails } from '../../api/posts';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

export const PostDetails = ({ selectedPostId }) => {
  const [openPost, setOpenPost] = useState({});
  const [openComments, setOpenComments] = useState([]);
  const [hiddenComments, setHiddenComments] = useState(true);

  useEffect(() => {
    const fetchData = async() => {
      const requestedPost = await getPostDetails(selectedPostId);

      setOpenPost(requestedPost);
    };

    fetchData();
  }, [selectedPostId]);

  useEffect(() => {
    const fetchData = async() => {
      const requestedComment = await getPostComments(openPost.id);

      setOpenComments(requestedComment);
    };

    fetchData();
  }, [openPost.id]);

  const showComments = () => {
    setHiddenComments(currentHidenComments => !currentHidenComments);
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>sunt aut facere repellat provident occaecati excepturi optio</p>
      </section>

      <section className="PostDetails__comments">
        {openComments.length === 0
          ? <p>No comments</p>
          : (
            <>
              <button
                type="button"
                className="button"
                onClick={showComments}
              >
                {hiddenComments
                  ? `Show ${openComments.length} comment(s)`
                  : `Hide ${openComments.length} comment(s)`
                }
              </button>

              {hiddenComments && (
                <ul className="PostDetails__list">
                  {openComments.map(comment => (
                    <li className="PostDetails__list-item" key={comment.id}>
                      <button
                        type="button"
                        className="PostDetails__remove-button button"
                      >
                        X
                      </button>
                      <p>{comment.body}</p>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            setOpenComments={setOpenComments}
            openPostId={openPost.id}
          />
        </div>
      </section>
    </div>
  );
};

PostDetails.propTypes = {
  selectedPostId: PropTypes.number.isRequired,
};
