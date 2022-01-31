import React, { useState, useEffect } from 'react';
import { getUserPosts } from '../../api/posts';
import './PostsList.scss';

interface Post {
  id: number,
  userId: number,
  title: string,
}

type Props = {
  selectedUser: string,
  selectPost: (postId: number) => void,
  selectedPostId: number,
  getDetails: (id: number) => void,
  removeDetails: () => void,
};

export const PostsList: React.FC<Props> = ({
  selectedUser,
  selectPost,
  selectedPostId,
  getDetails,
  removeDetails,
}) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getUserPosts(selectedUser).then(listOfPosts => {
      setPosts(listOfPosts);
    });
  });

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.length > 0 && posts.map((post: Post) => {
          return (
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
                &nbsp;
                {post.title}
              </div>
              {selectedPostId === post.id ? (
                <button
                  type="button"
                  className="PostsList__button button"
                  onClick={() => {
                    removeDetails();
                    selectPost(0);
                  }}
                >
                  Close
                </button>
              ) : (
                <button
                  type="button"
                  className="PostsList__button button"
                  onClick={() => {
                    selectPost(post.id);
                    getDetails(post.id);
                  }}
                >
                  Open
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
