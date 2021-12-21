/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import './PostsList.scss';
import { getUserPosts } from '../../api/posts';
import { PostDetails } from '../PostDetails';

const post = {
  id: 0,
  userId: 0,
  title: '',
  createdAt: '',
  updatedAt: '',
};

type Props = {
  userId: number,
};

export const PostsList: React.FC<Props> = ({ userId }) => {
  const [posts, setPosts] = useState([post]);
  const [selectedPostId, setSelectedPost] = useState(0);
  const [postDetails, setPostDetails] = useState(false);

  useEffect(() => {
    getUserPosts(userId)
      .then(userPosts => {
        setPosts(userPosts);
      });
  }, [userId]);

  return (
    <div className="main">
      <div className="PostsList">
        <h2>Posts:</h2>

        <ul className="PostsList__list">
          {posts.map(el => (
            <li
              className="PostsList__item"
              key={el.id}
            >
              <div>
                <b>
                  {`User: ${el.userId}:`}
                </b>
                {el.title}
              </div>

              {!postDetails && (
                <button
                  type="button"
                  className={classnames('PostsList__button button')}
                  onClick={() => {
                    setSelectedPost(el.id);
                    setPostDetails(true);
                  }}
                >
                  Open
                </button>
              )}

              {postDetails && (
                <button
                  type="button"
                  className={classnames('PostsList__button button')}
                  onClick={() => {
                    if (el.id === selectedPostId) {
                      setPostDetails(false);
                      setSelectedPost(0);
                    } else {
                      setSelectedPost(el.id);
                    }
                  }}
                >
                  {el.id === selectedPostId ? ('Close') : ('Open')}
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>

      {postDetails && (
        <div className="PostsList__side">
          <PostDetails selectedId={selectedPostId} />
        </div>
      )}
    </div>
  );
};
