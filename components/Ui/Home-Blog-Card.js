import {
  faArrowDown,
  faArrowDown91,
  faArrowUp,
  faArrowUp19,
  faBars,
  faCommentAlt,
  faDotCircle,
  faEllipsis,
  faListDots,
  faPersonArrowUpFromLine,
} from '@fortawesome/free-solid-svg-icons';
import {
  faArrowAltCircleDown,
  faArrowAltCircleUp,
  faCommentDots,
  faEye,
  faUpFromLine,
} from '@fortawesome/free-regular-svg-icons';
import Image from 'next/image';
import heroImage from '../../public/swag-lion.png';
import { Popover, User } from '@nextui-org/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HomeBlogCardIcons from './Home-Blog-Card-Icons';
import Link from 'next/link';

export default function HomeBlogCard({ blog }) {
  return (
    <div className="max-w-blogCardWidLg m-auto grid my-5 pb-2 pt-4 px-5 border border-secondary rounded-md">
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
                {(new Date(blog.blogMeta.date)).toUTCString()}
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
      <div className="grid ">
        {/* blog content section */}
        <Link href={`blogs/${blog.id}`} key={blog.id}>
          <a id={blog.id}>
            <div className="grid cursor-pointer py-4 ">
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
            </div>
          </a>
        </Link>
        {/* blog meta section */}
        <div className="grid grid-cols-5 my-auto mr-auto gap-5  px-4">
          <HomeBlogCardIcons
            icon={faArrowUp}
            data_tip="up votes"
            data={blog.blogMeta.upVote}
          />
          <HomeBlogCardIcons
            icon={faArrowDown}
            data_tip="down votes"
            data={blog.blogMeta.downVote}
          />
          <HomeBlogCardIcons
            icon={faCommentDots}
            data_tip="comments"
            data={blog.blogMeta.seen}
          />

          <HomeBlogCardIcons
            icon={faEye}
            data_tip="seen"
            data={blog.blogMeta.seen}
          />

          <HomeBlogCardIcons icon={faEllipsis} data_tip="more option" />
        </div>
      </div>
    </div>
  );
}
