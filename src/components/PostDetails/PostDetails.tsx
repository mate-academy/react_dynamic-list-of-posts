import React, { useEffect, useState } from 'react';
import { deleteComment, getPostComments } from '../../api/comments';
import { getPostDetails } from '../../api/posts';
import { Loader } from '../Loader';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

type Props = {
  selectedPostId: string,
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
  selectedPostId,
}) => {
  // eslint-disable-next-line no-console
  console.log('render PostDetails');

  const [postComments, setPostComments] = useState([]);
  const [postDetails, setPostDetails] = useState(initialPostDetails);
  const [showComments, setShowComments] = useState(true);
  const [showLoaderPostsDetails, setShowLoaderPostsDetails] = useState(false);

  const counterComments = postComments.length;

  const loadData = async () => {
    setShowLoaderPostsDetails(true);

    // eslint-disable-next-line no-console
    console.log('selectedPostId =', selectedPostId);

    try {
      const [comments, newPostDetails] = await Promise.all([
        getPostComments(selectedPostId),
        getPostDetails(selectedPostId),
      ]);

      setPostComments(comments);
      setPostDetails(newPostDetails);
      setShowLoaderPostsDetails(false);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('error', error);

      setShowLoaderPostsDetails(false);
    }
  };

  useEffect(() => {
    if (selectedPostId) {
      // eslint-disable-next-line no-console
      console.log('mounted new comment by postId = ', selectedPostId);

      loadData();
    }
  },
  [
    selectedPostId,
  ]);

  const onDeleteButton = (commentId: string) => {
    deleteComment(commentId).then((response) => {
      // eslint-disable-next-line no-console
      console.log(response, 'loadData');

      loadData();
    });
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      {showLoaderPostsDetails ? (
        <Loader />
      ) : (
        <>
          <section className="PostDetails__post">
            <p>{`${selectedPostId} : ${postDetails.title} : ${postDetails.id}`}</p>
          </section>

          <section className="PostDetails__comments">
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
                      onClick={() => onDeleteButton(comment.id)}
                    >
                      X
                    </button>
                    <p>
                      {comment.id}
                      {comment.body}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </>
      )}

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            selectedPostId={selectedPostId}
            loadData={loadData}
          />
        </div>
      </section>
    </div>
  );
};
