/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import './PostsList.scss';
import { getUserPosts } from '../../api/posts';
import { PostDetails } from '../PostDetails';
import { Post } from '../types/Post';

type Props = {
  userId: number,
};

export const PostsList: React.FC<Props> = ({ userId }) => {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [selectedPostId, setSelectedPost] = useState(0);
  const [postDetails, setPostDetails] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getUserPosts(userId)
      .then(userPosts => {
        setPosts(userPosts);
        setErrorMessage('');
      })
      .catch(() => {
        setErrorMessage('Ooops, something went wrong');
      });
  }, [userId]);

  const openDetails = (id:number) => {
    setSelectedPost(id);
    setPostDetails(true);
  };

  const closeDetails = () => {
    setSelectedPost(0);
    setPostDetails(false);
  };

  const toggleDetails = (post:Post) => {
    if (post.id === selectedPostId) {
      closeDetails();
    } else {
      setSelectedPost(post.id);
    }
  };

  return (
    <div className="main">
      <div className="PostsList">
        <h2>Posts:</h2>
        {errorMessage}
        {posts && (
          <ul className="PostsList__list">
            {posts.map(post => (
              <li
                className="PostsList__item"
                key={post.id}
              >
                <div>
                  <b>
                    {`User: ${post.userId}:`}
                  </b>
                  {post.title}
                </div>

                {!postDetails && (
                  <button
                    type="button"
                    className={classnames('PostsList__button button')}
                    onClick={() => openDetails(post.id)}
                  >
                    Open
                  </button>
                )}

                {postDetails && (
                  <button
                    type="button"
                    className={classnames('PostsList__button button')}
                    onClick={() => toggleDetails(post)}
                  >
                    {post.id === selectedPostId ? ('Close') : ('Open')}
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {postDetails && (
        <div className="PostsList__side">
          <PostDetails selectedId={selectedPostId} />
        </div>
      )}
    </div>
  );
};
