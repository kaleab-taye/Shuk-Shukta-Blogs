import {
  faArrowAltCircleDown,
  faArrowAltCircleUp,
} from '@fortawesome/free-regular-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Button from './Button';
import ConfirmationDialogue, { toggleModal } from './ConfirmationDialogue';

export default function BlogMetaSection(props) {
  const webUrl = process.env.url;
  const router = useRouter();

  const blogKeyEnum = {
    idl: 'idl',
    canceled: 'canceled',
    keyLogging: 'keyLogging',
    logged: 'logged',
  };
  const [blogKeyStatus, setBlogKeyStatus] = useState(blogKeyEnum.idl);
  const [blogKey, setBlogKey] = useState('');

  const [blogMeta, setBlogMeta] = useState(props.blog.blogMeta);
  const [vote, setVote] = useState('');
  const voteEnum = {
    upVoting: 'Up Voting . . .',
    downVoting: 'Down Voting . . .',
    downVoted: 'Down Voted',
    upVoted: 'Up Voted',
    unVoting: 'Removing Vote . . .',
    removed: 'Removed',
    idle: 'idle',
    failed: 'Failed',
  };
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const statusEnum = {
    processing: 'Processing . . .',
    success: 'Success',
    failure: 'Process Failed',
  };
  // check if blog has been voted
  useEffect(() => {
    try {
      if (
        JSON.parse(localStorage.getItem(props.blog.id)).vote ===
          voteEnum.downVoted ||
        JSON.parse(localStorage.getItem(props.blog.id)).vote ===
          voteEnum.upVoted
      ) {
        setVote(JSON.parse(localStorage.getItem(props.blog.id)).vote);
      } else {
        setVote(voteEnum.idle);
      }
    } catch (error) {
      setVote(voteEnum.idle);
    }
  }, []);

  let date = new Date(parseInt(blogMeta.date));

  async function upVoteHandler() {
    if (vote === voteEnum.upVoted) {
      await undoUpVote();
    } else if (vote === voteEnum.downVoted) {
      await undoDownVote();
      console.log('undo down done', vote);
      await upVote();
    } else {
      await upVote();
    }
  }
  async function downVoteHandler() {
    if (vote === voteEnum.downVoted) {
      await undoDownVote();
    } else if (vote === voteEnum.upVoted) {
      await undoUpVote();
      console.log('undo up done', vote);
      await downVote();
    } else {
      await downVote();
    }
  }

  async function undoUpVote() {
    setVote((v) => voteEnum.unVoting);
    let headersList = {
      'Content-Type': 'application/json',
    };
    let bodyContent = JSON.stringify({});
    try {
      let response = await fetch(
        `${webUrl}/api/blogs/${props.blog.id}/upvote_undo`,
        {
          method: 'POST',
          body: bodyContent,
          headers: headersList,
        }
      );
      if (response.status === 200) {
        // let newBlogMeta =
        setBlogMeta((blogMeta) => ({
          ...blogMeta,
          upVote: parseInt(blogMeta.upVote) - 1,
        }));
        setVote((v) => voteEnum.removed);
        // setTimeout(() => {
        setVote((v) => voteEnum.idle);
        // }, '3000');
        //store vote locally
        let localData = {
          ...JSON.parse(localStorage.getItem(props.blog.id)),
          vote: voteEnum.idle,
        };
        localStorage.setItem(props.blog.id, JSON.stringify(localData));
      } else {
        throw response.text();
      }
    } catch (error) {
      console.error(error);
      setError(error);
      setVote((v) => voteEnum.failed);
    }
  }
  async function undoDownVote() {
    await setVote((v) => voteEnum.unVoting);
    let headersList = {
      'Content-Type': 'application/json',
    };
    let bodyContent = JSON.stringify({});
    try {
      let response = await fetch(
        `${webUrl}/api/blogs/${props.blog.id}/downvote_undo`,
        {
          method: 'POST',
          body: bodyContent,
          headers: headersList,
        }
      );
      if (response.status === 200) {
        // let newBlogMeta = await {
        //   ...blogMeta,
        //   downVote: parseInt(blogMeta.downVote) - 1,
        // };
        // await setBlogMeta(newBlogMeta);
        setBlogMeta((blogMeta) => ({
          ...blogMeta,
          downVote: parseInt(blogMeta.downVote) - 1,
        }));
        setVote((v) => voteEnum.removed);
        // setTimeout(async () => {
        setVote((v) => voteEnum.idle);
        // }, '3000');
        //store vote locally
        let localData = {
          ...JSON.parse(localStorage.getItem(props.blog.id)),
          vote: voteEnum.idle,
        };
        localStorage.setItem(props.blog.id, JSON.stringify(localData));
      } else {
        throw response.text();
      }
    } catch (error) {
      console.error(error);
      setError(error);
      setVote((v) => voteEnum.failed);
    }
  }

  async function upVote() {
    setVote((v) => voteEnum.upVoting);
    let headersList = {
      'Content-Type': 'application/json',
    };
    let bodyContent = JSON.stringify({});
    try {
      let response = await fetch(
        `${webUrl}/api/blogs/${props.blog.id}/upvote`,
        {
          method: 'POST',
          body: bodyContent,
          headers: headersList,
        }
      );
      if (response.status === 200) {
        // let newBlogMeta = {
        //   ...blogMeta,
        //   upVote: parseInt(blogMeta.upVote) + 1,
        // };
        // setBlogMeta(newBlogMeta);
        setBlogMeta((blogMeta) => ({
          ...blogMeta,
          upVote: parseInt(blogMeta.upVote) + 1,
        }));
      }
      let data = await response.text();
      setVote((v) => voteEnum.upVoted);
      //store vote locally
      let localData = {
        ...JSON.parse(localStorage.getItem(props.blog.id)),
        vote: voteEnum.upVoted,
      };
      localStorage.setItem(props.blog.id, JSON.stringify(localData));
    } catch (error) {
      console.error(error);
      setError(error);
      setVote((v) => voteEnum.failed);
    }
  }
  async function downVote() {
    setVote((v) => voteEnum.downVoting);
    let headersList = {
      'Content-Type': 'application/json',
    };
    let bodyContent = JSON.stringify({});
    try {
      let response = await fetch(
        `${webUrl}/api/blogs/${props.blog.id}/downvote`,
        {
          method: 'POST',
          body: bodyContent,
          headers: headersList,
        }
      );
      if (response.status === 200) {
        setBlogMeta((blogMeta) => ({
          ...blogMeta,
          downVote: parseInt(blogMeta.downVote) + 1,
        }));
        setVote((v) => voteEnum.downVoted);
        //store vote locally
        let localData = {
          ...JSON.parse(localStorage.getItem(props.blog.id)),
          vote: voteEnum.downVoted,
        };
        localStorage.setItem(props.blog.id, JSON.stringify(localData));
      }
    } catch (error) {
      console.error(error);
      setVote((v) => voteEnum.idle);
    }
  }
  async function editBlog(e) {
    let insertedKey = blogKey;
    if (insertedKey) {
      try {
        setStatus(statusEnum.processing);
        setError('');
        let headersList = {
          'Content-Type': 'application/json',
        };
        let bodyContent = JSON.stringify({
          blogKey: insertedKey,
        });
        var response = await fetch(`${webUrl}/api/blogs/${props.blog.id}/key`, {
          method: 'POST',
          body: bodyContent,
          headers: headersList,
        });
        if (response.status === 200) {
          setStatus(statusEnum.success);
          router.push(`/blogs/${props.blog.id}/edit`);
        } else {
          setStatus(statusEnum.failure);
          setError('Wrong Pass Key');
        }
      } catch (error) {
        setError(`error : ${error}`);
      }
    }
  }
  useEffect(() => {
    if (blogKeyStatus === blogKeyEnum.logged) {
      editBlog();
    }
  }, [blogKeyStatus]);
  return (
    <>
      <div className="mx-auto text-center my-auto h-2">
        <span
          className={
            vote === voteEnum.upVoted
              ? 'text-success'
              : vote === voteEnum.upVoting
              ? 'text-accent'
              : vote === voteEnum.downVoted
              ? 'text-failure'
              : vote === voteEnum.downVoting
              ? 'text-accent'
              : vote === voteEnum.unVoting
              ? 'text-accent'
              : vote === voteEnum.removed
              ? 'text-success'
              : null
          }
        >
          {vote === voteEnum.upVoted
            ? voteEnum.upVoted
            : vote === voteEnum.upVoting
            ? voteEnum.upVoting
            : vote === voteEnum.downVoted
            ? voteEnum.downVoted
            : vote === voteEnum.downVoting
            ? voteEnum.downVoting
            : vote === voteEnum.unVoting
            ? voteEnum.unVoting
            : vote === voteEnum.removed
            ? voteEnum.removed
            : null}
        </span>
      </div>
      <div className="py-10 grid grid-cols-2">
        <div className="">
          {/* up vote begin */}
          <div className="flex ">
            <Button
              icon={
                <FontAwesomeIcon
                  className="w-7 sm:w-7 "
                  icon={faArrowAltCircleUp}
                />
              }
              placeholder={'Up vote'}
              color="text-success"
              background=""
              // width="w-40 sm:w-64"
              width=""
              margin=""
              // className='hover:'
              disable={
                vote === voteEnum.downVoting
                  ? true
                  : vote === voteEnum.upVoting
                  ? true
                  : vote === voteEnum.unVoting
                  ? true
                  : null
                // : vote === voteEnum.upVoted
                // ? true
                // : vote === voteEnum.downVoted
                // ? true
              }
              onClick={() => upVoteHandler()}
            />
          </div>

          <div className="grid gap-3 px-4 py-4">
            <div className="font-commonFont text-l lg:text-xl ">
              Author :{' '}
              <span className="text-xl lg:text-2xl">{props.blog.author}</span>
            </div>
            <div className="font-commonFont text-l lg:text-xl ">
              Date :{'  '}
              <span className="text-xl lg:text-2xl">
                {
                  ' ' +
                    date.getDate() +
                    '/' +
                    (date.getMonth() + 1) +
                    '/' +
                    date.getFullYear()
                  // +'  ' +
                  // date.getHours() +
                  // ':' +
                  // date.getMinutes() +
                  // ':' +
                  // date.getSeconds()
                }
              </span>
            </div>
            <div className="font-commonFont text-l lg:text-xl ">
              Interacted readers :{' '}
              <span className="text-xl lg:text-2xl">{blogMeta.seen}</span>
            </div>
          </div>
        </div>
        <div>
          {/* down vote start*/}
          <div className="flex">
            <Button
              icon={
                <FontAwesomeIcon
                  className="w-7 sm:w-7 "
                  icon={faArrowAltCircleDown}
                />
              }
              placeholder="Down vote"
              color="text-failure"
              // width="w-32 sm:w-64"
              margin=""
              width=""
              background=""
              disable={
                vote === voteEnum.downVoting
                  ? true
                  : vote === voteEnum.upVoting
                  ? true
                  : vote === voteEnum.unVoting
                  ? true
                  : null
                // : vote === voteEnum.downVoted
                // ? true
                // : vote === voteEnum.upVoted
                // ? true
              }
              // {vote === 'downVoted' ? '' : null}
              onClick={() => downVoteHandler()}
            />
          </div>

          <div className="grid gap-3 px-4 py-4">
            <div className="font-commonFont text-l lg:text-xl ">
              Up votes :{' '}
              <span className="text-xl lg:text-2xl">{blogMeta.upVote}</span>
            </div>
            <div className="font-commonFont text-l lg:text-xl ">
              Down votes :{' '}
              <span className="text-xl lg:text-2xl">{blogMeta.downVote}</span>
            </div>
            <div className="font-commonFont text-l lg:text-xl ">
              Comments :{' '}
              <span className="text-xl lg:text-2xl">
                {props.blog.comment.length}
              </span>
            </div>
          </div>
        </div>
        <div>
          <Button
            icon={
              <FontAwesomeIcon className="w-6 sm:w-6 " icon={faPenToSquare} />
            }
            placeholder="Edit"
            width=""
            margin=""
            color="text-accent"
            background=""
            onClick={() => setBlogKeyStatus(blogKeyEnum.keyLogging)}
          />
          {blogKeyStatus === blogKeyEnum.keyLogging ? (
            <ConfirmationDialogue
              blogKeyEnum={blogKeyEnum}
              setBlogKey={setBlogKey}
              setBlogKeyStatus={setBlogKeyStatus}
              blogKeyStatus={blogKeyStatus}
            />
          ) : null}

          <div className="py-1 font-commonFont text-l lg:text-xl ">
            only for Author
            <br />
            <div
              className={
                status === statusEnum.failure
                  ? `text-failure`
                  : status == statusEnum.success
                  ? 'text-success'
                  : 'text-accent'
              }
            >
              {status.length > 1 ? status : null}
            </div>
            <div className="text-failure">
              {error.length > 1 ? error : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
