import React, { useEffect, useState } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import { getPostDetails } from '../../api/posts';
import { getPostComments, deleteComment, addComment } from '../../api/comments';
import './PostDetails.scss';

export const PostDetails = ({ selectedPostId }) => {
  const [selectedPost, setPost] = useState(0);
  const [comments, setComments] = useState([]);
  const [hideCom, setHide] = useState(true);

  useEffect(() => {
    getPostDetails(selectedPostId)
      .then(post => setPost(post.data));

    getPostComments(selectedPostId)
      .then(com => setComments(com.data));
  }, [selectedPostId]);

  const addNewCom = (comment) => {
    addComment(comment)
      .then((result) => {
        setComments(currentComment => [...currentComment, result]);
      });
  };

  const deleteCom = (id) => {
    deleteComment(id)
      .then(() => {
        setComments(currentComment => (
          currentComment.filter(comment => comment.id !== id)
        ));
      });
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{selectedPost.title}</p>
      </section>

      <section className="PostDetails__comments">
        <button
          type="button"
          className="button"
          onClick={() => {
            setHide(!hideCom);
          }}
        >
          {hideCom ? 'Show' : 'Hide'}
          {' '}
          {comments.length}
          {' '}
          comments
        </button>

        {!hideCom && (
          comments.length > 0 ? (
            <ul className="PostDetails__list">
              {comments.map(com => (
                <li
                  className="PostDetails__list-item"
                  key={com.id}
                >
                  <button
                    type="button"
                    className="PostDetails__remove-button button"
                    onClick={() => {
                      deleteCom(com.id);
                    }}
                  >
                    X
                  </button>
                  <p>{com.body}</p>
                </li>
              ))}
            </ul>
          ) : <h3>You will be the first to leave your comment</h3>
        )}
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            selectedPost={selectedPost}
            addNewCom={addNewCom}
          />
        </div>
      </section>
    </div>
  );
};
