import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';

import { useAppContext } from '../context/store';
import { Notification } from './Notification';
import { Error } from '../types/Notification';
import { Comments } from './Comments';
import { getSelectedPostComments } from '../api-services/comments';
import { Post } from '../types/Post';

export const PostDetails: React.FC = () => {
  const {
    state: { selectedPost },
    methods: { setComments },
  } = useAppContext();
  const { id, title, body } = selectedPost as Post;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (selectedPost) {
      setIsLoading(true);

      getSelectedPostComments(selectedPost.id)
        .then(fetchedComments => {
          setError('');
          setComments(fetchedComments);
        })
        .catch(() => {
          setError(Error.CommentsError);
        })
        .finally(() => setIsLoading(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPost]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            #{id}: {title}
          </h2>

          <p data-cy="PostBody">{body}</p>
        </div>

        <div className="block">
          {isLoading && <Loader />}

          {error && !isLoading && (
            <Notification type="error" message={Error.CommentsError} />
          )}

          {!isLoading && !error && <Comments />}
        </div>
      </div>
    </div>
  );
};
