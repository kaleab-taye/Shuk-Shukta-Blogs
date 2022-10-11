import Image from 'next/image';
import heroImage from '../public/swag-lion.png';
export default function Hero() {
  return (
    <div className=' bg-secondary mt-6'>
      <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 max-w-contentWid 2xl:max-w-contentWidLg">
        <div className=" m-auto text-center py-5">
          <h1 className='text-5xl lg:text-6xl xl:text-7xl font-semibold font-commonFont text-accent pb-2'>Shuk-Shukta Blogs</h1>
          <p className="text-xs sm:text-sm lg:text-base xl:text-lg  text-onSecondary">Get top rated ideas and share your thoughts!</p>
        </div>
        <div className="m-auto py-4 ">
          <Image className="" src={heroImage} alt="hero image" />
        </div>
      </div>
    </div>
  );
}

// export function getStaticProps(){

// }
