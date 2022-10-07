import { faCommentAlt } from '@fortawesome/free-regular-svg-icons';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

export default function CommentSection(props) {
  const [comments, setComments] = useState(props.comments);
  const id = props.id;
  const [status, setStatus] = useState('uncommented');
  const [error, setError] = useState('');

  async function sendComment(form) {
    form.preventDefault();
    setStatus('commenting');
    console.log(form.target.comment.value);
    let webUrl = process.env.url;

    let headersList = {
      'Content-Type': 'application/json',
    };

    if (form.target.name.value.length < 1) {
      form.target.name.value = 'Anonymous';
    }
    if (form.target.comment.value.length < 1) {
      setStatus('uncommented');
      return;
    }

    let bodyContent = JSON.stringify({
      by: form.target.name.value,
      comment: form.target.comment.value,
    });

    try {
      let response = await fetch(`${webUrl}/api/blogs/${id}/comment`, {
        method: 'POST',
        body: bodyContent,
        headers: headersList,
      });

      let data = await response.text();

      if (response.status === 200) {
        setStatus('commented');
        let newComments = [...comments, JSON.parse(data)];
        setComments(newComments);
        form.target.name.value = '';
        form.target.comment.value = '';
      } else {
        setError('error publishing content @1 please try again');
        setStatus('uncommented');
      }
    } catch (error) {
      console.log('error', error);
      setStatus('uncommented');
      setError(`error ${error.toString()}`);
    }
  }

 
  return (
    <div className="py-5">
      <div className="text-xl lg:text-2xl font-commonFont flex gap-3">
        <FontAwesomeIcon className="w-8 text-accent" icon={faCommentAlt} />
        {comments.length}{' '}
        <span className="text-l lg:text-xl">
          {comments.length > 1 ? 'Comments' : 'Comment'}
        </span>
      </div>

      <div className="px-2 py-0">
        {comments.map((comment) => {
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
      <form onSubmit={(e) => sendComment(e)}>
        <div className="py-5 flex ">
          <div className="w-3/4 m-1 ">
            <div>
              <div className="text-failure">
                {error.length > 1 ? error : null}
              </div>
              <div className="text-accent">
                {status === 'commenting' ? 'Loading . . .' : null}
              </div>
            </div>
            <input
              placeholder="@Name"
              id="name"
              className="p-1 m-1 border w-full"
            />
            <textarea
              placeholder="Comment Here !"
              id="comment"
              className="border p-1 m-1 w-full h-28 align-top"
            />
          </div>
          <button type="submit" className="mx-5">
            <FontAwesomeIcon
              className="mt-0 w-8 text-accent "
              icon={faPaperPlane}
            />
          </button>
        </div>
      </form>
    </div>
  );
}
