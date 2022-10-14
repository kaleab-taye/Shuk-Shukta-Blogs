import { faArrowAltCircleLeft } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';

export default function BackButton(props) {
  const router = useRouter();
  function goBack() {
    if (props.to) {
      router.push(`${props.to}`);
    } else {
      window.history.back();
    }
  }
  return (
    <div
      onClick={() => goBack()}
      className=" cursor-pointer text-accent w-10 sm:w-10 m-auto"
    >
      <FontAwesomeIcon className='hover:drop-shadow-xl' icon={faArrowAltCircleLeft} />
    </div>
  );
}
