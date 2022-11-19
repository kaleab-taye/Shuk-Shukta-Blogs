import { faCommentAlt } from '@fortawesome/free-regular-svg-icons';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { useContext, useState } from 'react';
import heroImage from './../public/swag-lion.png';
import Button_comp from './Ui/Button_comp';
import {
  loggedInUserContext,
  loggedInUserSetterContext,
  userStatusContext,
  userStatusSetterContext,
} from './UserContextProvider';

export default function CommentSection(props) {
  const [comments, setComments] = useState(props.comments);
  const id = props.id;
  const [status, setStatus] = useState('uncommented');
  const [error, setError] = useState('');
  // context
  const userStatus = useContext(userStatusContext);
  const loggedInUser = useContext(loggedInUserContext);

  async function sendComment(form) {
    form.preventDefault();
    setStatus('commenting');
    let webUrl = process.env.url;

    let commenter = 'Anonymous';
    let headersList = {
      'Content-Type': 'application/json',
    };

    if (userStatus) {
      commenter =
        loggedInUser.user.fullName;
    }
    if (form.target.comment.value.length < 1) {
      setStatus('uncommented');
      return;
    }

    let bodyContent = JSON.stringify({
      by: commenter,
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
        form.target.comment.value = '';
      } else {
        setError('error publishing content @1 please try again');
        setStatus('uncommented');
      }
    } catch (error) {
      console.error('error', error);
      setStatus('uncommented');
      setError(`error ${error.toString()}`);
    }
  }

  return (
    <div className="grid w-[100%]">
      <div className="text-textColor3 py-1 grid gap-2 grid-flow-col mr-auto">
        <div className="flex mr-auto ml-2">comments </div>
        <FontAwesomeIcon
          className="w-4 h-4 mr-auto my-auto text-textColor3"
          icon={faCommentAlt}
        />
      </div>
      <div className=" px-2 sm:px-5 border border-secondary rounded-md max-wid-contentWid grid">
        <div className="px-5 py-0 max-h-96 overflow-auto">
          {comments.map((comment) => {
            return (
              <div className="" key={comment.id}>
                <div className="py-3 text-md grid">
                  <div className=" grid grid-flow-col mr-auto mb-auto">
                    <div className="mt-1 mb-auto inline-block h-9 w-9 xl:h-10 xl:w-10 rounded-full ring-2 ring-secondary">
                      <Image src={heroImage} alt="user image" />
                    </div>
                    <div className="mr-auto grid my-auto pl-3">
                      <div className="mt-auto text-textColor1 text-md font-medium my-auto">
                        {comment.by}
                      </div>
                      <div className=" break-words overflow-hidden leading-none mb-auto text-textColor2 text-sm">
                        {comment.comment}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <form onSubmit={(e) => sendComment(e)}>
          <div className="py-5 grid ">
            <div className="sm:m-1 grid">
              <div>
                <div className="text-failure">
                  {error.length > 1 ? error : null}
                </div>
                <div className="text-accent">
                  {status === 'commenting' ? 'Loading . . .' : null}
                </div>
              </div>
              <div className=" m-auto grid-cols-10 grid gap-1 sm:gap-5 grid-flow-col">
                <div className=" mb-auto inline-block h-9 w-9 xl:h-10 xl:w-10 rounded-full ring-2 ring-secondary">
                  <Image src={heroImage} alt="user image" />
                </div>
                <textarea
                  placeholder="Comment Here !"
                  id="comment"
                  className="col-span-7 border rounded p-1 w-full h-10 align-top"
                />
                <div className=" col-span-2 mb-auto">
                <Button_comp className='text-xs sm:text-sm' data_tip='comment on this blog' type="submit" >
                  comment
                </Button_comp>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
