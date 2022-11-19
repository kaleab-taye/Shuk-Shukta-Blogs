import Image from 'next/image';
import Link from 'next/link';
import heroImage from '../../public/swag-lion.png';
import Button_comp from './Button_comp';

export default function Blogger_Card({ blogger }) {
  return (
    <div className="max-w-blogCardWidLg m-auto m-5 p-5 border rounded-lg border-secondary grid sm:grid-flow-col">
      <div className="m-auto grid">
        {' '}
        <div className="m-auto inline-block h-40 w-40 rounded-full ring-2 ring-secondary">
          <Image src={heroImage} alt="user image" />
        </div>
        <div className="mx-auto font-bold text-xl text-textColor1">
          {blogger.fullName}
        </div>
        <div className="mx-auto text-center text-textColor3 text-sm">
          Joined in {new Date(blogger.joinedDate).toUTCString()}
        </div>
      </div>
      <div className="grid mx-auto">
        <div className="grid grid-flow-col gap-1 my-5">
          <div className="grid  text-textColor3 text-md gap-2 mb-auto">
            <div className="grid grid-cols-5 gap-2">
              <div className="col-span-2 my-auto text-textColor3 font-medium text-md">
                Email address
              </div>
              <div className="break-all col-span-3   text-textColor1 font-bold text-lg my-auto">
                {blogger.email}
              </div>
            </div>
            <div className="grid grid-cols-5 gap-2">
              <div className="col-span-2 my-auto text-textColor3 font-medium text-md">
                Username
              </div>
              <div className="break-all col-span-3   text-textColor1 font-bold text-lg my-auto">
                {blogger.userName}
              </div>
            </div>
            <div className="grid grid-cols-5 gap-2">
              <div className="col-span-2 my-auto text-textColor3 font-medium text-md">
                Total posted blogs
              </div>
              <div className="col-span-3 text-textColor1 font-bold text-lg my-auto">
                {blogger.blogs.length}
              </div>
            </div>
          </div>
        </div>
        <div>
          <Link href={`/bloggers/${blogger.id}`}>
            <a>
              <Button_comp className="px-10">See blogs</Button_comp>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
