/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import {
  getPostsDetails,
  getComments,
  removeCommentById,
  addComment,
} from '../../api/posts';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

interface Props {
  selectedPostId: number;
}

export const PostDetails: React.FC<Props> = (props) => {
  const { selectedPostId } = props;
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isCommentVisible, setIsCommentVisible] = useState(false);

  useEffect(() => {
    (async () => {
      const postDetailsFromAPI = await getPostsDetails(selectedPostId);

      setSelectedPost(postDetailsFromAPI);
    })();

    (async () => {
      const postCommentsFromAPI = await getComments(selectedPostId);

      setComments(postCommentsFromAPI);
    })();
  }, [selectedPostId]);

  const removeComment = async (id: number) => {
    await removeCommentById(id);

    setComments((currentComments) => currentComments.filter(comment => comment.id !== id));
  };

  const addNewComment = async (comment: Partial<Comment>) => {
    const commentAPI = await addComment(comment);

    setComments((curComments) => [...curComments, commentAPI]);
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
          className="button"
          onClick={() => {
            setIsCommentVisible(prevState => !prevState);
          }}
        >
          {isCommentVisible ? 'Hide' : 'Show'}
        </button>

        {isCommentVisible && (
          <ul className="PostDetails__list">
            {comments.map(comment => (
              <li
                className="PostDetails__list-item"
                key={comment.id}
              >
                <button
                  onClick={() => removeComment(comment.id)}
                  type="button"
                  className="PostDetails__remove-button button"
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
            onAdd={addNewComment}
            selectedPostId={selectedPostId}
          />
        </div>
      </section>
    </div>
  );
};
