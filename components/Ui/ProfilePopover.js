import Image from "next/image";
import heroImage from '../../public/swag-lion.png'
export default function ProfilePopover({user}) {
  return (
    <div className="grid">
    <div className=" grid grid-flow-col mr-auto my-auto">
      <div className="m-auto inline-block h-14 w-14 xl:h-14 xl:w-14 rounded-full ring-2 ring-secondary">
        <Image src={heroImage} alt="user image" />
      </div>
      <div className="mr-auto grid my-auto pl-3">
        <div className="mt-auto text-textColor1 text-md font-medium my-auto">
          {user.fullName }
        </div>
        <div className=" leading-none mb-auto text-textColor3 text-xs">
          @{user.userName}
        </div>
      </div>
    </div>
    <div>
      <div>Total blogs {user.blogs.length}</div>
      <div>Explore blogs </div>
    </div>
  </div>  )
}
