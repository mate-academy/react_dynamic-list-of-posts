import React, { useState, useEffect } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { Posts, Comments } from '../../types/types';
import { getPostComments, getUserPosts, removeComment } from '../../api/api';

interface Props {
  selectedPostId: number
}

export const PostDetails: React.FC<Props> = ({ selectedPostId }) => {
  const [selectedPost, setSelectedPost] = useState<Posts>();
  const [comments, setComments] = useState<Comments[]>([]);
  const [visiblePosts, setVisiblePosts] = useState(false);
  const [resetComment, setresetComment] = useState(false);

  useEffect(() => {
    if (selectedPostId) {
      getUserPosts(`${selectedPostId}`)
        .then(post => {
          setSelectedPost(post);
        });
      getPostComments(`?postId=${selectedPostId}`)
        .then(comment => {
          setComments(comment);
        });
    } else {
      setSelectedPost(undefined);
      setComments([]);
    }
  }, [selectedPostId, resetComment]);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>
      {selectedPost && (
        <>
          <section className="PostDetails__post">
            <p>{selectedPost.body}</p>
          </section>

          <section className="PostDetails__comments">
            {comments.length !== 0 && (
              <button
                type="button"
                className="button"
                onClick={() => setVisiblePosts(post => !post)}
              >
                {visiblePosts ? 'Hide' : 'Show'}
                {' '}
                {comments.length}
                {' '}
                comments
              </button>
            )}
            {!visiblePosts && (
              <ul className="PostDetails__list">
                {comments.map(comment => (
                  <li className="PostDetails__list-item" key={comment.id}>
                    <button
                      type="button"
                      className="PostDetails__remove-button button"
                      onClick={() => {
                        removeComment(`${comment.id}`);
                        setresetComment(!resetComment);
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
                post={selectedPost}
                resetComent={() => setresetComment(!resetComment)}
              />
            </div>
          </section>
        </>
      )}
    </div>
  );
};
