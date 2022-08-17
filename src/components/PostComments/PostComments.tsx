/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { deleteComment } from '../../api/comments';
import { getPostComments } from '../../api/posts';

interface Props {
  postId: number,
  showComments: boolean,
}

export const PostComments: React.FC<Props> = ({ postId, showComments }) => {
  const [comments, setComments] = useState<ServerComment[]>([]);

  useEffect(() => {
    async function fetchData() {
      const fetchedComments = await getPostComments(postId);

      setComments(fetchedComments);
    }

    fetchData();
  }, [comments]);

  if (!showComments) {
    return <div>Comments are hidden</div>;
  }

  return (
    <>
      {comments.length !== 0 ? (
        comments.map(comment => (
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
        ))
      ) : (
        <div>No comments</div>
      )}
    </>
  );
};
