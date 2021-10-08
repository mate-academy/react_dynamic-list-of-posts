import React, { useState, useEffect } from 'react';
import { Loader } from '../Loader';
import { NewCommentForm } from '../NewCommentForm';
import { getPostsDetails } from '../../api/posts';
import { getPostComments, addComment, deleteComment } from '../../api/comments';
import './PostDetails.scss';

type Props = {
  selectPostId: number;
};

export const PostDetails: React.FC<Props> = (props) => {
  const { selectPostId } = props;
  const [posts, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isVisible, setVisible] = useState(true);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    getPostsDetails(selectPostId)
      .then(response => {
        setPost(response);
        setLoader(false);
      });
    getPostComments(selectPostId)
      .then(response => {
        setComments(response);
        setLoader(false);
      });
  }, [selectPostId]);

  const addNewComment = (newComment: Comment) => {
    addComment(newComment)
      .then(() => getPostComments(selectPostId))
      .then(response => setComments(response));
  };

  const removeComment = (id: number) => {
    deleteComment(id)
      .then(() => getPostComments(selectPostId))
      .then(response => setComments(response));
  };

  const handleChange = () => {
    setVisible(!isVisible);
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      {loader && (
        <Loader />
      )}

      <section className="PostDetails__post">
        <p>{posts?.body}</p>
      </section>

      <section className="PostDetails__comments">
        <button
          type="button"
          className="button"
          onClick={handleChange}
        >
          {
            isVisible
              ? `Hide ${comments.length} coments`
              : `Show ${comments.length} coments`
          }
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
            selectPostId={selectPostId}
            addNewComment={addNewComment}
          />
        </div>
      </section>
    </div>
  );
};
