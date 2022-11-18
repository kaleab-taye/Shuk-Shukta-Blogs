import {
  faEdit,
  faTrashAlt,
  faTrashCan,
} from '@fortawesome/free-regular-svg-icons';
import {
  faDeleteLeft,
  faRecycle,
  faRemove,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert, Snackbar } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import InputField from '../../../components/InputField';
import Nav from '../../../components/Nav';
import BodyLayout from '../../../components/Ui/BodyLayout';
import Button_comp from '../../../components/Ui/Button_comp';
import { userStatusSetterContext } from '../../../components/UserContextProvider';
import heroImage from '../../../public/swag-lion.png';
// import {
//   loggedInUserContext,
//   loggedInUserSetterContext,
//   userStatusContext,
//   userStatusSetterContext,
// } from './../../..components/UserContextProvider';

export default function User({ user, token, userId }) {
  const url = process.env.url;
  const router = useRouter();
  const setUserState = useContext(userStatusSetterContext);

  const [fullNameError, setFullNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [userNameError, setUserNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const updateProfileStateEnum = {
    idl: 'idl',
    updating: 'Updating . . .',
    success: 'Successfully Updated',
    failed: 'Updating Failed',
  };
  const [updateProfileState, setUpdateProfileState] = useState(
    updateProfileStateEnum.idl
  );

  const deleteProfileStateEnum = {
    idl: 'Idl',
    deleting: 'Deleting . . .',
    success: 'Successfully Deleted',
    failed: 'Failed to delete profile',
  };
  const [deleteProfileState, setDeleteProfileState] = useState(
    deleteProfileStateEnum.idl
  );

  const [errorState, setErrorState] = useState('');

  let fullNameValidation = () => {
    if (document.editProfile.fullName.value.length === 0) {
      setFullNameError("*this field can't be empty");
      return false;
    } else {
      setFullNameError('');

      return true;
    }
  };
  let emailValidation = () => {
    if (document.editProfile.email.value.length === 0) {
      setEmailError("*this field can't be empty");
      return false;
    } else {
      setEmailError('');

      return true;
    }
  };
  let userNameValidation = () => {
    if (document.editProfile.userName.value.length === 0) {
      setUserNameError("*this field can't be empty");
      return false;
    } else {
      setUserNameError('');

      return true;
    }
  };
  let passwordValidation = () => {
    if (document.editProfile.password.value.length === 0) {
      setPasswordError("*this field can't be empty");
      return false;
    } else {
      setPasswordError('');

      return true;
    }
  };
  function checkValidity(e) {
    passwordValidation();
    userNameValidation();
    emailValidation();
    fullNameValidation();
    if (
      passwordValidation() &&
      userNameValidation() &&
      emailValidation() &&
      fullNameValidation()
    ) {
      return true;
    } else {
      return false;
    }
  }
  async function handleLogout() {
    // setLogoutState(logoutStateEnum.loggingOut);
    try {
      let headersList = {
        Accept: '*/*',
        'Content-Type': 'multipart/json',
      };

      const user = JSON.parse(localStorage.getItem('user'));
      const url = process.env.url;
      let bodyContent = JSON.stringify({
        id: user.user.id,
        token: user.revalidateAccessToken,
      });

      let response = await fetch(`${url}/api/auth/logout`, {
        method: 'POST',
        body: bodyContent,
        headers: headersList,
      });
      let resp = await response.text();

      if (response.status === 200) {
        // setLogoutState(logoutStateEnum.success);
        // check type and save login data in local storage
        localStorage.removeItem('user');
        setUserState((e) => false);
      } else {
        throw resp;
      }
      return true;
    } catch (error) {
      console.error('error', error.toString() || JSON.stringify(error));
      setErrorState('error', error.toString() || JSON.stringify(error));
    return false;
    }
  }
  async function handleProfileUpdate(click) {
    if (!checkValidity()) {
      return;
    }
    setUpdateProfileState(updateProfileStateEnum.updating);
    const url = process.env.url;
    // console.log('lll', form.target.userName);
    try {
      let headersList = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };
      let bodyContent = JSON.stringify({
        userName: document.editProfile.userName.value,
        fullName: document.editProfile.fullName.value,
        email: document.editProfile.email.value,
        password: document.editProfile.password.value,
      });
      // console.log(bodyContent);
      let response = await fetch(`${url}/api/user/${user.id}`, {
        method: 'POST',
        body: bodyContent,
        headers: headersList,
      });
      // console.log('rr', await response.text());
      if (response.status === 200) {
        setUpdateProfileState(updateProfileStateEnum.success);
        // setProfileUpdateState(profileUpdateStateEnum.success);
        router.push(`/user/${user.id}?token=${token}`);
      } else {
        // setUpdateProfileState(updateProfileStateEnum.failed);

        const resp = await response.text();

        throw `editing profile failed ${JSON.parse(resp).error.message}`;
      }
    } catch (error) {
      console.error('error', error);
      setUpdateProfileState(updateProfileStateEnum.failed);

      // setProfileUpdateState(profileUpdateStateEnum.failed);
      setErrorState(error.toString());
      //   setStatus(statusEnum.notDeleted);
      //   setError(`error ${error}`);
    }
  }
  async function handleDeleteAccount(event) {
    setDeleteProfileState(deleteProfileStateEnum.deleting);
    if(!handleLogout()){
      return;
    }
    try {
      let result = await fetch(`${url}/api/user/${userId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (result.status === 200) {
        setDeleteProfileState(deleteProfileStateEnum.success);

        router.push('/');
      } else {
        let res = await result.text();
        throw res;
      }
    } catch (error) {
      console.error(error);
      setDeleteProfileState(deleteProfileStateEnum.failed);
      setErrorState(error);
    }
  }
  useEffect(() => {
    document.editProfile.password.value = user.password;
    document.editProfile.userName.value = user.userName;
    document.editProfile.email.value = user.email;
    document.editProfile.fullName.value = user.fullName;
  }, []);

  return (
    <div className="">
      <Nav contentType="notSearchable" />
      {/* snackbar start */}
      <div>
        {/* updating profile */}
        <Snackbar
          open={updateProfileState === updateProfileStateEnum.failed}
          autoHideDuration={6000}
          onClose={() => setUpdateProfileState(updateProfileStateEnum.idl)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert severity="error" sx={{ width: '100%' }}>
            {updateProfileState}
          </Alert>
        </Snackbar>
        <Snackbar
          open={updateProfileState === updateProfileStateEnum.updating}
          autoHideDuration={6000}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert severity="info" sx={{ width: '100%' }}>
            {updateProfileState}
          </Alert>
        </Snackbar>
        <Snackbar
          open={updateProfileState === updateProfileStateEnum.success}
          autoHideDuration={6000}
          onClose={() => setUpdateProfileState(updateProfileStateEnum.idl)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert severity="success" sx={{ width: '100%' }}>
            {updateProfileState}
          </Alert>
        </Snackbar>
        {/* deleting profile */}
        <Snackbar
          open={deleteProfileState === deleteProfileStateEnum.success}
          autoHideDuration={6000}
          onClose={() => setDeleteProfileState(deleteProfileStateEnum.idl)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert severity="success" sx={{ width: '100%' }}>
            {deleteProfileState}
          </Alert>
        </Snackbar>
        <Snackbar
          open={deleteProfileState === deleteProfileStateEnum.failed}
          autoHideDuration={6000}
          onClose={() => setDeleteProfileState(deleteProfileStateEnum.idl)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert severity="error" sx={{ width: '100%' }}>
            {deleteProfileState}
          </Alert>
        </Snackbar>
        <Snackbar
          open={deleteProfileState === deleteProfileStateEnum.deleting}
          autoHideDuration={6000}
          // onClose={() => setDeleteProfileState(deleteProfileStateEnum.idl)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert severity="info" sx={{ width: '100%' }}>
            {deleteProfileState}
          </Alert>
        </Snackbar>
        {/* error display snack */}
        <Snackbar
          open={errorState.length > 0}
          autoHideDuration={6000}
          onClose={() => setErrorState('')}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert severity="error" sx={{ width: '100%' }}>
            {errorState}
          </Alert>
        </Snackbar>
      </div>
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
            <form
              id="editProfile"
              name="editProfile"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="grid gap-2 w-max  mx-auto text-md ">
                <div className="grid grid-cols-5 gap-5">
                  <div className="text-textColor3 col-span-2  my-auto">
                    Full Name
                  </div>
                  <InputField
                    onChangeSetterState={fullNameValidation}
                    errorStateSetter={setFullNameError}
                    errorState={fullNameError}
                    id="fullName"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-5  gap-5">
                  <div className="text-textColor3 col-span-2  my-auto">
                    Email Address
                  </div>
                  <InputField
                    onChangeSetterState={emailValidation}
                    errorStateSetter={setEmailError}
                    errorState={emailError}
                    id="email"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-5  gap-5">
                  <div className="text-textColor3 col-span-2 my-auto">
                    Username
                  </div>
                  <InputField
                    onChangeSetterState={userNameValidation}
                    errorStateSetter={setUserNameError}
                    errorState={userNameError}
                    id="userName"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-5  gap-5">
                  <div className="text-textColor3 col-span-2 my-auto">
                    Password
                  </div>
                  <InputField
                    onChangeSetterState={passwordValidation}
                    errorStateSetter={setPasswordError}
                    errorState={passwordError}
                    id="password"
                    className="col-span-3"
                  />
                  {/* <div className="col-span-3 my-auto text-textColor1 font-bold ">
                  {user.blogs.length}
                </div> */}
                </div>

                <div className="my-5">
                  <Button_comp onClick={(e) => handleProfileUpdate(e)}>
                    Update Profile
                  </Button_comp>
                </div>
                <div className="w-full border-b border-secondary"></div>

                <div
                  onClick={(e) => handleDeleteAccount(e)}
                  className="cursor-pointer text-danger  grid grid-flow-col mr-auto gap-2 text-sm"
                >
                  <FontAwesomeIcon
                    className="w-5 h-5 my-auto"
                    icon={faTrashCan}
                  />{' '}
                  <div className="my-auto">delete account</div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </BodyLayout>
      {/*  <form id={`profileUpdateForm`} onSubmit={(e) => handleProfileUpdate(e)}>
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
    */}{' '}
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
      token: accessToken,
      userId: context.params.id,
    },
  };
};
