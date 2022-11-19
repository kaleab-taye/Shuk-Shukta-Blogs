import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import heroImage from '../../public/swag-lion.png';
import Button_comp from './Button_comp';
export default function ProfilePopover({ user }) {
  const userJoinedDate = new Date(user.joinedDate);
  const router = useRouter();
  const exploreBlogs = () => {
    router.push({ pathname: `/bloggers/${user.id}` });
  };
  return (
    <div className="grid m-2 gap-4">
      <div className=" grid grid-flow-col mr-auto my-auto">
        <div className="m-auto inline-block h-14 w-14 xl:h-14 xl:w-14 rounded-full ring-2 ring-secondary">
          <Image src={heroImage} alt="user image" />
        </div>
        <div className="mr-auto grid my-auto pl-3">
          <div className="mt-auto text-textColor1 text-md font-medium my-auto">
            {user.fullName}
          </div>
          <div className=" leading-none mb-auto text-textColor3 text-xs">
            @{user.userName}
          </div>
        </div>
      </div>
      <div className="grid gap-1">
        <div className="flex gap-3">
          <span className="my-auto text-textColor3 text-sm font-medium">
            Email
          </span>{' '}
          <span className="text-textColor1 text-md my-auto">{user.email}</span>
        </div>{' '}
        <div className="flex gap-3">
          <span className="my-auto text-textColor3 text-sm font-medium">
            Member since
          </span>{' '}
          <span className="text-textColor1 text-sm my-auto">
            {userJoinedDate.getDate()} - {userJoinedDate.getMonth()} -{' '}
            {userJoinedDate.getFullYear()}
          </span>
        </div>
        <div className="flex gap-3">
          <span className="my-auto text-textColor3 text-sm font-medium">
            Total blogs
          </span>{' '}
          <span className="text-textColor1 text-md my-auto">
            {user.blogs.length}
          </span>
        </div>
        <div className="mr-auto">
          <Button_comp onClick={() => exploreBlogs()} className="text-xs">
            Explore blogs
          </Button_comp>
        </div>
      </div>
    </div>
  );
}
