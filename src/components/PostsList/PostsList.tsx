import React, { useEffect, useState } from 'react';
import { getUserPosts } from '../../api/posts';
import './PostsList.scss';

interface Props {
  selectedUserId: number;
  selectedPostId: number;
  setSelectedPostId: (selectedPostId: number) => void;
  setPost: (post: Post | null) => void;
}

export const PostsList: React.FC<Props>
  = ({
    selectedUserId,
    selectedPostId,
    setSelectedPostId,
    setPost,
  }) => {
    const [posts, setPosts] = useState<Post[]>([]);

    const getPosts = async (userId: number) => {
      const postsFromServer = await getUserPosts(userId);

      setPosts(postsFromServer);
    };

    useEffect(() => {
      getPosts(selectedUserId);
    }, [selectedUserId]);

    return (
      <div className="PostsList">
        <h2>Posts:</h2>

        <ul
          className="PostsList__list"
          data-cy="postDetails"
        >
          {posts && (posts.map(post => (
            <li
              className="PostsList__item"
              key={post.id}
            >
              <div>
                <b>{`[User #${post.userId}]: `}</b>
                {post.title}
              </div>

              {selectedPostId === post.id
                ? (
                  <button
                    type="button"
                    className="PostsList__button button"
                    onClick={() => {
                      setSelectedPostId(0);
                      setPost(null);
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
                      setSelectedPostId(post.id);
                      setPost(post);
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
