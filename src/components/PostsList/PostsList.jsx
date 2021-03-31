import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deletePost } from '../../api/api';
import { statePosts, setPostId, getPosts } from '../../store';
import './PostsList.scss';

export const PostsList = () => {
  const dispatch = useDispatch();
  const posts = useSelector(statePosts);

  const handleClick = (postId) => {
    dispatch(setPostId(postId));
  };

  const handleDelete = async(postId) => {
    await deletePost(postId);
    dispatch(getPosts());
  };

  return (
    <div className="PostsList">
      <h2>Posts:</h2>
      <div>
        <ul className="PostsList__list">
          {posts.map(post => (
            <li className="PostsList__item" key={post.id}>
              <div>
                <b>{`[Post #${post.id}]: `}</b>
                {post.title}
              </div>
              <div>

                <button
                  type="button"
                  className="PostsList__button button"
                  onClick={() => handleClick(post.id)}
                >
                  Show Details
                </button>

                <button
                  type="button"
                  className="PostsList__button button"
                  onClick={() => handleDelete(post.id)}
                >
                  Delete Post
                </button>
              </div>

            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
