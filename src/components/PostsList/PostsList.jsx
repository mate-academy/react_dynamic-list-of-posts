import React, { useState, useEffect } from 'react';
import { getAllPosts, getUserPosts } from '../../api/api';
import { ProstsListProps } from '../../props/PostsListProps';
import { Post } from '../Post/Post';
import './PostsList.scss';

export const PostsList = ({ userId, postId, setPostId }) => {
  const [posts, setPosts] = useState(null);

  useEffect(
    () => {
      const fetchData = async() => {
        const postsFromServer = userId
          ? await getUserPosts(userId)
          : await getAllPosts();

        if (!postsFromServer) {
          throw new Error('Cannot load posts');
        }

        setPosts(postsFromServer);
      };

      fetchData();
    },
    [userId],
  );

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

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
    </div>
  );
};

PostsList.propTypes = ProstsListProps;
