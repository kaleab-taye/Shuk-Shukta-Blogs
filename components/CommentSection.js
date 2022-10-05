import { comment } from 'postcss';

export default function CommentSection(props) {
  return (
    <div className="py-10">
      <div className="text-xl lg:text-2xl font-commonFont">
        {props.comments.length}{' '}
        <span className="text-l lg:text-xl">
          {props.comments.length > 1 ? 'Comments' : 'Comment'}
        </span>
      </div>

      <div className="px-2">
        {props.comments.map((comment) => {
          return (
            <div className='' key={comment.id}>
              <div
                className="py-3 text-xl lg:text-2xl font-commonFont"
                
              >
                <div className="py-3">{comment.by}</div>
                <div>{comment.comment}</div>
              </div>
              <hr/>
            </div>
          );
        })}
      </div>
    </div>
  );
}
