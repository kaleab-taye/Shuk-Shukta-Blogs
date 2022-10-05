import { faCommentAlt } from '@fortawesome/free-regular-svg-icons';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Footer from './Footer';

export default function CommentSection(props) {
  return (
    <div className="py-5">
      <div className="text-xl lg:text-2xl font-commonFont flex gap-3">
        <FontAwesomeIcon className="w-8 text-accent" icon={faCommentAlt} />
        {props.comments.length}{' '}
        <span className="text-l lg:text-xl">
          {props.comments.length > 1 ? 'Comments' : 'Comment'}
        </span>
      </div>

      <div className="px-2 py-0">
        {props.comments.map((comment) => {
          return (
            <div className="" key={comment.id}>
              <div className="py-3 text-xl lg:text-2xl font-commonFont">
                <div className="py-3 px-4">{comment.by}</div>
                <div>{comment.comment}</div>
              </div>
              <hr />
            </div>
          );
        })}
      </div>
      <div className="py-5 flex ">
        <textarea
          placeholder='Comment Here !'
          id="comment"
          className="border m-1 p-1 w-3/4 h-20 align-top"
        />
        <FontAwesomeIcon
          className="mt-0 w-8 text-accent mx-5"
          icon={faPaperPlane}
        />
      </div>
    </div>
  );
}
