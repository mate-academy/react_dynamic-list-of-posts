import React, { useEffect, useState } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import { getPostComments, removeComment } from '../../api/comments';
import './PostDetails.scss';
import { PostShape } from '../../shapes/PostShape';

export const PostDetails = ({ post }) => {
  const [comments, setComments] = useState([]);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    fetchData();
  }, [post.id]);

  async function fetchData() {
    const commentsFromServer = await getPostComments(post.id);

    setComments(commentsFromServer);
  }

  const handleHidden = () => {
    setHidden(current => !current);
  };

  const handleDelete = async(commentId) => {
    await removeComment(commentId);

    fetchData(post.id);
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{post.body}</p>
      </section>

      <section className="PostDetails__comments">
        <button
          type="button"
          className="button"
          onClick={handleHidden}
        >
          Hide&nbsp;
          {comments.length}
          &nbsp;comments
        </button>

        <ul className="PostDetails__list" hidden={hidden}>
          {comments.map(comment => (
            <li
              className="PostDetails__list-item"
              key={comment.id}
            >
              <button
                type="button"
                className="PostDetails__remove-button button"
                onClick={() => handleDelete(comment.id)}
              >
                X
              </button>
              <p>{comment.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            postId={post.id}
            getComments={() => fetchData(post.id)}
          />
        </div>
      </section>
    </div>
  );
};

PostDetails.propTypes = {
  post: PostShape.isRequired,
};
