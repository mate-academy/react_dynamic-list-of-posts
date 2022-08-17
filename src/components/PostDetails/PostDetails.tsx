import React, { useState } from 'react';
import { Loader } from '../Loader';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

type Props = {
  postComments: Comment[];
  postDetails: Post;
};

// can't import from react-app-env.ts
type Comment = {
  id: string;
  postId: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  email: string;
  body: string;
};

export const PostDetails: React.FC<Props> = ({
  postComments,
  postDetails,
}) => {
  const [showComments, setShowComments] = useState(true);

  const counterComments = postComments.length;
  const showLoaderForTitlePost = !postDetails.title;
  const showLoaderForComments = !postComments;

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        { showLoaderForTitlePost
          && <Loader /> }

        <p>{postDetails.title}</p>
      </section>

      <section className="PostDetails__comments">
        { showLoaderForComments
          && <Loader /> }

        <button
          type="button"
          className="PostDetails__button button"
          onClick={() => setShowComments(!showComments)}
        >
          { showComments
            ? `Hide ${counterComments} comments`
            : 'Show comments' }
        </button>

        { showComments && (
          <ul
            className="PostDetails__list"
            data-cy="postList"
          >
            {postComments.map((comment: Comment) => (
              <li
                key={comment.id}
                className="PostDetails__list-item"
              >
                <button
                  type="button"
                  className="PostDetails__remove-button button"
                  formMethod="DELETE"
                >
                  X
                </button>
                <p>
                  {comment.body}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            postId={postDetails.id}
          />
        </div>
      </section>
    </div>
  );
};
