import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { NewCommentForm } from '../NewCommentForm';
import { getPostDetails } from '../../api/posts';
import { getPostComments, removeComment, addComment } from '../../api/comments';
import { Loader } from '../Loader';
import './PostDetails.scss';

export const PostDetails = ({ selectedPostId }) => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentsShown, showComments] = useState(true);

  const getComments = async() => {
    const commentsToShow = await getPostComments(selectedPostId);

    setComments(commentsToShow);
  };

  const deleteComment = async(id) => {
    await removeComment(id);

    getComments();
  };

  const pushComment = async(comment) => {
    await addComment(comment);

    getComments();
  };

  useEffect(() => {
    const updatePost = async() => {
      const postToShow = await getPostDetails(selectedPostId);

      setPost(postToShow);
    };

    updatePost();
  }, [selectedPostId]);

  useEffect(() => {
    getComments();
  }, [selectedPostId]);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        {post ? <p>{post.body}</p>
          : <Loader />
        }
      </section>

      <section className="PostDetails__comments">
        <button
          type="button"
          className="button"
          onClick={() => showComments(!commentsShown)}
        >
          {commentsShown ? `Hide ${comments.length} comments`
            : `Show ${comments.length} comments`
          }
        </button>

        <ul className="PostDetails__list">
          {commentsShown ? comments.map(comment => (
            <li className="PostDetails__list-item" key={comment.id}>
              <button
                type="button"
                className="PostDetails__remove-button button"
                onClick={() => deleteComment(comment.id)}
              >
                X
              </button>
              <p>{comment.body}</p>
            </li>
          ))
            : <></>}
        </ul>
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            postId={post ? post.id : 0}
            addComment={pushComment}
          />
        </div>
      </section>
    </div>
  );
};

PostDetails.propTypes = {
  selectedPostId: PropTypes.number.isRequired,
};
