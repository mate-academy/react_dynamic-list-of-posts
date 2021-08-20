import React, { useEffect, useState } from 'react';
import { PostType } from '../../types';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { getPostComments } from '../../api/comments';

export const PostDetails = ({ post }) => {
  const [comments, setComments] = useState([]);
  const [commentsVisible, setCommentsVisible] = useState(true);

  useEffect(() => {
    if (post) {
      getPostComments(post.id)
        .then(commentsFromServer => setComments(commentsFromServer))
    }
  }, [post]);

  const deleteComment = (commentId) => {
    const preparedComments = comments.filter(comment => (
      comment.id !== commentId
    ));

    setComments(preparedComments);
  };

  const addComment = (
    name,
    email,
    comment,
  ) => {
    const newComment = {
      id: comments.length + 1,
      postId: post.id,
      name,
      email,
      body: comment,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setComments([newComment, ...comments]);
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
  )
};

PostDetails.propTypes = {
  post: PostType,
};
