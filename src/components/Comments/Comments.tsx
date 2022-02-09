import React, { useState, useEffect } from 'react';

import { getAllComments, addComment, deleteComment } from '../../api/comments';

import { NewCommentForm } from '../NewCommentForm';
import './Comments.scss';

type Props = {
  postId: number;
};

export const Comments: React.FC<Props> = ({ postId }) => {
  const [comments, setComments] = useState<PostComment[]>([]);

  const loadComments = () => {
    const fetchComments = async () => {
      const commentsFromServer = await getAllComments(postId);

      setComments(commentsFromServer);
    };

    fetchComments();
  };

  const addNewComment = async (title: string, email: string, body: string) => {
    await addComment(postId, title, email, body);
    await loadComments();
  };

  const deleteSelectedComment = async (commentId: number) => {
    await deleteComment(commentId);
    await loadComments();
  };

  useEffect(() => {
    loadComments();
  }, [postId]);

  return (
    <div>
      <section className="PostDetails__comments">
        <ul className="PostDetails__list">
          {comments.map(comment => (
            <li className="PostDetails__list-item">
              <button
                type="button"
                className="PostDetails__remove-button button"
                onClick={() => deleteSelectedComment(comment.id)}
              >
                X
              </button>
              <p>{comment.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm addComment={addNewComment} />
        </div>
      </section>
    </div>
  );
};
