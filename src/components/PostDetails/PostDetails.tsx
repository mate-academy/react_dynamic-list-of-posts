import React, { useState, useEffect } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { getPostComments, deleteComment } from '../../api/posts';
import { Post, NewComment } from '../../react-app-env';

interface Props {
  selectedPost: Post,
  selectedPostId: number,
}

export const PostDetails: React.FC<Props> = ({
  selectedPost,
  selectedPostId,
}) => {
  const [comments, setComments] = useState<NewComment[]>([]);
  const [commentsVisible, setCommentsVisible] = useState(true);

  useEffect(() => {
    getPostComments(selectedPostId)
      .then(response => setComments(response));
  }, [selectedPostId]);

  const handleDeleteButton = async (id: number) => {
    await deleteComment(id);
    const newComments = await getPostComments(selectedPostId);

    setComments(newComments);
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
            setCommentsVisible(status => !status);
          }}
        >
          {commentsVisible
            ? 'Hide comments'
            : 'Show comments' }
        </button>

        {commentsVisible && (
          <ul className="PostDetails__list">
            {comments.map(comment => (
              <li
                key={comment.id}
                className="PostDetails__list-item"
              >
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  onClick={() => {
                    handleDeleteButton(comment.id);
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
            selectedPostId={selectedPostId}
            setComments={setComments}
          />
        </div>
      </section>
    </div>
  );
};
