import React, { useState, useEffect } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import { Comment } from '../../types/Comment';
import { Post } from '../../types/Post';
import './PostDetails.scss';
import { getPostDetails } from '../../api/post';
import { getPostComments, setCreateComment, deleteComment } from '../../api/comments';
import { Loader } from '../Loader/index';

type Props = {
  selectedPostId: number,
};

export const PostDetails: React.FC<Props> = ({ selectedPostId }) => {
  const [postDetails, setPostDetails] = useState<Post | null>(null);
  const [postComments, setPostComments] = useState<Comment[] | []>([]);
  const [hideComments, setHideComments] = useState(false);

  useEffect(() => {
    getPostDetails(selectedPostId)
      .then(res => setPostDetails(res));

    getPostComments(selectedPostId)
      .then(res => setPostComments([...res]));
  }, [selectedPostId]);

  const getHide = () => {
    return hideComments ? setHideComments(false) : setHideComments(true);
  };

  const removeComment = (id: number) => {
    deleteComment(id)
      .then(() => {
        getPostComments(selectedPostId).then(updateComments => setPostComments(updateComments));
      });
  };

  const addNewComment = (newComment: Partial<Comment>) => {
    return setCreateComment(newComment)
      .then(() => {
        getPostComments(selectedPostId).then(updateComments => setPostComments(updateComments));
      });
  };

  return (
    selectedPostId ? (
      <div className="PostDetails">
        <h2>Post details:</h2>

        <section className="PostDetails__post">
          <p>
            {postDetails?.body}
          </p>
        </section>

        <section className="PostDetails__comments">
          <button
            type="button"
            className="button PostDetails__hide-button"
            onClick={getHide}
          >
            {hideComments ? 'Show comments' : 'Hide comments'}
          </button>

          <ul className="PostDetails__list">
            {!hideComments && (
              postComments.map(comment => (
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
                  <p>{comment.body}</p>
                </li>
              ))
            )}
          </ul>
        </section>

        <section>
          <div className="PostDetails__form-wrapper">
            <NewCommentForm
              addNewComment={addNewComment}
              selectedPostId={selectedPostId}
            />
          </div>
        </section>
      </div>
    ) : (
      <Loader />
    )
  );
};
