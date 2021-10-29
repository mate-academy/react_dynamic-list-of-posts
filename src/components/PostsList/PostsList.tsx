import React, { useState, useEffect } from 'react';
import './PostsList.scss';

import classNames from 'classnames';
import { Loader } from '../Loader/Loader';
import { getUserPosts } from '../../api/posts';

type Props = {
  selectedUser: string;
  selectedPost: string;
  selectPost: (value: string) => void;
};

export const PostsList: React.FC<Props> = ({
  selectedUser,
  selectPost,
  selectedPost,
}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(false);
      const loadedPosts = await getUserPosts(selectedUser);

      setPosts(loadedPosts);
    })();
  }, [selectedUser]);

  return (
    <div className="PostsList">
      {
        loading
          ? <Loader />
          : (
            <>
              <h2>Posts:</h2>
              <ul className="PostsList__list">
                {
                  posts.map(post => {
                    const { userId, title, id } = post;

                    return (
                      <li
                        className="PostsList__item"
                        key={id}
                      >
                        <div>
                          <b>
                            [User
                            {userId}
                            ]:
                            {' '}
                          </b>
                          {title}
                        </div>
                        <button
                          type="button"
                          className={classNames({
                            PostsList__button: true,
                            'PostsList__button--active': selectedPost === id,
                            button: true,
                          })}
                          onClick={() => {
                            selectPost(selectedPost === id ? '' : `${id}`);
                          }}
                        >
                          {selectedPost === `${id}`
                            ? 'Close'
                            : 'Open'}
                        </button>
                      </li>
                    );
                  })
                }
              </ul>
            </>
          )
      }
    </div>
  );
};
