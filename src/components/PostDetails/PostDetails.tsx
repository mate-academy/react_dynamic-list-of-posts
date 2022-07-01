import React, { useEffect, useState } from 'react';
import { getPostDetails } from '../../api/posts';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

interface Props {
  selectedPostId: number;
}

export const PostDetails: React.FC<Props> = ({ selectedPostId }) => {
  const [postDetails, setPostDetails] = useState<Post>();

  const loadPostDetails = async () => {
    const postsFromServer = await getPostDetails(selectedPostId);

    setPostDetails(postsFromServer);
  };

  useEffect(() => {
    if (selectedPostId) {
      loadPostDetails();
    }
  }, [postDetails]);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>sunt aut facere repellat provident occaecati excepturi optio</p>
      </section>

      <section className="PostDetails__comments">
        <button type="button" className="button">Hide 2 comments</button>

        <ul className="PostDetails__list">
          <li className="PostDetails__list-item">
            <button
              type="button"
              className="PostDetails__remove-button button"
            >
              X
            </button>
            <p>My first comment</p>
          </li>

          <li className="PostDetails__list-item">
            <button
              type="button"
              className="PostDetails__remove-button button"
            >
              X
            </button>
            <p>sad sds dfsadf asdf asdf</p>
          </li>
        </ul>
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm />
        </div>
      </section>
    </div>
  );
};
