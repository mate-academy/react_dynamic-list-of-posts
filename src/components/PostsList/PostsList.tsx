import React, { useEffect, useState } from 'react';
import './PostsList.scss';
import { getUserPosts } from '../../api/BA';
import { Post } from '../../types/Post';

type Props = {
  currentId: number,
  openPost: (idPost: number | null) => void,
};

export const PostsList: React.FC<Props> = ({ currentId, openPost }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getUserPosts(currentId)
      .then(res => setPosts(res));
  }, []);

  useEffect(() => {
    getUserPosts(currentId)
      .then(res => setPosts(res));
  }, [currentId]);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {posts.map(el => (
          <li className="PostsList__item" key={el.id}>
            <div>
              <b>
                {`[User #${el.userId}]: `}
              </b>
              {el.title}
            </div>
            <button
              type="button"
              className="PostsList__button button"
              onClick={(e) => {
                const target = e.nativeEvent.target as HTMLButtonElement;

                if (target.classList.contains('button--active')) {
                  openPost(null);
                  target.classList.remove('button--active');
                  target.innerText = 'Open';
                } else {
                  const allButton = Array.from(document.querySelectorAll('.PostsList__button'));

                  [...allButton].forEach(item => {
                    item.classList.remove('button--active');
                    const button = item;

                    button.textContent = 'Open';
                  });
                  target.classList.add('button--active');
                  target.innerText = 'Close';
                  openPost(el.id);
                }
              }}
            >
              Open
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
