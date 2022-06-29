/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deletePost, getUserPosts } from '../../api/posts';
import { setPostDetailsId, setUserPosts } from '../../store';
import { getPostDetailsId, getUserPostsFromState, getUserSelector } from '../../store/selectors';
import './PostsList.scss';

export const PostsList: React.FC = () => {
  const dispatch = useDispatch();
  const userPosts = useSelector(getUserPostsFromState);
  const userId = useSelector(getUserSelector);
  const selectedPostId = useSelector(getPostDetailsId);

  useEffect(() => {
    const loadUserPostFromServer = async () => {
      const userPostFromServer = await getUserPosts(userId);

      dispatch(setUserPosts(userPostFromServer));
    };

    loadUserPostFromServer();
  }, [userId]);

  const setSelectedPostId = (postId: number) => {
    dispatch(setPostDetailsId(postId));
  };

  const deletePostFromServer = async (postId:number) => {
    await deletePost(postId);

    const userPostFromServer = await getUserPosts(userId);

    dispatch(setUserPosts(userPostFromServer));
  };

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list" data-cy="postDetails">
        {userPosts?.map(post => (
          <li
            className="PostsList__item"
            key={post.id}
          >
            <div>
              <b>
                {`[User #${post.userId}]:`}
              </b>
              {post.title}
            </div>

            <div>
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => {
                  selectedPostId === post.id
                    ? setSelectedPostId(0)
                    : setSelectedPostId(post.id);
                }}
              >
                { selectedPostId === post.id ? 'Close' : 'Open'}
              </button>

              <button
                type="button"
                className="button danger"
                onClick={() => deletePostFromServer(post.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
