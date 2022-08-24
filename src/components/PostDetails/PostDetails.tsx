import React, { useEffect, useState } from 'react';
import { getPostComments } from '../../api/comments';
import { getPostDetails } from '../../api/posts';
import { Loader } from '../Loader';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

type Props = {
  currentUser: string;
  selectedPostId: string,
  // postComments: Comment[];
  // postDetails: Post;
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

const initialPostDetails = {
  id: '',
  userId: '',
  title: '',
  body: '',
  createdAt: '',
  updatedAt: '',
};

export const PostDetails: React.FC<Props> = ({
  currentUser,
  selectedPostId,
  // postComments,
  // postDetails,
}) => {
  const [postComments, setPostComments] = useState([]);
  const [postDetails, setPostDetails] = useState(initialPostDetails);

  const [showComments, setShowComments] = useState(true);

  const counterComments = postComments.length;
  // const showLoaderForTitlePost = !postDetails.title;
  const showLoaderForComments = !postComments;

  const loadData = async () => {
    // setShowLoaderPostsList(true);

    // eslint-disable-next-line no-console
    console.log('selectedPostId =', selectedPostId);
    // eslint-disable-next-line no-console
    console.log('currentUser = ', currentUser);

    try {
      // const comments = await getPostDetails(selectedPostId);
      const [comments, newPostDetails] = await Promise.all([
        getPostComments(selectedPostId),
        getPostDetails(currentUser),
      ]);

      setPostComments(comments);
      setPostDetails(newPostDetails);
      // setShowLoaderPostsList(false);
    } catch (error) {
      // setShowLoaderPostsList(false);
      // eslint-disable-next-line no-console
      console.log('error', error);
    }
  };

  useEffect(() => {
    if (selectedPostId) {
      // eslint-disable-next-line no-console
      console.log('mounted new comment by postId = ', selectedPostId);

      loadData();
    }
  },
  [currentUser, selectedPostId]);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        { postDetails.title ? (
          <Loader />
        ) : (
          <p>{postDetails.title}</p>
        )}
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
