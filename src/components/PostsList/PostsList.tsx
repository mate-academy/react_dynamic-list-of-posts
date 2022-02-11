import React, { useState, useEffect } from 'react';
import './PostsList.scss';
import classnames from 'classnames';

import * as postsAPI from '../../api/posts';

type Props = {
  selectedUser: number,
  selectedPostHandler: (postId: Post) => void,
  selectedPostId: number | undefined,
};

export const PostsList: React.FC<Props> = ({
  selectedUser,
  selectedPostHandler,
  selectedPostId,
}) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const loadData = async (userId: number) => {
      if (userId === 0) {
        const postsFromServer = await postsAPI.getAllPosts();

        setPosts(postsFromServer);
      } else {
        const postsFromServer = await postsAPI.getUserPosts(userId);

        setPosts(postsFromServer);
      }
    };

    loadData(selectedUser);
  }, [selectedUser]);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>
      <ul className="PostsList__list">
        {posts.map((post) => (
          <li
            className="PostsList__item"
            key={post.id}
          >
            <div>
              <b>
                [User#
                {post.userId}
                ]:
              </b>
              {post.title}
            </div>
            {selectedPostId === post.id
              ? (
                <button
                  type="button"
                  className={classnames('PostsList__button button', {
                    'PostsList__button-selected': post.id === selectedPostId,
                  })}
                  onClick={() => {
                    selectedPostHandler(post);
                  }}
                >
                  Close
                </button>
              )
              : (
                <button
                  type="button"
                  className={classnames('PostsList__button button', {
                    'PostsList__button-selected': post.id === selectedPostId,
                  })}
                  onClick={() => {
                    selectedPostHandler(post);
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
