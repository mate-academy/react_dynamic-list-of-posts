/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { PostComments } from '../PostComments';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { getPostDetails } from '../../api/posts';

interface Props {
  postId: number | null,
}

export const PostDetails: React.FC<Props> = ({ postId }) => {
  const [showComments, setShowComments] = useState<boolean>(true);
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    (async function fetchData() {
      const fetchedPost = await getPostDetails(postId);

      setPost(fetchedPost ? fetchedPost[0] : null);
    }());
  }, [postId]);

  const handleClick = () => (showComments ? setShowComments(false) : setShowComments(true));

  return (
    post ? (
      <div className="PostDetails">
        <h2>Post details:</h2>

        <section className="PostDetails__post">
          <p>{post.body}</p>
        </section>

        <section className="PostDetails__comments">
          <button
            type="button"
            className="button"
            onClick={handleClick}
          >
            {showComments ? 'Hide comments' : 'Show comments'}
          </button>

          <ul className="PostDetails__list">
            {showComments && <PostComments postId={postId} />}
          </ul>
        </section>

        <section>
          <div className="PostDetails__form-wrapper">
            <NewCommentForm postId={post.id} />
          </div>
        </section>
      </div>
    ) : (
      <div>No post selected</div>
    )
  );
};
