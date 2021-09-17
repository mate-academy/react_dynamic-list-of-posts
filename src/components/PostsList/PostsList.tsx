import React, { useEffect, useState } from 'react';
import { getUserPosts, getAllPosts } from '../../api/posts';
import './PostsList.scss';

type Props = {
  selectedUserId: number;
  // isVisibleDetails: boolean;
  handleVisibleDetail : (id: number) => void;
};

export const PostsList: React.FC<Props> = (props) => {
  const { selectedUserId, handleVisibleDetail } = props;
  const [postData, getPostsOfUser] = useState<any>([]);
  // const [isButtonClose, setButtonStatus] = useState(isVisibleDetails);
  const [selectedPost, getSelectedPost] = useState(0);

  useEffect(() => {
    getAllPosts().then((data) => getPostsOfUser(data));
  }, []);

  useEffect(() => {
    if (selectedUserId !== 0) {
      getUserPosts(selectedUserId).then((data) => getPostsOfUser(data));
    }
  }, [selectedUserId]);

  const handleOpenButton = (event: React.MouseEvent<HTMLButtonElement>, id: number) => {
    event.preventDefault();
    // setButtonStatus(prevStatus => !prevStatus);
    if (!selectedPost) {
      getSelectedPost(id);
    } else {
      getSelectedPost(0);
    }

    handleVisibleDetail(id);
    /* eslint-disable-next-line */
    console.log(id);
  };

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {!postData.length ? 'Oops, this user is still thinking about his posts)' : postData.map((post: Post) => (
          <li key={post.id} className="PostsList__item">
            <div>
              <b>
                [User
                {post.userId}
                ]:
              </b>
              {post.title}
            </div>

            <button
              type="button"
              className="PostsList__button button"
              onClick={(event) => handleOpenButton(event, post.id)}
            >
              {selectedPost !== post.id ? 'Open' : 'Close'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
