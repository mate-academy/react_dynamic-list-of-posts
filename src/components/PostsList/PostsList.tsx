import { useEffect, useState } from 'react';
import './PostsList.scss';
import { getUserPosts } from '../../api/posts';
import { Loader } from '../Loader/Loader';
import { PostData } from '../../types/PostData';

type Props = {
  userSelect: number;
  setSelectedPostId: React.Dispatch<React.SetStateAction<number | null>>;
  selectedPostId: number | null;
};

export const PostsList: React.FC<Props> = (
  {
    userSelect,
    setSelectedPostId,
    selectedPostId,
  },
) => {
  const [posts, setPosts] = useState<PostData[]>([]);

  useEffect(() => {
    getUserPosts(userSelect)
      .then(res => {
        if (res.responseError.error !== null) {
          // eslint-disable-next-line no-console
          console.log(res.responseError.error);
        }

        if (res.data !== null) {
          setPosts(res.data);
        }
      });
  }, [userSelect]);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>
      {
        posts.length < 0
          ? (<Loader />)
          : (
            <ul className="PostsList__list" data-cy="postDetails">
              {
                posts !== null && (
                  posts.map(element => (
                    <li className="PostsList__item" key={element.id}>
                      <div>
                        <b>
                          {`[User #${element.userId}]: `}
                        </b>
                        {element.title}
                      </div>
                      {
                        selectedPostId === element.id
                          ? (
                            <button
                              type="button"
                              className="PostsList__button button"
                              style={{ background: 'red' }}
                              onClick={() => {
                                setSelectedPostId(null);
                              }}
                            >
                              Close
                            </button>
                          ) : (
                            <button
                              type="button"
                              className="PostsList__button button"
                              onClick={() => {
                                setSelectedPostId(element.id);
                              }}
                              disabled={selectedPostId !== null}
                            >
                              Open
                            </button>
                          )
                      }
                    </li>
                  ))
                )
              }
            </ul>
          )
      }
    </div>
  );
};
