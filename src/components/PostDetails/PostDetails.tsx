import React, { useState } from 'react';
import { ComentsPost, DetailsPost, NewPostBody } from '../../types/Post';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

type Props = {
  selectedPost: DetailsPost;
  postComments: ComentsPost[] | null;
  deleteComment: (postId: number) => void;
  postComment: (preparedData: NewPostBody) => void;
};

export const PostDetails: React.FC<Props> = ({
  selectedPost,
  postComments,
  deleteComment,
  postComment,
}) => {
  const [isShow, setIsShow] = useState(true);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>
      <section className="PostDetails__post">
        <p>{selectedPost.body}</p>
      </section>
      <section className="PostDetails__comments">
        {postComments && postComments?.length > 0 && (
          <button
            type="button"
            className="button"
            onClick={() => setIsShow(!isShow)}
          >
            {`${isShow ? 'Hide' : 'Show'} ${postComments?.length} comments`}
          </button>
        )}
        {isShow && (
          <ul className="PostDetails__list">
            {postComments && postComments.map(comment => (
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
            ))}
          </ul>
        )}
      </section>
      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm postComment={postComment} />
        </div>
      </section>
    </div>
  );
};
