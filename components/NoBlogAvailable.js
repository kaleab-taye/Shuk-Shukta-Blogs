import PageNotFound from '../pages/404';
import Image from 'next/image';
import notFoundImage from './../public/notFound.svg'
export default function NoBlogAvailable({text}) {
  return (
    <>
      <div className="max-w-contentWid 2xl:max-w-contentWidLg mx-auto grid">
        <div className="mx-auto text-center grid text-center m-auto   font-semibold font-commonFont text-onSecondary">
          <div className="max-w-[350px]">
            <Image src={notFoundImage} alt="not found" />
          </div>
          <span className='text-xl'>No Blog Found!</span>
          <span className="text-lg text-textColor3 opacity-80">{text}</span>
        </div>
      </div>
    </>
  );
}

NoBlogAvailable.defaultProps={
text:'Go ahead and create one now.'
}
