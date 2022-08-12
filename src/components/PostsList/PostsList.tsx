import { useEffect } from 'react';
import { getPosts } from '../../api/posts';
import { Post } from '../../types/Post';
import { PostItem } from '../PostItem/PostItem';
import './PostsList.scss';

type Props = {
  postList: Post[];
  setPostList: React.Dispatch<React.SetStateAction<Post[]>>;
  userSelected: number;
  setShowDetails: React.Dispatch<React.SetStateAction<number | null>>;
  showDetails: number | null;
};

export const PostsList: React.FC<Props> = (
  {
    setPostList,
    postList,
    userSelected,
    setShowDetails,
    showDetails,
  },
) => {
  useEffect(() => {
    getPosts()
      .then(res => {
        if (res?.length > 0) {
          setPostList(res);
        }
      });
  }, []);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>
      <ul className="PostsList__list">
        {
          postList
            .filter(el => {
              switch (userSelected) {
                case 0:
                  return true;
                default:
                  return el.userId === userSelected;
              }
            })
            .map(el => {
              return (
                <PostItem
                  post={el}
                  key={el.id}
                  setShowDetails={setShowDetails}
                  showDetails={showDetails}
                />
              );
            })
        }
      </ul>
    </div>
  );
};
