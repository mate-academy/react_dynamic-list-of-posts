import React, { useEffect, useState } from 'react';
import { getPostComments } from '../../api/comments';
import { getPostDetails } from '../../api/posts';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

interface PostDetailsProps {
  selectedPostId: number;
}

export const PostDetails: React.FC<PostDetailsProps> = ({
  selectedPostId,
}) => {
  const [postDetails, setPostDetails] = useState<Post | null>(null);
  const [comments, setComments] = useState<CommentType[] | null>(null);

  const loadPostDetails = async () => {
    const receivedPostDetails = await getPostDetails(selectedPostId);

    setPostDetails(receivedPostDetails);
  };

  const loadComments = async () => {
    setComments(await getPostComments(selectedPostId));
  };

  useEffect(
    () => {
      loadPostDetails();
      loadComments();
    }, [selectedPostId],
  );

  return (
    <div className="PostDetails">
      <h2>{`Post details: #${postDetails?.id}`}</h2>

      <section className="PostDetails__post">
        <p>{`${postDetails?.body}`}</p>
      </section>

      <section className="PostDetails__comments">
        <button
          type="button"
          className="button"
          onClick={() => {}}
        >
          Hide comments
        </button>

        <ul className="PostDetails__list">
          {
            comments && (
              comments.map(comment => (
                <li className="PostDetails__list-item" key={comment.id}>
                  <button
                    type="button"
                    className="PostDetails__remove-button button"
                    onClick={() => { }}
                  >
                    X
                  </button>
                  <p>{comment.body}</p>
                </li>
              ))
            )
          }
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
