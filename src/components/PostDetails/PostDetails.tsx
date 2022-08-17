import React, { useState, useEffect } from 'react';

import { getPostDetails } from '../../api/posts';

import { Comments } from '../Comments';

import './PostDetails.scss';

type Props = {
  postId: number;
};

export const PostDetails: React.FC<Props> = ({ postId }) => {
  const [postDetails, setPostDetails] = useState<Post | null>(null);
  const [showComments, setShowComments] = useState(true);

  useEffect(() => {
    const fetchPostDetails = async () => {
      const postFromServer = await getPostDetails(postId);

      setPostDetails(postFromServer);
    };

    fetchPostDetails();
  }, [postId]);

  const hideComments = () => {
    setShowComments(!showComments);
  };

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{postDetails?.body}</p>
      </section>

      <button
        type="button"
        className="button"
        onClick={hideComments}
      >
        Hide comments
      </button>

      {showComments
        ? (<Comments postId={postId} />)
        : <p className="PostDetails__comments">Comments hidden</p>}
    </div>
  );
};
