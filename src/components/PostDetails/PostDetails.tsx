/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { PostComments } from '../PostComments';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { getPostDetails } from '../../api/posts';

interface Props {
  postId: number,
}

export const PostDetails: React.FC<Props> = ({ postId }) => {
  const [showComments, setShowComments] = useState(true);
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    (async function fetchData() {
      const fetchedPost = await getPostDetails(postId);

      setPost(fetchedPost ? fetchedPost[0] : null);
    }());
  }, [postId]);

  const handleClick = () => setShowComments(!showComments);

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
            <PostComments postId={postId} showComments={showComments} />
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
