import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Nav from '../../../components/Nav';
import BodyLayout from '../../../components/Ui/BodyLayout';
import heroImage from '../../../public/swag-lion.png';

export default function User({ user, token }) {
  // const router = useRouter();
  // try {
  //   var accessToken = JSON.parse(localStorage.getItem('user')).accessToken;
  // } catch (error) {

  //   router.push('/auth/login');
  // }
console.log(user.joinedDate)
  return (
    <div>
      <Nav contentType="notSearchable" />
      <BodyLayout>
        <div className="grid ">
          <div className="max-w-blogCardWidLg  grid gap-9 grid-flow-row my-5 pb-14 pt-10 px-5 border border-secondary rounded-md">
            <div className="mx-auto grid gap-2">
              <div className=" m-auto inline-block h-40 w-40 rounded-full ring-2 ring-secondary">
                <Image src={heroImage} alt="user image" />
              </div>
              <div className="text-sm text-textColor3 mx-auto">
                {' '}
                Joined in {new Date(user.joinedDate).toUTCString()}
              </div>
            </div>
            <div className="grid gap-2 w-max  mx-auto text-md ">
              <div className="grid grid-cols-5 gap-5">
                <div className="text-textColor3 col-span-2  my-auto">
                  First Name
                </div>
                <div className="col-span-3 my-auto text-textColor1 font-bold ">
                  {user.fullName}
                </div>
              </div>
              <div className="grid grid-cols-5  gap-5">
                <div className="text-textColor3 col-span-2  my-auto">
                  Email Address
                </div>
                <div className="col-span-3 my-auto text-textColor1 font-bold ">
                  {user.email}
                </div>
              </div>
              <div className="grid grid-cols-5  gap-5">
                <div className="text-textColor3 col-span-2 my-auto">
                  Username
                </div>
                <div className="col-span-3 my-auto text-textColor1 font-bold">
                  {user.userName}
                </div>
              </div>
              <div className="grid grid-cols-5  gap-5">
                <div className="text-textColor3 col-span-2 my-auto">
                  Total posted blogs
                </div>
                <div className="col-span-3 my-auto text-textColor1 font-bold ">
                  {user.blogs.length}
                </div>
              </div>
              <Link
              href={{
                pathname: `/user/${user.id}/edit`,
                query: { token: token },
              }}
              >
              <div className="cursor-pointer text-accent my-5 grid grid-flow-col mx-auto gap-2 text-sm">
                <FontAwesomeIcon className="w-5 h-5" icon={faEdit} />{' '}
                <div className="my-auto">Edit profile</div>
              </div>
            </Link>
              <div className="w-full border-b border-secondary"></div>
            </div>
          </div>
        </div>
      </BodyLayout>
      
    </div>
  );
}

export const getServerSideProps = async (context) => {
  try {
    let url = process.env.url;
    const accessToken = context.query.token;
    let res = await fetch(`${url}/api/user/${context.params.id}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    // console.log('res',res)
    var user = await res.json();
    if (res.status === 200) {
      return {
        props: {
          token: accessToken,
          status: res.status,
          user,
        },
      };
    } else {
      throw res;
    }
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
};
