import React, { useEffect, useState } from 'react';
import './PostsList.scss';
import { getPosts, getUserPosts } from '../../api/posts';

type Props = {
  selectedUserId: string;
  selectedPostId: string;
  setSelectedPostId: (selectedPostID: string) => void,
};

export const PostsList: React.FC<Props> = (
  {
    selectedUserId,
    setSelectedPostId,
    selectedPostId,
  },
) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (selectedUserId === '0') {
      getPosts()
        .then((visiblePosts => setPosts(visiblePosts)));
    } else {
      getUserPosts(selectedUserId)
        .then((visiblePosts => setPosts(visiblePosts)));
    }
  }, [selectedUserId]);

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
              </b>
              {post.title}
            </div>
            {`${post.id}` === selectedPostId
              ? (
                <button
                  type="button"
                  className="PostsList__button button"
                  onClick={() => {
                    setSelectedPostId('');
                  }}
                >
                  Close
                </button>
              )
              : (
                <button
                  type="button"
                  className="PostsList__button button"
                  onClick={() => {
                    setSelectedPostId(`${post.id}`);
                  }}
                >
                  Open
                </button>
              )}
          </li>
        ))}
      </ul>
    </div>
  );
};
