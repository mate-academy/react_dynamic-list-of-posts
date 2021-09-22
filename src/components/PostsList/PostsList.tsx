// import React from 'react';
import React, { useState, useEffect } from 'react';
import './PostsList.scss';
import { getPosts, getUserPosts } from '../../api/posts';

type Props = {
  selectedUserId: number;
  selectedPostId: number | null;
  handlePostListButton: (postId: number | null) => void;
};

export const PostsList: React.FC<Props> = (props) => {
  const { selectedUserId, selectedPostId, handlePostListButton } = props;
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    (async () => {
      const postsFromApi = await getPosts();

      setPosts(postsFromApi);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const postsFromApi = selectedUserId ? (
        await getUserPosts(selectedUserId)
      ) : (
        await getPosts()
      );

      setPosts(postsFromApi);
    })();
  }, [selectedUserId]);

  if (!posts.length) {
    return (
      <div className="PostsList">
        <h2>Posts:</h2>
        <div>The user has got no posts yet.</div>
      </div>
    );
  }

  return (
    <div className="PostsList">
      <h2>Posts:</h2>
      <ul className="PostsList__list">
        {posts.map(post => (
          <li className="PostsList__item" key={post.id}>
            <div>
              <b>{`[User #${post.userId}]: `}</b>
              {post.title}
            </div>

            <button
              type="button"
              className="PostsList__button button"
              onClick={() => {
                if (selectedPostId === post.id) {
                  handlePostListButton(null);
                } else {
                  handlePostListButton(post.id);
                }
              }}
            >
              {selectedPostId === post.id ? 'Close' : 'Open'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
