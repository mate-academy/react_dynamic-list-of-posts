import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { NewCommentForm } from '../NewCommentForm';
import { getPostComments, remove } from '../../api/posts';
import './PostDetails.scss';

export const PostDetails = ({
  posts,
  postID,
  comments,
  setComments,
  postComments,
}) => {
  const chosenPost = posts.find(post => post.id === postID);
  const [commentsShown, setCommentsShown] = useState(false);
  const show = postComments ? `Show ${postComments} comments` : 'no comments';
  const hide = postComments ? 'Hide comments' : 'no comments';

  const parsing = async() => {
    const newPosts = await getPostComments(postID);
    const newComments = await setComments(newPosts);

    return newComments;
  };

  useEffect(() => {
    getPostComments(postID).then(res => setComments(res));
  }, [postID]);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{chosenPost.title}</p>
      </section>

      <section className="PostDetails__comments">

        <button
          type="button"
          className="button"
          onClick={() => setCommentsShown(!commentsShown)}
          disabled={!postComments}
        >
          {commentsShown ? hide : show}
        </button>

        {commentsShown && (
          <ul className="PostDetails__list">
            {comments.map(comment => (
              <li key={comment.id} className="PostDetails__list-item">
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={async() => {
                    await remove(comment.id);
                    await parsing();
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
          <NewCommentForm
            parsing={parsing}
            postID={postID}
            comments={comments}
            getPostComments={getPostComments}
            setComments={setComments}
          />
        </div>
      </section>
    </div>
  );
};

PostDetails.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
  })).isRequired,
  postID: PropTypes.number.isRequired,
  setComments: PropTypes.func.isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  })).isRequired,
  postComments: PropTypes.number.isRequired,
};
