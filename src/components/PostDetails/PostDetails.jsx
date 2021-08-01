import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Loader } from '../Loader/Loader';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { getUserPosts, removeComments } from '../../api/posts';

export const PostDetails = ({ selectedPostId }) => {
  const [posts, setPosts] = useState({});
  const [deleteOrAddWait, setDeleteOrAddWait] = useState(0);
  const [waitForComments, setWaitForComments] = useState(false);
  const [waitForPost, setWaitForPost] = useState(false);
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(true);

  useEffect(() => {
    if (selectedPostId !== 0) {
      setWaitForPost(true);
      setWaitForComments(true);
      getUserPosts(selectedPostId, '/posts/')
        .then(post => setPosts(post));
    }
  }, [selectedPostId]);

  useEffect(() => {
    (getUserPosts('', '/comments/'))
      .then((post) => {
        setComments(post.filter(x => x.postId === selectedPostId));
      });
  }, [comments]);

  useEffect(() => {
    (getUserPosts('', '/comments/'))
      .then((post) => {
        setComments(post.filter(x => x.postId === selectedPostId));
        setWaitForComments(false);
        setWaitForPost(false);
      });
  }, [selectedPostId, deleteOrAddWait]);

  return (
    <div className="PostDetails">
      {(selectedPostId !== 0) && (
        <>
          <h2>Post details:</h2>
          {
            waitForPost
              ? (<Loader />)
              : (
                <>
                  <section className="PostDetails__post">
                    <p>{posts.body}</p>
                  </section>
                  <section className="PostDetails__comments">
                    {
                      !waitForComments && (
                        <button
                          onClick={() => setShowComments(prev => !prev)}
                          type="button"
                          className="button"
                        >
                          {showComments && comments.length ? 'Hide' : 'Show'}
                          {` ${comments.length} `}
                          comments
                        </button>
                      )}
                    <ul className="PostDetails__list">
                      {!waitForComments ? comments.map(comment => (showComments
                        && (
                        <li
                          key={comment.id}
                          className="PostDetails__list-item"
                        >
                          <button
                            type="button"
                            className="PostDetails__remove-button button"
                            onClick={() => {
                              removeComments(comment.id);
                              setDeleteOrAddWait(prev => prev + 1);
                              setWaitForComments(true);
                            }}
                          >
                            X
                          </button>
                          <p>{comment.body}</p>
                        </li>
                        ))) : <Loader />}
                    </ul>
                  </section>
                  <section>
                    <div className="PostDetails__form-wrapper">
                      <NewCommentForm
                        setDeleteOrAddWait={setDeleteOrAddWait}
                        setWaitForComments={setWaitForComments}
                        selectedPostId={selectedPostId}
                      />
                    </div>
                  </section>
                </>
              )}
        </>
      )}
    </div>
  );
};

PostDetails.propTypes = {
  selectedPostId: PropTypes.number.isRequired,
};
