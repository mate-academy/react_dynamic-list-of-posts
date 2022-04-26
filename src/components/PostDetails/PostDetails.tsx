import React, { useState, useEffect } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import { getPostComments } from '../../api/comments';
import './PostDetails.scss';
import { remove, create } from '../../api/api';

type Props = {
  selectedPostId: number,
  selectedPost: Post,
};

export const PostDetails: React.FC<Props> = ({ selectedPostId, selectedPost }) => {
  const [comments, setComments] = useState<Comments[]>([]);
  const [visibleComments, setVaisibleComments] = useState(true);

  const loadComments = async () => {
    const commentsFromServer = await getPostComments(selectedPostId);

    setComments(commentsFromServer);
  };

  useEffect(() => {
    loadComments();
  }, [selectedPostId]);

  const showComments = () => {
    setVaisibleComments(!visibleComments);
  };

  const deleteComment = async (commentId: number) => {
    await remove(`/comments/${commentId}`);
    await loadComments();
  };

  const addNewComment = async (name: string, email: string, body: string) => {
    await create(selectedPostId, name, email, body);
    await loadComments();
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
          onClick={showComments}
        >
          {visibleComments ? (
            `Hide ${comments.length} comments`
          ) : (
            `Show ${comments.length} comments`
          )}
        </button>

        {visibleComments && (
          <ul className="PostDetails__list">
            {comments.map(comment => (
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
                <p>{comment.body}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm addNewComment={addNewComment} />
        </div>
      </section>
    </div>
  );
};
