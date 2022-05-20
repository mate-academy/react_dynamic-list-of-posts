import React, { useState } from 'react';
import { Comment } from '../../types/Comment';
import { Post } from '../../types/Post';

import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

type Props = {
  selectedPost: Post;
  selectedPostComments: Comment[] | null;
  deleteComment: (id: number) => Promise<void>;
  getComments: () => Promise<void>;
};

export const PostDetails: React.FC<Props> = React.memo(({
  selectedPost,
  selectedPostComments,
  deleteComment,
  getComments,
}) => {
  const [isCommentsVisible, setCommentsVisible] = useState(true);

  return (
    <div
      className="PostDetails"
      data-cy="postDetails"
    >
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>
          {selectedPost.body}
        </p>
      </section>

      {selectedPostComments && (
        <section className="PostDetails__comments">
          <button
            type="button"
            className="button"
            onClick={() => setCommentsVisible(!isCommentsVisible)}
          >
            {`${isCommentsVisible ? ('Hide') : ('Show')} ${selectedPostComments.length} comments`}
          </button>

          <ul className="PostDetails__list">
            {isCommentsVisible && (
              selectedPostComments.map(comment => (
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
                  <p>
                    {comment.body}
                  </p>
                </li>
              ))
            )}

          </ul>
        </section>
      )}

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            postId={selectedPost.id}
            getComments={getComments}
          />
        </div>
      </section>
    </div>
  );
});
