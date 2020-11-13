import React, { useState, useEffect } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { getPostDetails } from '../../api/posts';
import { deleteComment } from '../../api/comments';

export const PostDetails = React.memo(
// eslint-disable-next-line react/prop-types
  ({ postId, comments, handleUpdateComments }) => {
    const [post, setPost] = useState(null);
    const [visibleComments, setVisibleComments] = useState(true);

    // eslint-disable-next-line no-console
    console.log('PostDetails');

    useEffect(() => {
      const fetchData = async() => {
        const postFromServer = await getPostDetails(postId);

        setPost(postFromServer);
      };

      fetchData();
    }, [postId]);

    const removeComment = async(id) => {
      await deleteComment(id);

      handleUpdateComments();
    };

    if (!post) {
      return null;
    }

    return (
      <div className="PostDetails">
        <h2>Post details:</h2>

        <section className="PostDetails__post">
          <p>{post.title}</p>
        </section>

        <section className="PostDetails__comments">
          {/* eslint-disable-next-line react/prop-types */}
          {comments.length
            ? (
              <button
                type="button"
                className="button"
                onClick={() => setVisibleComments(prevState => !prevState)}
              >

                {`${visibleComments
                  ? 'Hide'
                  // eslint-disable-next-line react/prop-types
                  : 'Show'} ${comments.length} comments`}
              </button>
            ) : ''}
          {visibleComments && (
            <ul className="PostDetails__list">
              {/* eslint-disable-next-line react/prop-types */}
              {comments.map(comment => (
                <li key={comment.id} className="PostDetails__list-item">
                  <button
                    type="button"
                    className="PostDetails__remove-button button"
                    onClick={() => removeComment(comment.id)}
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
            <NewCommentForm />
          </div>
        </section>
      </div>
    );
  },
);
