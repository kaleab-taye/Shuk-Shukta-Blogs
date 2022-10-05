import { faEye } from '@fortawesome/free-solid-svg-icons';
import {
  faArrowAltCircleDown,
  faArrowAltCircleUp,
} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function HomeBlogCard({blog}) {
  return (
    <>
      <div className="grid my-5   py-4 px-5 shadow-xl">
        <h1 className="text-3xl sm:text-4xl pt-2 pb-5 text-onSecondary font-commonFont">
          {blog.title}
        </h1>
        <p className="text-base sm:text-lg  ">
          {' '}
          { blog.emphasis ? blog.empasis : blog.body.substr(1,500) +  ' . . .'
          }
        </p>
        <div className="grid grid-cols-3 m-auto gap-5 p-4">
          <div className="flex ">
            <FontAwesomeIcon
              icon={faEye}
              className="w-8 sm:w-8 text-onSecondary"
            />
            <span className="m-auto p-2">{blog.seen}</span>
          </div>
          <div className="flex ">
            <FontAwesomeIcon
              icon={faArrowAltCircleUp}
              className="w-8 sm:w-8 text-success"
            />
            <span className="m-auto p-2">{blog.upVote}</span>
          </div>
          <div className="flex ">
            <FontAwesomeIcon
              icon={faArrowAltCircleDown}
              className="w-8 sm:w-8 text-failure"
            />

            <span className="m-auto p-2">{blog.downVote}</span>
          </div>
        </div>
      </div>
    </>
  );
}
