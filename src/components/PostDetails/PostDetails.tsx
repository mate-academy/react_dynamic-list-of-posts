import React, { useState, useEffect } from 'react';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';
import { Post, Comment } from '../../react-app-env';
import { getComments, delComment } from '../../api/api';

type Props = {
  post: Post | undefined;
  setIsLoading: (arg: boolean) => void,
};

export const PostDetails: React.FC<Props> = ({
  post,
  setIsLoading,
}) => {
  const [commentsList, setCommentsList] = useState<Comment[]>([]);
  const [visiblecomments, setVisiblecomments] = useState(false);
  //  console.log(post);

  const findcomments = async () => {
    if (post) {
      const result = await getComments(post?.id);

      setCommentsList(result);
      setIsLoading(false);
    }
  };

  const deletecomment = async (id: number) => {
    if (commentsList) {
      await delComment(id);
      findcomments();
    }
  };

  useEffect(() => {
    setIsLoading(true);
    findcomments();
  }, [post]);

  return (
    <div className="PostDetails">
      <h2>Post details:</h2>
      {post && (
        <>
          <section className="PostDetails__post">
            <p>
              {post?.title}
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
              {setIsLoading(false)}
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
