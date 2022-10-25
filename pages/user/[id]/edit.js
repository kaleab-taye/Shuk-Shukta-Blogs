import { useRouter } from 'next/router';
import { useState } from 'react';

export default function User(props) {
  const url = process.env.url
  const router = useRouter();
  const profileUpdateStateEnum = {
    idl: 'ild',
    publishing: 'Publishing . . .',
    deleting: 'Deleting . . .',
    success: 'Success',
    failed: 'Failed',
  };
  const [profileUpdateState, setProfileUpdateState] = useState(
    profileUpdateStateEnum.idl
  );

  const errorStateEnum = {
    idl: 'idl',
  };
  const [errorState, setErrorState] = useState(errorStateEnum.idl);

  async function handleProfileUpdate(form) {
    form.preventDefault();
    setProfileUpdateState(profileUpdateStateEnum.publishing);
    const url = process.env.url;
    // console.log('lll', form.target.userName);
    try {
      let headersList = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('user')).accessToken
        }`,
      };

      let bodyContent = JSON.stringify({
        userName: form.target.userName.value,
        firstName: form.target.firstName.value,
        lastName: form.target.lastName.value,
        password: form.target.password.value,
      });
      let response = await fetch(`${url}/api/user/${props.user.id}`, {
        method: 'POST',
        body: bodyContent,
        headers: headersList,
      });
      const resp = await response.text();
      // console.log(resp)
      if ((await response.status) === 200) {
        setProfileUpdateState(profileUpdateStateEnum.success);
        router.push(`/user/${props.user.id}?token=${props.accessToken}`);
      } else {
        throw `editing profile failed ${JSON.parse(resp).error.message}`;
      }
    } catch (error) {
      console.error('error', error);
      setProfileUpdateState(profileUpdateStateEnum.failed);
      setErrorState(error.toString());
      //   setStatus(statusEnum.notDeleted);
      //   setError(`error ${error}`);
    }
  }

  async function handleDeleteAccount(event) {
    setProfileUpdateState(profileUpdateStateEnum.deleting);
    try {     
  
      let result = await fetch(
        `${url}/api/user/${props.userId}`,
        {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${props.token}` },
        }
      );
      let res = await result.text();

      if (result.status === 200) {
        setProfileUpdateState(profileUpdateStateEnum.success);
      } else {
        throw res;
      }
    } catch (error) {
      console.error(error);
      setProfileUpdateState(profileUpdateStateEnum.failed);
      setErrorState(error);
    }
  }

  return (
    <div className="max-w-contentWid m-auto py-10">
      <form id={`profileUpdateForm`} onSubmit={(e) => handleProfileUpdate(e)}>
        <div>
          {profileUpdateState !== null &&
          profileUpdateState !== profileUpdateStateEnum.idl
            ? profileUpdateState
            : null}
          <br />
          {errorState !== null && errorState !== errorStateEnum.idl
            ? errorState
            : null}
        </div>
        <div>
          <label htmlFor="userName" className="mx-6">
            userName
          </label>
          <input
            id="userName"
            name="userName"
            className="border"
            defaultValue={props.user.userName}
          />
        </div>
        <div>
          <label htmlFor="firstName" className="mx-6">
            firstName
          </label>
          <input
            id="firstName"
            className="border"
            defaultValue={props.user.firstName}
          />
        </div>
        <div>
          <label htmlFor="lastName" className="mx-6">
            lastName
          </label>
          <input
            id="lastName"
            className="border"
            defaultValue={props.user.lastName}
          />
        </div>
        <div>
          <label htmlFor="password" className="mx-6">
            password
          </label>
          <input
            id="password"
            className="border"
            defaultValue={props.user.password}
          />
        </div>
        <button type="submit" className="text-accent font-bold text-2xl">
          update profile
        </button>
      </form>
      <button onClick={(e) => handleDeleteAccount(e)}>delete account</button>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  let url = process.env.url;
  const accessToken = context.query.token;

  try {
    let res = await fetch(`${url}/api/user/${context.params.id}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    var user = await res.json();
    if (res.status !== 200) {
      throw res;
    }
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }

  return {
    props: {
      user,
      token:accessToken,
      userId : context.params.id
    },
  };
};
