import React, { useEffect, useState } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import { getAllComments, deleteComment } from '../../api/comments';
import { getPost } from '../../api/posts';
import './PostDetails.scss';

interface Props {
  selectedPostId: number,
}

export const PostDetails: React.FC<Props> = ({ selectedPostId }) => {
  const [comments, setComments] = useState<any>();
  const [post, setPost] = useState<any>();
  const [showComments, setShowComments] = useState(true);

  const setCommentsFromServer = () => {
    getAllComments(selectedPostId)
      .then(responce => setComments(responce));
  };

  useEffect(() => {
    getAllComments(selectedPostId)
      .then(responce => setComments(responce));

    getPost(selectedPostId)
      .then((responce) => setPost(responce));
  }, [selectedPostId, comments]);

  return (
    <div className="PostDetails">
      <h2>
        Post details:
        {selectedPostId}
      </h2>

      <section className="PostDetails__post">
        <p>{post && post.body}</p>
      </section>

      <section className="PostDetails__comments">
        {showComments && comments && comments.length !== 0 && (
          <>
            <button type="button" className="button" onClick={() => setShowComments(false)}>
              {'Hide '}
              {comments.length}
              {' comments'}
            </button>

            <ul className="PostDetails__list">
              {comments && comments.map((comment: any) => {
                return (
                  <li key={comment.id} className="PostDetails__list-item">
                    <button
                      type="button"
                      className="PostDetails__remove-button button"
                      onClick={() => deleteComment(comment.id)}
                    >
                      X
                    </button>
                    <p>{comment.body}</p>
                  </li>
                );
              })}
            </ul>
          </>
        )}
        {comments && comments.length !== 0 && !showComments && (
          <button type="button" className="button" onClick={() => setShowComments(true)}>
            {'Show '}
            {comments && comments.length}
            {' comments'}
          </button>
        )}
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            selectedPostId={selectedPostId}
            getAllComments={setCommentsFromServer}
          />
        </div>
      </section>
    </div>
  );
};
