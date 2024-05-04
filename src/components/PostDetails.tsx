import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';

import { useAppContext } from '../context/store';
import { Notification } from './Notification';
import { Error } from '../types/Notification';
import { Comments } from './Comments';
import { getSelectedPostComments } from '../api-services/comments';

export const PostDetails: React.FC = () => {
  const {
    state: { selectedPost },
    methods: { setComments },
  } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (selectedPost) {
      setLoading(true);

      getSelectedPostComments(selectedPost.id)
        .then(fetchedComments => {
          setError('');
          setComments(fetchedComments);
        })
        .catch(() => {
          setError(Error.CommentsError);
        })
        .finally(() => setLoading(false));
    }
  }, [selectedPost]);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            #{selectedPost?.id}: {selectedPost?.title}
          </h2>

          <p data-cy="PostBody">{selectedPost?.body}</p>
        </div>

        <div className="block">
          {loading && <Loader />}

          {error && !loading && (
            <Notification type="error" message={Error.CommentsError} />
          )}

          {!loading && !error && <Comments />}
        </div>
      </div>
    </div>
  );
};
