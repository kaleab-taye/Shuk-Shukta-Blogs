import {
  faArrowAltCircleDown,
  faArrowAltCircleUp,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Button from './Button';

export default function BlogMetaSection(props) {
  const webUrl = process.env.url;
  const router = useRouter();

  const [blogMeta, setBlogMeta] = useState(props.blog.blogMeta);
  const [vote, setVote] = useState('');
  const voteEnum = {
    upVoting: 'Up Voting . . .',
    downVoting: 'Down Voting . . .',
    downVoted: 'Down Voted',
    upVoted: 'Up Voted',
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

  useEffect(() => {
    // localStorage.setItem(props.blog.id,JSON.stringify({seen : 'dd'}))
    // console.log(localStorage.getItem(props.blog.id))
    try {
      if (
        JSON.parse(localStorage.getItem(props.blog.id)).vote ===
          voteEnum.downVoted ||
        JSON.parse(localStorage.getItem(props.blog.id)).vote ===
          voteEnum.upVoted
      ) {
        // console.log('found')
        setVote(JSON.parse(localStorage.getItem(props.blog.id)).vote);
      } else {
        // console.log('not found')
        setVote(voteEnum.idle);
      }
    } catch (error){
      // console.log()
      setVote(voteEnum.idle);

    }
  }, []);

  let date = new Date(parseInt(blogMeta.date));

  async function upVote() {
    setVote(voteEnum.upVoting);
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
        let newBlogMeta = {
          ...blogMeta,
          upVote: parseInt(blogMeta.upVote) + 1,
        };
        setBlogMeta(newBlogMeta);
      }
      let data = await response.text();
      setVote(voteEnum.upVoted);
      //store vote locally
      let localData = {
        ...JSON.parse(localStorage.getItem(props.blog.id)),
        vote: voteEnum.upVoted,
      };
      localStorage.setItem(props.blog.id, JSON.stringify(localData));
    } catch (error) {
      console.error(error);
      setError(error);
      setVote(voteEnum.failed);
    }
  }
  async function downVote() {
    setVote(voteEnum.downVoting);
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
        let newBlogMeta = {
          ...blogMeta,
          downVote: parseInt(blogMeta.downVote) + 1,
        };
        setBlogMeta(newBlogMeta);
      }
      let data = await response.text();
      setVote(voteEnum.downVoted);
      //store vote locally
      let localData = {
        ...JSON.parse(localStorage.getItem(props.blog.id)),
        vote: voteEnum.downVoted,
      };
      localStorage.setItem(props.blog.id, JSON.stringify(localData));
    } catch (error) {
      console.error(error);
      setVote('');
    }
  }
  async function editBlog(e) {
    let insertedKey = prompt('Please enter the blog key to edit');
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
                  className="w-6 sm:w-6 "
                  icon={faArrowAltCircleUp}
                />
              }
              placeholder={'Up vote'}
              background="bg-success"
              width="w-40 sm:w-64"
              margin=""
              disable={
                vote === voteEnum.downVoting
                  ? true
                  : vote === voteEnum.upVoted
                  ? true
                  : vote === voteEnum.upVoting
                  ? true
                  : vote === voteEnum.downVoted
                  ? true
                  : null
              }
              onClick={() => upVote()}
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
                  className="w-6 sm:w-6 "
                  icon={faArrowAltCircleDown}
                />
              }
              placeholder="Down vote"
              background="bg-failure"
              width="w-32 sm:w-64"
              margin=""
              disable={
                vote === voteEnum.downVoting
                  ? true
                  : vote === voteEnum.downVoted
                  ? true
                  : vote === voteEnum.upVoting
                  ? true
                  : vote === voteEnum.upVoted
                  ? true
                  : null
              }
              // {vote === 'downVoted' ? '' : null}
              onClick={() => downVote()}
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
              <FontAwesomeIcon
                className="w-6 sm:w-6 "
                icon={faArrowAltCircleDown}
              />
            }
            placeholder="Edit"
            width="w-28 sm:w-32"
            margin=""
            onClick={(e) => editBlog(e)}
          />
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
