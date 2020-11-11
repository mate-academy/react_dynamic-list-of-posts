import React, { useState, useEffect } from 'react';

import { getAllPosts, getUserPosts } from '../../api/posts';
import { Loader } from '../Loader/Loader';
import { Post } from '../Post/Post';

import { ProstsListProps } from '../../props/PostsListProps';
import './PostsList.scss';

export const PostsList = ({ userId, postId, setPostId }) => {
  const [posts, setPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    () => {
      const fetchData = async() => {
        try {
          setIsLoading(currentIsLoading => !currentIsLoading);

          const postsFromServer = userId
            ? await getUserPosts(userId)
            : await getAllPosts();

          setPosts(postsFromServer);
          setIsLoading(currentIsLoading => !currentIsLoading);
        } catch (error) {
          setPosts([]);
          setIsLoading(false);
          // eslint-disable-next-line no-console
          console.warn(error);
        }
      };

      fetchData();
    },
    [userId],
  );

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      {isLoading
        ? <Loader />
        : (
          <ul className="PostsList__list">
            {posts
              ? posts.map(post => (
                <li
                  className="PostsList__item"
                  key={post.id}
                >
                  <Post
                    id={post.id}
                    userId={post.userId}
                    title={post.title}
                    postId={postId}
                    setPostId={setPostId}
                  />
                </li>
              ))
              : <p>No posts</p>
            }
          </ul>
        )
      }
    </div>
  );
};

PostsList.propTypes = ProstsListProps;
