import React, { useCallback, useEffect, useState } from 'react';
import { commentClient } from '../utils/commentsClient';

import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { CommentList } from './CommentList';

type Props = {
  post: Post | null;
};

export const PostDetails: React.FC<Props> = ({ post }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [commenting, setCommenting] = useState(false);
  const [updateFlag, setUpdateFlag] = useState<number | null>(null);

  useEffect(() => {
    setCommenting(false);
  }, [post]);

  useEffect(() => {
    if (post) {
      setLoading(true);
      commentClient
        .get(post.id)
        .then(res => {
          setError(false);
          setComments(() => res);
        })
        .catch(() => setError(true))
        .finally(() => setLoading(false));
    }
  }, [post, updateFlag]);

  const handleCommentDelete = useCallback((commentId: number) => {
    setComments(prevComnts =>
      prevComnts.filter(comnt => comnt.id !== commentId),
    );
    commentClient.delete(commentId);
  }, []);

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">{`#${post?.id}: ${post?.title}`}</h2>

          <p data-cy="PostBody">{post?.body}</p>
        </div>

        <div className="block">
          {loading && <Loader />}

          {error && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}
          {!error && !loading && (
            <>
              {comments.length > 0 && (
                <>
                  <p className="title is-4">Comments:</p>
                  <CommentList
                    comments={comments}
                    onDelete={handleCommentDelete}
                  />
                </>
              )}

              {!commenting && (
                <button
                  data-cy="WriteCommentButton"
                  type="button"
                  className="button is-link"
                  onClick={() => setCommenting(true)}
                >
                  Write a comment
                </button>
              )}
            </>
          )}
        </div>

        {!error && commenting && post && (
          <NewCommentForm
            post={post as Post}
            onError={setError}
            onUpdate={setUpdateFlag}
          />
        )}
      </div>
    </div>
  );
};
