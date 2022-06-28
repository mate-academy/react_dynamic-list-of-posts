import React, { useEffect, useState } from 'react';
import './PostsList.scss';
import { Post } from '../../react-app-env';
import { getPosts, getUserPosts } from '../../api/posts';

interface Props {
  userId: number,
  postId: number,
  setSelectedPostId: (postID: number) => void,
}

export const PostsList: React.FC<Props> = ({
  userId,
  postId,
  setSelectedPostId,
}) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (userId === 0) {
      getPosts()
        .then(response => setPosts(response));
    } else {
      getUserPosts(userId)
        .then(response => setPosts(response));
    }
  }, [userId]);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list" data-cy="postDetails">
        {posts.map(post => (
          <li className="PostsList__item" key={post.id}>
            <div>
              <b>{`[User #${post.userId}]`}</b>
              {post.title}
            </div>
            <button
              type="button"
              className="PostsList__button button"
              onClick={() => (
                postId === post.id
                  ? setSelectedPostId(0)
                  : setSelectedPostId(post.id)
              )}
            >
              {postId === post.id ? 'Close' : 'Open'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
