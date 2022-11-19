import {
  faInstagram,
  faInstagramSquare,
  faLinkedin,
  faLinkedinIn,
  faSquareInstagram,
} from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

export default function Footer() {
  return (
    <div className="grid grid-rows-auto gap-2 m-auto">
      <div className="grid  grid-flow-col text-sm text-textColor3">
        <div className="ml-auto pr-1 border-r-2 hover:text-textColor1 cursor-pointer hover:font-medium border-textColor3">
          About
        </div>
        <div className="mr-auto pl-1 hover:text-textColor1 cursor-pointer hover:font-medium">
          Contact
        </div>
      </div>
      <div className="grid grid-rows-auto m-auto gap-0 ">
        <div className="text-sm text-textColor3">created and owned by</div>
        <div className="grid grid-rows-auto gap-1 m-auto">
          <div className="text-lg font-bold text-textColor1">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://qmem-developers.vercel.app/"
            >
              Qmem devs
            </a>
          </div>
          <div className=" grid grid-flow-col text-textColor3  ">
            <FontAwesomeIcon
              data-tip="Qmem Developer on Linkedin"
              className="max-w-iconWidSm m-auto hover:text-textColor1"
              icon={faLinkedinIn}
            />
            <FontAwesomeIcon
              data-tip="Qmem Developer on Instagram"
              className="max-w-iconWidSm m-auto hover:text-textColor1"
              icon={faInstagram}
            />
            <FontAwesomeIcon
              data-tip="Qmem Developer portfolio website"
              className="max-w-iconWidSm m-auto hover:text-textColor1"
              icon={faGlobe}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
