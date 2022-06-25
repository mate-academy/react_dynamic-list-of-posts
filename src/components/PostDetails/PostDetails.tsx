import React, { useCallback, useEffect, useState } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { Post } from '../../types/Post';
import { Comment } from '../../types/Comment';
import { getPostDetails } from '../../api/posts';
import { getPostComments } from '../../api/comments';
import { removeFromServer } from '../../api/BA';

type Props = {
  selectedPostId: number
};

export const PostDetails: React.FC<Props> = ({ selectedPostId }) => {
  const [selectedPost, setSelectedPost] = useState<Post>();
  const [postComments, setPostComments] = useState<Comment[]>([]);
  const [visibleComments, setVisibleComments] = useState<boolean>(false);

  const newListComments = useCallback(() => {
    getPostComments(selectedPostId)
      .then(res => setPostComments(res));
  }, [selectedPostId]);

  const removeComment = useCallback((element) => {
    removeFromServer(`/comments/${element.id}`)
      .then(() => newListComments());
  }, [selectedPostId]);

  useEffect(() => {
    getPostDetails(selectedPostId)
      .then(res => setSelectedPost(res));
  }, [selectedPostId]);

  useEffect(() => {
    newListComments();
  }, [selectedPostId]);

  const changeVisibleComments = (event: React.MouseEvent<Element>) => {
    const target = event.target as HTMLButtonElement;

    if (visibleComments) {
      target.innerText = `Show ${postComments.length} comments`;
      setVisibleComments(prev => !prev);
    } else {
      target.innerText = ` Hide ${postComments.length} comments`;
      setVisibleComments(prev => !prev);
    }
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>
      <section className="PostDetails__post">
        <p>{selectedPost?.body}</p>
      </section>
      <section className="PostDetails__comments">
        <button
          type="button"
          className="PostDetails__button button"
          disabled={postComments.length === 0}
          onClick={(e) => {
            changeVisibleComments(e);
          }}
        >
          {` Show ${postComments.length} comments`}
        </button>
        {visibleComments
        && (
          <ul className="PostDetails__list">
            {postComments.map(el => (
              <li
                className="PostDetails__list-item"
                key={el.id}
              >
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={() => {
                    removeComment(el);
                  }}
                >
                  X
                </button>
                <p>{el.body}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm postId={selectedPost?.id} newListComments={newListComments} />
        </div>
      </section>
    </div>
  );
};
