import { faEye } from '@fortawesome/free-solid-svg-icons';
import {
  faArrowAltCircleDown,
  faArrowAltCircleUp,
} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import heroImage from '../public/swag-lion.png';
import { Popover, User } from '@nextui-org/react';

export default function HomeBlogCard({ blog }) {
  return (
    <div className="max-w-blogCardWidLg m-auto grid my-5 py-4 px-5 border border-secondary rounded-md">
      {/* user icon */}
      <Popover>
        <Popover.Trigger>
          <div className=" grid grid-flow-col mr-auto my-auto">
            <div className="m-auto inline-block h-11 w-11 xl:h-12 xl:w-12 rounded-full ring-2 ring-secondary">
              <Image src={heroImage} alt="user image" />
            </div>
            <div className="mr-auto grid my-auto pl-3">
              <div className="mt-auto text-textColor1 text-md font-medium my-auto">
                {blog.author.firstName + ' ' + blog.author.lastName}
              </div>
              <div className=" leading-none mb-auto text-textColor3 text-xs">
                @{blog.author.userName}
              </div>
            </div>
          </div>
        </Popover.Trigger>
        <Popover.Content css={{ px: '$4', py: '$2' }}>
          <div className="grid">
            <div className=" grid grid-flow-col mr-auto my-auto">
              <div className="m-auto inline-block h-14 w-14 xl:h-14 xl:w-14 rounded-full ring-2 ring-secondary">
                <Image src={heroImage} alt="user image" />
              </div>
              <div className="mr-auto grid my-auto pl-3">
                <div className="mt-auto text-textColor1 text-md font-medium my-auto">
                  {blog.author.firstName + ' ' + blog.author.lastName}
                </div>
                <div className=" leading-none mb-auto text-textColor3 text-xs">
                  @{blog.author.userName}
                </div>
              </div>
            </div>
            <div>
              <div>Total blogs {blog.author.blogs.length}</div>
              <div>Explore blogs </div>
            </div>
          </div>
        </Popover.Content>
      </Popover>

      <div className="grid mt-5">
        <h1 className=" break-word font-semibold text-3xl pt-2 pb-2 text-textColor1 font-commonFont">
          {blog.title.length > 92
            ? blog.title.substr(1, 92) + ' . . .'
            : blog.title}
        </h1>
        <p className=" text-md text-textColor1 break-word text-justify ">
          {' '}
          {blog.emphasis
            ? blog.empasis
            : blog.body.length > 500
            ? blog.body.substr(0, 500) + ' . . .'
            : blog.body}
        </p>
        <div className="grid grid-cols-4 m-auto gap-5 p-4">
          <div className="flex ">
            <FontAwesomeIcon
              icon={faEye}
              className="w-8 sm:w-8 text-onSecondary"
            />
            <span className="m-auto p-2">{blog.blogMeta.seen}</span>
          </div>
          <div className="flex ">
            <FontAwesomeIcon
              icon={faArrowAltCircleUp}
              className="w-8 sm:w-8 text-success"
            />
            <span className="m-auto p-2">{blog.blogMeta.upVote}</span>
          </div>
          <div className="flex ">
            <FontAwesomeIcon
              icon={faArrowAltCircleDown}
              className="w-8 sm:w-8 text-failure"
            />

            <span className="m-auto p-2">{blog.blogMeta.downVote}</span>
          </div>
          <div className="flex m-auto">
            by {blog.author.firstName + ' ' + blog.author.lastName}
          </div>
        </div>
      </div>
    </div>
  );
}
