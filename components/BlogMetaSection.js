import {
  faArrowAltCircleDown,
  faArrowAltCircleUp,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from './Button';

export default function BlogMetaSection(props) {
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
          />

          <div className="grid gap-3 px-4 py-4">
            <div className="font-commonFont text-l lg:text-xl ">
              Author :{' '}
              <span className="text-xl lg:text-2xl">{props.blogMeta.author}</span>
            </div>
            <div className="font-commonFont text-l lg:text-xl ">
              Date :{' '}
              <span className="text-xl lg:text-2xl">{props.blogMeta.date}</span>
            </div>
            <div className="font-commonFont text-l lg:text-xl ">
              Interacted readers :{' '}
              <span className="text-xl lg:text-2xl">{props.blogMeta.seen}</span>
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
              <span className="text-xl lg:text-2xl">{props.blogMeta.upVote}</span>
            </div>
            <div className="font-commonFont text-l lg:text-xl ">
              Down votes :{' '}
              <span className="text-xl lg:text-2xl">{props.blogMeta.downVote}</span>
            </div>
            <div className="font-commonFont text-l lg:text-xl ">
              Comments :{' '}
              <span className="text-xl lg:text-2xl">
                {props.blogMeta.comment}
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
          />
          <div className="py-1 font-commonFont text-l lg:text-xl ">
            only for Author
          </div>
        </div>
      </div>
  )
}
