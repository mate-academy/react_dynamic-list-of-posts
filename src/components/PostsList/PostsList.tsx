import React, { useEffect, useState } from 'react';
import './PostsList.scss';
import { getUserPosts } from '../../api/posts';
import getAllUserPosts from '../../api/api';
import Post from '../../types/postType';

type PostListProps = {
  selectedUserID: string,
  selectedPostID: number,
  selectCurrentPostID: (id: number) => void,
};

export const PostsList: React.FC<PostListProps> = (props: PostListProps) => {
  const { selectedPostID, selectedUserID, selectCurrentPostID } = props;
  const [postList, setPostList] = useState<Post[]>([]);

  useEffect(() => {
    getAllUserPosts()
      .then(res => setPostList(res));
  }, []);

  useEffect(() => {
    if (selectedUserID !== '0') {
      getUserPosts(selectedUserID.toString())
        .then(res => setPostList(res));
    } else {
      getAllUserPosts()
        .then(res => setPostList(res));
    }
  }, [selectedUserID]);

  return (
    <div className="PostsList">
      <h2>Posts:</h2>

      <ul className="PostsList__list">
        {postList.length > 0
          ? postList.map(el => {
            return (
              <li
                className="PostsList__item"
                key={el.id}
              >
                <div>
                  <b>
                    [User #
                    {el.userId}
                    ]:
                  </b>
                  {el.body}
                </div>
                <button
                  type="button"
                  className="PostsList__button button"
                  onClick={() => selectCurrentPostID(el.id)}
                >
                  {selectedPostID === el.id ? 'Close' : 'Open'}
                </button>
              </li>
            );
          })
          : 'Loading posts'}
      </ul>
    </div>
  );
};
