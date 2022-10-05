import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCirclePlus,
  faSearch,
  faSort,
} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

export default function Nav() {
  return (
    <div className="sticky top-0 bg-primary border-b py-2">
      <div className="max-w-contentWid mx-auto grid grid-cols-4">
        <div className="bg-secondary col-start-1 col-end-3 mx-auto rounded-2xl">
          {/* search */}
          <div className=" py-2 px-3 flex m-auto">
            <div className="m-auto flex">
              <input
                className="bg-secondary p-1 w-20 sm:w-40 md:w-72 lg:w-96"
                placeholder="Search"
              />
              <FontAwesomeIcon
                className="w-6 sm:w-6 text-onSecondary"
                icon={faSearch}
              />
            </div>
          </div>
        </div>
        <div className="m-auto ">
          <FontAwesomeIcon
            className="w-6 sm:w-6 text-onSecondary"
            icon={faSort}
          />
        </div>
        <div className="m-auto flex">
          <Link href='/blogs/new'>
            <FontAwesomeIcon
              className="w-8 sm:w-8 text-onSecondary"
              icon={faCirclePlus}
            />
          </Link>
          {/*           <div className='m-auto px-2 font-bold font-commonFont tracking-wide text-2xl'>New</div>
           */}
        </div>
      </div>
    </div>
  );
}
