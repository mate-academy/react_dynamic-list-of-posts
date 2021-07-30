import React, { useState, useEffect }from 'react';
import { NewCommentForm } from '../NewCommentForm';
import { Loader } from '../Loader';
import { getPostComments, removeComment } from '../../api/comments';
import { postType } from '../../types';
import './PostDetails.scss';

export const PostDetails = ({ post }) => {
  const [comments, setComments] = useState(null);
  const [isCommentsVisible, setCommentVisibilitty] = useState(true);
  const changeCommentsVisibility = () => {
    setCommentVisibilitty(prevState => !prevState)
  }

  const getComments = () => {
    (async() => setComments(await getPostComments(post.id)))()
  }

  const deleteComment = async(id) => {
    setComments(null);
    await removeComment(id);
    getComments();
  }

  useEffect(() => {
    setComments(null);
    (async() => setComments(await getPostComments(post.id)))()
  },[post])

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>
  
      <section className="PostDetails__post">
        <p>{post.body}</p>
      </section>
  
      {!comments
        ? <Loader />
        : <section className="PostDetails__comments">
          {
          !!comments.length
            && <button
              type="button"
              className="button"
              onClick={changeCommentsVisibility}
            >
              {
                isCommentsVisible
                  ? `Hide ${comments.length} comments`
                  : `Show ${comments.length} comments`
              }
            </button>
          }
          {isCommentsVisible
            && <ul className="PostDetails__list">
            {comments.map(comment => (
              <li
                className="PostDetails__list-item"
                key={comment.id}
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
          }
        </section>
      }
      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            postId={post.id}
            loadComments={getComments}
            clearComments={setComments}
          />
        </div>
      </section>
    </div>
  );
}

PostDetails.propTypes = {
  post: postType,
}
