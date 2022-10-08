import {
  faArrowAltCircleDown,
  faArrowAltCircleUp,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useState } from 'react';
import Button from './Button';

export default function BlogMetaSection(props) {
  const webUrl = process.env.url;

  const [blogMeta, setBlogMeta] = useState(props.blog.blogMeta);
  const [vote, setVote] = useState('');

  let date = new Date(parseInt(blogMeta.date));

  async function upVote() {
    setVote('upVoting');
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
      console.log(data);
      setVote('upVoted');
    } catch (error) {
      console.log(error);
      setVote('');
    }
  }
  async function downVote() {
    setVote('downVoting');
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
      console.log(data);
      setVote('downVoted');
    } catch (error) {
      console.log(error);
      setVote('');
    }
  }
  async function editBlog(e){
let insertedKey = prompt("Please enter the blog key to edit")
console.log(insertedKey)
  }
  return (
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
            disable={vote === 'upVoting' ? true : null}
            onClick={() => upVote()}
          />
          <span className="mx-2 my-auto text-success">
            {vote === 'upVoted' ? 'voted' : null}
          </span>
          <span className="mx-2 my-auto text-accent">
            {vote === 'upVoting' ? 'voting' : null}
          </span>
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
            disable={vote === 'downVoting' ? true : null}
            // {vote === 'downVoted' ? '' : null}
            onClick={() => downVote()}
          />
          <span className="mx-2 my-auto text-accent">
            {vote === 'downVoting' ? 'voting' : null}
          </span>
          <span className="mx-2 my-auto text-failure">
            {vote === 'downVoted' ? 'voted' : null}
          </span>
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
          onClick={(e)=>editBlog(e)}
        />
        <div className="py-1 font-commonFont text-l lg:text-xl ">
          only for Author
        </div>
      </div>
    </div>
  );
}
