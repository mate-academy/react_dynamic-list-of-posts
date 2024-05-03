import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';

import { useAppContext } from '../context/store';
import { Notification } from './Notification';
import { Error, Warning } from '../types/Notification';
import { Comments } from './Comments';
import { getSelectedPostComments } from '../api-services/comments';

export const PostDetails: React.FC = () => {
  const {
    state: { selectedPost, comments, error },
    methods: { setComments, setError },
  } = useAppContext();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedPost) {
      setLoading(true);

      getSelectedPostComments(selectedPost.id)
        .then(fetchedComments => setComments(fetchedComments))
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

          {error && <Notification type="error" message={Error.CommentsError} />}
          {!comments && (
            <Notification type="warning" message={Warning.NoComment} />
          )}

          {!loading && <Comments />}
        </div>
      </div>
    </div>
  );
};
