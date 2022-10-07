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

  async function upVote() {
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
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="py-10 grid grid-cols-2">
      <div className="">
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
          onClick={() => upVote()}
        />

        <div className="grid gap-3 px-4 py-4">
          <div className="font-commonFont text-l lg:text-xl ">
            Author :{' '}
            <span className="text-xl lg:text-2xl">{blogMeta.author}</span>
          </div>
          <div className="font-commonFont text-l lg:text-xl ">
            Date : <span className="text-xl lg:text-2xl">{blogMeta.date}</span>
          </div>
          <div className="font-commonFont text-l lg:text-xl ">
            Interacted readers :{' '}
            <span className="text-xl lg:text-2xl">{blogMeta.seen}</span>
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
          placeholder="Down vote"
          background="bg-failure"
          width="w-32 sm:w-64"
          margin=""
        />
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
              {props.blog.blogMeta.comment}
            </span>
          </div>
        </div>
      </div>
      <div>
        <Link href={`/blogs/${props.blog.id}/edit`}>
          <a>
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
            />
          </a>
        </Link>
        <div className="py-1 font-commonFont text-l lg:text-xl ">
          only for Author
        </div>
      </div>
    </div>
  );
}
