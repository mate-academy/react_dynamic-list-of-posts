import React, { useState, useEffect } from 'react';

import './PostDetails.scss';

import { addComment, deleteComment, getPostComments } from '../../api/comments';
import { getPostDetails } from '../../api/posts';
import { Comment } from '../../types/comment';
import { Post } from '../../types/post';

import { NewCommentForm } from '../NewCommentForm';

type Props = {
  selectedPostId: number,
};

export const PostDetails: React.FC<Props> = ({ selectedPostId }) => {
  const [details, setDetails] = useState<Post>({} as Post);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentsToggler, setCommentsToggler] = useState(true);

  useEffect(() => {
    getPostDetails(selectedPostId)
      .then(detailsFromServer => {
        setDetails(detailsFromServer);
      });
    getPostComments(selectedPostId)
      .then(commentsFromServer => setComments([...commentsFromServer]));
  }, [selectedPostId]);

  const removeComment = (id: number) => {
    deleteComment(id)
      .then(() => getPostComments(selectedPostId))
      .then(updateComments => setComments(updateComments));
  };

  const addNewComment = (newComment: Partial<Comment>) => {
    addComment(newComment)
      .then(() => getPostComments(selectedPostId))
      .then(updateComments => setComments(updateComments));
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{details.body}</p>
      </section>

      <section className="PostDetails__comments">
        <button
          type="button"
          className="button"
          onClick={() => setCommentsToggler(current => !current)}
        >
          {commentsToggler ? ('Hide comments') : ('Show comments') }
        </button>

        <ul className="PostDetails__list">
          {commentsToggler && comments.map(comment => (
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
          ))}
        </ul>
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            postId={selectedPostId}
            addComment={addNewComment}
          />
        </div>
      </section>
    </div>
  );
};
