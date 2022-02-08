import React, { useState, useEffect } from 'react';
import './PostsList.scss';
import { getPosts } from '../../api/posts';

type Props = {
  selectedUserId: string,
  selectPostId: (id: number) => void,
  selectedPostId: number,
};

export const PostsList: React.FC<Props> = React
  .memo(({ selectedUserId, selectPostId, selectedPostId }) => {
    const [postList, setPosts] = useState<PostItem[]>([]);

    useEffect(() => {
      const fetchPosts = async () => {
        const posts = await getPosts();

        setPosts(posts);
      };

      fetchPosts();
    }, []);

    const filterPosts = (userId: number) => {
      if (userId !== 0) {
        return postList.filter(post => post.userId === userId);
      }

      return postList;
    };

    const filteredPosts = filterPosts(+selectedUserId);

    // eslint-disable-next-line no-console
    console.log('postList');

    return (
      <div className="PostsList">
        <h2>Posts:</h2>

        <ul className="PostsList__list">
          {filteredPosts.map(post => (
            <li className="PostsList__item" key={post.id}>
              <div>
                <b>{`[User #${post.userId}]:`}</b>
                {post.title}
              </div>
              {selectedPostId === post.id
                ? (
                  <button
                    type="button"
                    className="PostsList__button button button_close"
                    onClick={() => selectPostId(0)}
                  >
                    Close
                  </button>
                )
                : (
                  <button
                    type="button"
                    className="PostsList__button button"
                    onClick={() => selectPostId(post.id)}
                  >
                    Open
                  </button>
                )}
            </li>
          ))}
        </ul>
      </div>
    );
  });
