import Link from 'next/link';
import { useRouter } from 'next/router';

export default function User(props) {
  // const router = useRouter();
  // try {
  //   var accessToken = JSON.parse(localStorage.getItem('user')).accessToken;
  // } catch (error) {

  //   router.push('/auth/login');
  // }

  return (
    <div>
      <div>id :- {props.user.id}</div>
      <div>userName :- {props.user.userName}</div>
      <div>firstName :- {props.user.firstName}</div>
      <div>lastName :- {props.user.lastName}</div>
      <div>joinedDate :- {props.user.joinedDate}</div>
      <Link
        href={{
          pathname: `/user/${props.user.id}/edit`,
          query: { token: props.token },
        }}
      >
        <button>edit profile</button>
      </Link>
      
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
