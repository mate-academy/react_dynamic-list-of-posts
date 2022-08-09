import React, { useState, useEffect } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { Post, Comment } from '../../react-app-env';
import { getComments, delComment } from '../../api/comments';
import { getPostbyId } from '../../api/posts';

type Props = {
  postId: number | undefined;
};

export const PostDetails: React.FC<Props> = ({
  postId,
}) => {
  const [commentsList, setCommentsList] = useState<Comment[] | undefined>([]);
  const [visiblecomments, setVisiblecomments] = useState(false);
  const [postDetails, setPostDetails] = useState<Post>();

  const findPost = async () => {
    if (postId) {
      const result = await getPostbyId(postId);

      setPostDetails(result);
    }
  };

  useEffect(() => {
    findPost();
  }, []);

  const findcomments = async () => {
    if (postId) {
      const result = await getComments(postId);

      setCommentsList(result);
    }
  };

  const deletecomment = async (id: number) => {
    if (commentsList) {
      await delComment(id);
      findcomments();
    }
  };

  useEffect(() => {
    findcomments();
  }, [postId]);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>
      {postId !== 0 && (
        <>
          <section className="PostDetails__post">
            <p>
              {postDetails?.title}
            </p>
          </section>
          <section className="PostDetails__comments">
            <button
              type="button"
              className="button"
              onClick={() => {
                setVisiblecomments(!visiblecomments);
              }}
            >
              {commentsList && ((visiblecomments)
                ? `Show ${commentsList.length} comments`
                : `Hide ${commentsList.length} comments`)}
            </button>
            <ul
              className={visiblecomments
                ? 'PostDetails__visiblelist'
                : 'PostDetails__list'}
            >
              {commentsList && commentsList.map(comm => (
                <li
                  className="PostDetails__list-item"
                  key={comm.id}
                >
                  <button
                    type="button"
                    className="PostDetails__remove-button button"
                    onClick={() => {
                      deletecomment(comm.id);
                    }}
                  >
                    X
                  </button>
                  <p>{comm.body}</p>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <div className="PostDetails__form-wrapper">
              <NewCommentForm
                commentsList={commentsList}
                setCommentsList={setCommentsList}
              />
            </div>
          </section>
        </>
      )}
    </div>
  );
};
