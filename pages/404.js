import Image from 'next/image';
import image from '../public/404.png';

export default function pageNotFound() {
  return (
    <div className='h-screen flex align-middle'>
      <div className="max-w-xs sm:max-w-sm m-auto">
        <Image className="m-20 text-accent " src={image} alt="404 page not found" />
      </div>
    </div>
  );
}
