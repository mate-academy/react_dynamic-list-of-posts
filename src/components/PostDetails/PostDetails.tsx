import React, { useCallback, useEffect, useState } from 'react';
import { getPostDetails } from '../../api/posts';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { Post, Comment } from '../../types';
import { getPostComments } from '../../api/comments';

type Props = {
  selectedPostId: number,
};

export const PostDetails: React.FC<Props> = React.memo(({ selectedPostId }) => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [hideShow, setHideShow] = useState(true);

  const getDetails = useCallback((id: number) => {
    getPostDetails(id)
      .then(response => setSelectedPost(response));
  }, []);

  const getComments = useCallback((id: number) => {
    getPostComments(id)
      .then((response: Comment[]) => setComments(response));
  }, []);

  const createComment = useCallback((comment) => {
    setComments(prev => ([
      ...prev,
      {
        id: Math.floor(Math.random() * 1000000),
        ...comment,
      },
    ]));
  }, []);

  const deleteComment = useCallback((id: number) => {
    setComments(prev => prev.filter(comment => comment.id !== id));
  }, []);

  useEffect(() => {
    setSelectedPost(null);
    setComments([]);
    getComments(selectedPostId);
    getDetails(selectedPostId);
  }, [selectedPostId, getDetails, getComments]);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      {selectedPost && (
        <>
          <section className="PostDetails__post">
            <p>{selectedPost.body}</p>
          </section>

          <section className="PostDetails__comments">
            <button
              type="button"
              className="button"
              onClick={() => setHideShow(!hideShow)}
            >
              {`${hideShow ? 'Hide' : 'Show'} ${comments.length} comments`}
            </button>

            {hideShow && (
              <ul className="PostDetails__list">
                {comments.map(comment => (
                  <li
                    className="PostDetails__list-item"
                    key={comment.id}
                  >
                    <button
                      type="button"
                      className="PostDetails__remove-button button"
                      onClick={() => deleteComment(comment.id)}
                    >
                      X
                    </button>
                    <p>{comment.body}</p>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section>
            <div className="PostDetails__form-wrapper">
              <NewCommentForm
                postId={selectedPostId}
                createComment={createComment}
              />
            </div>
          </section>
        </>
      )}
    </div>
  );
});
