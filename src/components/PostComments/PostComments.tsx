/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { getPostComments } from '../../api/posts';

interface Props {
  postId: number | null,
}

export const PostComments: React.FC<Props> = ({ postId }) => {
  const [comments, setComments] = useState<ServerComment[]>([]);

  useEffect(() => {
    (async function fetchData() {
      const fetchedComments = await getPostComments(postId);

      setComments(fetchedComments);
    }());
  }, [comments]);

  const handleClick = (commentId: number) => {
    const COMMENT_URL = `https://mate.academy/students-api/comments/${commentId}`;

    console.log(COMMENT_URL);

    fetch(COMMENT_URL, { method: 'DELETE' });
  };

  return (
    <>
      {comments.length !== 0 ? (
        comments.map(comment => (
          <li key={comment.id} className="PostDetails__list-item">
            <button
              type="button"
              className="PostDetails__remove-button button"
              onClick={() => handleClick(comment.id)}
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
