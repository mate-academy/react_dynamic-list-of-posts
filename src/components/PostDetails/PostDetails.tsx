import { Comments } from '../Comments/Comments';

export const PostDetails: React.FC = () => {
  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            #18: voluptate et itaque vero tempora molestiae
          </h2>

          <p data-cy="PostBody">
            eveniet quo quis
            laborum totam consequatur non dolor
            ut et est repudiandae
            est voluptatem vel debitis et magnam
          </p>
        </div>

        <Comments />
      </div>
    </div>
  );
};
