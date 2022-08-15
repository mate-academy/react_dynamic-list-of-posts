import React, { useEffect, useState } from 'react';
import { getPostComments, removeComment } from '../../api/comments';
import { getPostDetails } from '../../api/posts';
import { Post } from '../../types/Post';
import { Comment } from '../../types/Comment';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { Loader } from '../Loader';

type Props = {
  selectedPostId: number
};

export const PostDetails: React.FC<Props> = ({ selectedPostId }) => {
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isVisible, setIsVisible] = useState(true);
  const [changeCount, setChangeCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getPostDetails(selectedPostId).then(res => {
      setPost(res);
      setIsLoading(false);
    });
  }, [selectedPostId]);

  useEffect(() => {
    setIsLoading(true);
    getPostComments(selectedPostId).then(res => {
      setComments(res);
      setIsLoading(false);
    });
  }, [selectedPostId, changeCount]);

  return (post && !isLoading ? (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{post.body}</p>
      </section>

      <section className="PostDetails__comments" data-cy="postList">
        {isVisible ? (
          <>
            <button
              type="button"
              className="button"
              onClick={() => setIsVisible(false)}
            >
              {`Hide ${comments.length} comments`}
            </button>
          </>
        ) : (
          <button
            type="button"
            className="button"
            onClick={() => setIsVisible(true)}
          >
            {`Show ${comments.length} comments`}
          </button>
        )}

        <ul className="PostDetails__list">
          {isVisible && comments.map(comment => (
            <li key={comment.id} className="PostDetails__list-item">
              <button
                type="button"
                className="PostDetails__remove-button button"
                onClick={() => {
                  removeComment(comment.id)
                    .then(() => setChangeCount((changeCount + 1)));
                }}
              >
                X
              </button>
              <p>{comment.name}</p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm
            postId={post.id}
            changeCount={changeCount}
            onAdd={setChangeCount}
          />
        </div>
      </section>
    </div>
  ) : (
    <Loader />
  ));
};
