import React, { useEffect, useState } from 'react';
import { addComment, deleteComment, getPostComments } from '../../api/comments';
import { getPostDetails } from '../../api/posts';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

type Props = {
  selectedPostId: number;
};

export const PostDetails: React.FC<Props> = ({ selectedPostId }) => {
  const [posts, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isVisible, setVisible] = useState(true);

  useEffect(() => {
    getPostDetails(selectedPostId)
      .then(setPost);
    getPostComments(selectedPostId)
      .then(setComments);
  }, [selectedPostId]);

  const addNewComment = async (newComment: Comment) => {
    await addComment(newComment);
    const updateCommentList = await getPostComments(selectedPostId);

    setComments(updateCommentList);
  };

  const removeComment = async (id: number) => {
    await deleteComment(id);
    const updateCommentList = await getPostComments(selectedPostId);

    setComments(updateCommentList);
  };

  const handleHideComment = () => {
    setVisible(!isVisible);
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{posts?.body}</p>
      </section>

      <section className="PostDetails__comments">
        <button
          type="button"
          className="button"
          onClick={handleHideComment}
        >
          {isVisible
            ? `Hide ${comments.length} comments`
            : `Show ${comments.length} comments`}
        </button>

        <ul className="PostDetails__list">
          {isVisible && (
            <>
              {comments.map(comment => (
                <li
                  className="PostDetails__list-item"
                  key={comment.id}
                >
                  <button
                    type="button"
                    className="PostDetails__remove-button button"
                    onClick={() => removeComment(comment.id)}
                  >
                    X
                  </button>
                  <p>
                    {comment.body}
                  </p>
                </li>
              ))}
            </>
          )}
        </ul>
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            postId={selectedPostId}
            addNewComment={addNewComment}
          />
        </div>
      </section>
    </div>
  );
};
