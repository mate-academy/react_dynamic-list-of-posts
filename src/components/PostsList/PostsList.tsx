/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect, useState } from 'react';
import { getUserPosts } from '../../api/posts';
import './PostsList.scss';

type Props = {
  userId: number,
  setSelectDetId: (value: React.SetStateAction<number>) => void,
  selectDetId: number
};

export const PostsList: React.FC<Props>
  = ({ userId, setSelectDetId, selectDetId }) => {
    const [userPosts, setUserPosts] = useState<Post[]>();

    useEffect(() => {
      getUserPosts(userId)
        .then(response => setUserPosts(response));
    }, [userId]);

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

              <button
                type="button"
                className="PostsList__button button"
                onClick={() => {
                  selectDetId === post.id
                    ? setSelectDetId(0)
                    : setSelectDetId(post.id);
                }}
              >
                { selectDetId === post.id ? 'Close' : 'Open'}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  };
