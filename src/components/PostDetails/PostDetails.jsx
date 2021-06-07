import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { NewCommentForm } from '../NewCommentForm';
import { getPostDetails } from '../../api/posts';
import { getPostComments } from '../../api/comments';
import './PostDetails.scss';
import { post, remove } from '../../api/api';

export const PostDetails = ({ selectedPostId }) => {
  const [selectedPost, setSelectedPost] = useState({});
  const [selectedComments, setSelectedComments] = useState([]);
  const [commentsHide, setCommentsHide] = useState(false);

  const fetchPostData = useCallback(async() => {
    const postsDetails = await getPostDetails(selectedPostId);

    setSelectedPost(postsDetails);
  }, [selectedPostId]);

  useEffect(() => {
    fetchPostData();
  }, [fetchPostData]);

  useEffect(() => {
    getPostComments(selectedPostId)
      .then(result => setSelectedComments(result));
  }, [selectedPostId]);

  const addComment = (name, email, body) => {
    const comment = {
      name,
      email,
      body,
      postId: selectedPostId,
    };

    return post('/comments', comment)
      .then(response => response.json())
      .then(result => result.data)
      .then((res) => {
        setSelectedComments(list => [...list, res]);
      });
  };

  const deleteComment = id => remove(`/comments/${id}`)
    .then(() => {
      setSelectedComments(list => (
        list.filter(comment => comment.id !== id)
      ));
    });

  return (
    <div className="PostDetails">
      {selectedPost && (
        <>

          <h2>Post details:</h2>

          <section className="PostDetails__post">
            <p>{selectedPost && selectedPost.body}</p>
          </section>

          <section className="PostDetails__comments">
            {selectedComments.length !== 0 && (
            <button
              type="button"
              className="button"
              onClick={() => {
                setCommentsHide(!commentsHide);
              }}
            >
              {commentsHide
                ? `Show ${selectedComments.length} comments`
                : `Hide ${selectedComments.length} comments`
              }
            </button>
            )}

            {commentsHide || (
            <ul className="PostDetails__list">

              {selectedComments.map(comment => (
                <li key={comment.id} className="PostDetails__list-item">
                  <button
                    type="button"
                    className="PostDetails__remove-button button"
                    onClick={() => {
                      deleteComment(comment.id);
                    }}
                  >
                    X
                  </button>
                  <p>{comment.body}</p>
                </li>
              ))}

            </ul>
            )}

          </section>

          <section>
            <div className="PostDetails__form-wrapper">
              <NewCommentForm onAddComment={addComment} />
            </div>
          </section>

        </>
      )}
    </div>
  );
};

PostDetails.propTypes = {
  selectedPostId: PropTypes.number.isRequired,
};
