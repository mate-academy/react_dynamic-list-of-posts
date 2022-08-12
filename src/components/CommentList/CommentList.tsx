import { useEffect, useState } from 'react';
import { getComments } from '../../api/comments';
import { Comment } from '../../types/Comment';
import { CommentItem } from '../CommentItem/CommentItem';

type Props = {
  postId: number;
  commentsToPost: Comment[];
  setCommentsToPost: React.Dispatch<React.SetStateAction<Comment[]>>;
};

export const CommentList: React.FC<Props> = (
  {
    postId, commentsToPost, setCommentsToPost,
  },
) => {
  const [hideComents, setHideComment] = useState(false);

  useEffect(() => {
    getComments(postId)
      .then(res => {
        if (res.length > 0) {
          setCommentsToPost(res);
        }
      })
      .catch(err => {
        // eslint-disable-next-line no-console
        console.warn(err);
      });
  }, []);

  return (
    <section className="PostDetails__comments">
      {
        commentsToPost.length > 0 && (
          <>
            <button
              type="button"
              className="button"
              onClick={() => {
                setHideComment(prev => !prev);
              }}
            >
              {`${hideComents ? 'Show' : 'Hide'} ${commentsToPost.length} comments`}
            </button>

            {
              !hideComents && (
                <ul className="PostDetails__list">
                  {
                    commentsToPost.map(el => {
                      return (
                        <CommentItem
                          comment={el}
                          key={el.id}
                          setCommentsToPost={setCommentsToPost}
                        />
                      );
                    })
                  }
                </ul>
              )
            }
          </>
        )
      }
    </section>
  );
};
