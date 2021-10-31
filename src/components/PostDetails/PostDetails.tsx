import React, { useEffect, useState } from 'react';
import { getPostComments, deletePostComments } from '../../api/comments';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

type Props = {
  post: Post,
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<CommentList[]>([]);
  const [hideComment, sethideComment] = useState<boolean>(true);

  useEffect(() => {
    getPostComments(post.id)
      .then(responseComments => setComments(responseComments));
  }, [comments]);

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
          onClick={() => sethideComment(!hideComment)}
        >
          Hide
          {' '}
          {comments.length}
          {' '}
          comments
        </button>
        {hideComment && (
          <ul className="PostDetails__list">
            {comments.map(comment => (
              <li
                className="PostDetails__list-item"
                key={comment.id}
              >
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={() => deletePostComments(comment.id)}
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
          <NewCommentForm postId={post.id} />
        </div>
      </section>
    </div>
  );
};
