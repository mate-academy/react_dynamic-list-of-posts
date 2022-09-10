import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Comments } from '../Comments/Comments';

import { TRootState } from '../../redux/store';
import { IPost } from '../../types/Post.interface';

export const PostDetails: React.FC = () => {
  const { currentPost } = useSelector((state: TRootState) => state.posts);
  const [postData, setPostData] = useState<IPost | null>(null);

  useEffect(() => {
    setTimeout(
      () => setPostData(currentPost),
      !currentPost ? 500 : 0,
    );
  }, [currentPost]);

  if (!postData) {
    return null;
  }

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            {`#${postData.id}: `}
            {postData.title}
          </h2>

          <p data-cy="PostBody">
            {postData.body}
          </p>
        </div>

        <Comments />
      </div>
    </div>
  );
};
