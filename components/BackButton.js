import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
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
    <div onClick={() => goBack()} className="text-accent w-12 sm:w-14 m-auto  ">
      <FontAwesomeIcon icon={faArrowAltCircleLeft} />
    </div>
  );
}
