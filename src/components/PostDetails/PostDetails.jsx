import React, { useEffect, useState } from 'react';
import { PostType } from '../../types';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import {
  deleteCommentFromServer,
  getPostComments,
  postNewComment,
} from '../../api/comments';

export const PostDetails = ({ post }) => {
  const [comments, setComments] = useState([]);
  const [commentsVisible, setCommentsVisible] = useState(true);

  useEffect(() => {
    if (post) {
      getPostComments(post.id)
        .then(commentsFromServer => setComments(commentsFromServer));
    }
  }, [post]);

  const deleteComment = (commentId) => {
    deleteCommentFromServer(commentId)
      .then(() => getPostComments(post.id))
      .then(commentsFromServer => setComments(commentsFromServer));
  };

  const addComment = (
    name,
    email,
    comment,
  ) => {
    const newComment = {
      postId: post.id,
      name,
      email,
      body: comment,
    };

    postNewComment(newComment)
      .then(() => getPostComments(post.id))
      .then(commentsFromServer => setComments(commentsFromServer));
  };

  return post && (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>
          {post.body}
        </p>
      </section>

      <section className="PostDetails__comments">
        <button
          type="button"
          className="button"
          onClick={() => setCommentsVisible(prevState => !prevState)}
        >
          {
            commentsVisible
              ? `Hide ${comments.length} comments`
              : `Show ${comments.length} comments`
          }
        </button>

        {
          commentsVisible
        && (
        <ul className="PostDetails__list">
          {comments.map(comment => (
            <li
              key={comment.id}
              className="PostDetails__list-item"
            >
              <button
                type="button"
                className="PostDetails__remove-button button"
                onClick={() => deleteComment(comment.id)}
              >
                X
              </button>
              <p>{comment.body}</p>
            </li>
          ))}
        </ul>
        )
}
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            addComment={addComment}
          />
        </div>
      </section>
    </div>
  );
};

PostDetails.defaultProps = {
  post: {},
};

PostDetails.propTypes = {
  post: PostType,
};
