import Image from 'next/image';
import Link from 'next/link';
import heroImage from '../../public/swag-lion.png';
import Button_comp from './Button_comp';

export default function Blogger_Card({ blogger }) {
  return (
    <div className="max-w-blogCardWidLg m-auto m-5 p-5 border rounded-lg border-secondary grid grid-flow-col">
      <div className="m-auto grid">
        {' '}
        <div className="m-auto inline-block h-40 w-40 rounded-full ring-2 ring-secondary">
          <Image src={heroImage} alt="user image" />
        </div>
        <div className="mr-auto font-bold text-xl text-textColor1">
          {blogger.firstName + ' ' + blogger.lastName}
        </div>
        <div className="mr-auto text-textColor3 text-sm">
          Joined in {new Date(blogger.joinedDate).toUTCString()}
        </div>
      </div>
      <div className="grid m">
        <div className="grid grid-flow-col gap-0 mt-5">
          <div className="grid grid-rows-3 text-textColor3 text-md gap-2 mb-auto">
            <div>Email address</div>
            <div>Username</div>
            <div>Total posted blogs</div>
          </div>
          <div className="grid grid-rows-3 text-textColor1 text-lg font-medium gap-1 mb-auto">
            <div>{blogger.email}ff</div>
            <div>{blogger.userName}</div>
            <div>{blogger.blogs.length}</div>
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
