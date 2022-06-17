import React, { useEffect, useState } from 'react';
import { getPostComments, removeComment } from '../../api/comments';
import { getPostDetails } from '../../api/posts';
import { Loader } from '../Loader';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

interface Props {
  postID: number
}

export const PostDetails: React.FC<Props> = ({ postID }) => {
  const [post, setPost] = useState<Post | null>(null);

  const [comments, setComments] = useState<Comment[]>([]);

  const [isShown, setIsShown] = useState<boolean>(true);

  const onLoad = async () => {
    setPost(await getPostDetails(postID));
    setComments(await getPostComments(postID));
  };

  useEffect(() => {
    onLoad();
  }, [postID]);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>

      <section className="PostDetails__post">
        <p>{post?.body}</p>
      </section>

      {post ? (
        <section className="PostDetails__comments">
          <button
            type="button"
            className="button"
            onClick={() => setIsShown(!isShown)}
          >
            {isShown ? 'Hide' : 'Show'}
          </button>

          {isShown && (
            <ul className="PostDetails__list">
              {
                comments.map(comment => (
                  <li className="PostDetails__list-item">
                    <button
                      type="button"
                      className="PostDetails__remove-button button"
                      onClick={() => {
                        removeComment(comment.id);
                        onLoad();
                      }}
                    >
                      X
                    </button>
                    <p>{comment.body}</p>
                  </li>
                ))
              }
            </ul>
          )}
        </section>
      )
        : <Loader />}

      <section>
        <div className="PostDetails__form-wrapper">
          <NewCommentForm />
        </div>
      </section>
    </div>
  );
};
