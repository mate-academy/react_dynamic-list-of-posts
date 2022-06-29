import React, { useState, useEffect } from 'react';
import './PostsList.scss';
import { getAllPosts, getUserPosts } from '../../api/posts';

interface Props {
  selectedUserId: number,
  getSelectPostId: (postId: number) => void,
  selectPostId: number,
}
export const PostsList: React.FC<Props> = (
  {
    selectedUserId,
    getSelectPostId,
    selectPostId,
  },
) => {
  const [posts, setPosts] = useState<Post[] | null>(null);

  const loadPostsDataByID = async (userId: number) => {
    const gotPosts = await getUserPosts(userId);

    setPosts(gotPosts);
  };

  const loadAllPostsData = async () => {
    const gotAllPosts = await getAllPosts();

    setPosts(gotAllPosts);
  };

  useEffect(() => {
    if (selectedUserId) {
      loadPostsDataByID(selectedUserId);
    } else {
      loadAllPostsData();
    }
  }, [selectedUserId]);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts && (posts.map(post => (
          <li
            className="PostsList__item"
            key={post.id}
          >
            <div>
              <b>{`User #${post.userId}: ${post.title}`}</b>

            </div>
            { selectPostId === post.id ? (
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => {
                  getSelectPostId(0);
                }}
              >
                Close
              </button>
            ) : (
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => {
                  getSelectPostId(post.id);
                }}
              >
                Open
              </button>
            )}

          </li>
        )))}
      </ul>

    </div>
  );
};
