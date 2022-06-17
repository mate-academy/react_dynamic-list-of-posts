import React, { useEffect, useState } from 'react';
import Class from 'classnames';
import { getUserPosts } from '../../api/posts';
import './PostsList.scss';

interface Props {
  userID: number | null
  setPostId: (postId: number | null) => void,
  selectedID: number | null
}

export const PostsList: React.FC<Props> = (
  { userID, setPostId, selectedID },
) => {
  const [posts, setPosts] = useState<Post[]>([]);

  const onLoad = async (userId: number | null) => {
    setPosts(await getUserPosts(userId));
  };

  useEffect(() => {
    onLoad(userID);
  }, [userID]);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.map(post => (
          <li
            key={post.id}
            className="PostsList__item"
          >
            <div>
              <b>
                [User #
                {post.userId}
                ]:
                {' '}
              </b>
              {post.title}
            </div>
            <button
              type="button"
              className={Class('PostsList__button button',
                { 'PostsList__button--selected': selectedID === post.id })}
              onClick={() => {
                if (selectedID === post.id) {
                  setPostId(null);
                } else {
                  setPostId(post.id);
                }
              }}
            >
              {selectedID === post.id ? 'Close' : 'Open'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
