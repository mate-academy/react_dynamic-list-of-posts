import React, { useEffect, useState } from 'react';
import { getPostComments } from '../../api/comments';
import { getPostDetails } from '../../api/posts';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

type Props = {
  selectedPostId: number;
  // filteredPost: Post | null;
};

export const PostDetails: React.FC<Props> = ({
  selectedPostId,
  // filteredPost,
}) => {
  const [postDetails, setPostDetails] = useState<Post | null>(null);
  const [postComments, setPostComments] = useState<Comment[]>([]);

  const loadPostDetails = async () => {
    try {
      let postDetailsFromServer;

      if (selectedPostId) {
        postDetailsFromServer = await getPostDetails(selectedPostId);
      }

      setPostDetails(postDetailsFromServer);
    } catch {
      setPostDetails(null);
    }
  };

  useEffect(
    () => {
      loadPostDetails();
    },
    [selectedPostId],
  );

  const loadPostComments = async () => {
    try {
      const commentsFromServer = await getPostComments(selectedPostId);

      setPostComments(commentsFromServer);
    } catch {
      setPostComments([]);
    }
  };

  useEffect(
    () => {
      loadPostComments();
    },
    [selectedPostId],
  );

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      {postDetails && (
        <>
          <section className="PostDetails__post">
            <p>{postDetails.title}</p>
          </section>

          <section className="PostDetails__comments">
            <button type="button" className="button">
              {`Hide ${postComments.length} comments`}
            </button>

            <ul className="PostDetails__list">
              {postComments.map((comment: Comment) => (
                <li
                  key={comment.id}
                  className="PostDetails__list-item"
                >
                  <button
                    type="button"
                    className="PostDetails__remove-button button"
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
              <NewCommentForm />
            </div>
          </section>
        </>
      )}

    </div>
  );
};
