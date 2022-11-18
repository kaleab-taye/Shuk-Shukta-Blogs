import { Alert, Snackbar } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import InputField from '../../components/InputField';
import Nav from '../../components/Nav';
import BodyLayout from '../../components/Ui/BodyLayout';
import Button_comp from '../../components/Ui/Button_comp';
import {
  loggedInUserContext,
  loggedInUserSetterContext,
  userStatusContext,
  userStatusSetterContext,
} from '../../components/UserContextProvider';

export default function Login() {
  const router = useRouter();
  const url = process.env.url;
  // getting the user data context
  const userState = useContext(userStatusContext);
  const setUserState = useContext(userStatusSetterContext);
  const loggedInUser = useContext(loggedInUserContext);
  const setLoggedInUser = useContext(loggedInUserSetterContext);

  const [userNameError, setUserNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const loginEnum = {
    idl: 'idl',
    loggingIn: 'Logging In',
    failed: 'failed',
    success: 'success',
  };
  const [loginState, setLoginState] = useState(loginEnum.idl);

  const errorStateEnum = { idl: 'idl' };
  const [errorState, setErrorState] = useState(errorStateEnum.idl);

  useEffect(() => {
    console.log('looking for a user');
    if (router.query['userName'] && router.query['password']) {
      // automatically login if user is provided in query param
      document.getElementById('userName').value = router.query['userName'];
      document.getElementById('password').value = router.query['password'];
      handleLogin();
    }
  }, []);
  let checkUsernameValidity = () => {
    if (document.getElementById('userName').value.length === 0) {
      setUserNameError((a) => "*this field can't be empty");
      return false;
    } else {
      setUserNameError((a) => '');
      return true;
    }
  };
  let checkPasswordValidity = () => {
    if (document.getElementById('password').value.length === 0) {
      setPasswordError((a) => "*this field can't be empty");
      return false;
    }else {
      setPasswordError((a) => '');
      return true;
    }
  };
  let formValidation = () => {
    if (checkUsernameValidity() && checkPasswordValidity()) {
      return true;
    }
    else {
      return false;
    }
  };
  async function handleLogin() {
    console.log('handling login');
    setErrorState(errorStateEnum.idl);
    setLoginState(loginEnum.loggingIn);
    if (!formValidation()) {
      setLoginState(loginEnum.failed);
      return;
    }
    // get the form for submission
    const form = document.loginForm;
    try {
      let headersList = {
        Accept: '*/*',
        'Content-Type': 'multipart/json',
      };
      let bodyContent = JSON.stringify({
        userName: form.userName.value,
        password: form.password.value,
      });

      let response = await fetch(`${url}/api/auth/login`, {
        method: 'POST',
        body: bodyContent,
        headers: headersList,
      });
      let resp = await response.text();

      if (response.status === 200) {
        setLoginState(loginEnum.success);
        setErrorState(errorStateEnum.idl);
        setUserState(true);
        // check type and save login data in local storage
        if (typeof resp === 'string') {
          localStorage.setItem('user', resp);
          setLoggedInUser((e) => JSON.parse(resp));
        } else {
          localStorage.setItem('user', JSON.stringify(resp));
          setLoggedInUser((e) => resp);
        }
        router.push('/');
      } else {
        throw resp;
      }
    } catch (error) {
      console.log('error', error.toString() || JSON.stringify(error));
      setLoginState(loginEnum.failed);
      setUserState(false);
      try {
        setErrorState(JSON.parse(error).error.message);
      } catch (err) {
        setErrorState(error.toString() || JSON.stringify(error));
      }
    }
  }
  return (
    <div>
      {/* <form
        id="loginForm"
        name="loginForm"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="text-accent">
          {loginState !== loginEnum.idl ? loginState : null}
          <br />
          {errorState !== errorStateEnum.idl && errorState !== null
            ? errorState
            : null}
        </div>
        <div className="">
          <label htmlFor="userName">userName </label>
          <input id="userName" required />
        </div>
        <br />
        <div className="">
          <label htmlFor="password">password </label>
          <input id="password" required />
        </div>
        <button
          type="none"
          onClick={() => handleLogin()}
          placeholder="Submit"
          className="flex px-3 py-1 m-auto text-primary bg-green-400"
        >
          Submit
        </button>
      </form> */}
      <Nav contentType="notSearchable" />
      <BodyLayout>
        <div className=" ">
          <div className="max-w-blogCardWidLg mx-auto grid my-5 py-10 px-5 border border-secondary rounded-md">
            <div className="mx-auto text-accent font-bold text-xl lg:text-3xl">
              Signup
            </div>
            {/* snackbar notifications start */}
            <div>
              <Snackbar
                open={loginState === loginEnum.failed}
                autoHideDuration={6000}
                onClose={() => setLoginState(loginEnum.idl)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                // onClose={handleClose}
              >
                <Alert
                  // onClose={handleClose}
                  severity="error"
                  sx={{ width: '100%' }}
                >
                  failed to login
                </Alert>
              </Snackbar>
              <Snackbar
                open={loginState === loginEnum.success}
                autoHideDuration={6000}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                onClose={() => setLoginState(loginEnum.idl)}
                // onClose={handleClose}
              >
                <Alert
                  // onClose={handleClose}
                  severity="success"
                  sx={{ width: '100%' }}
                >
                  Login successful
                </Alert>
              </Snackbar>
              <Snackbar
                open={loginState === loginEnum.loggingIn}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                // onClose={() => setLoginState(loginEnum.idl)}
                // onClose={handleClose}
              >
                <Alert
                  // onClose={handleClose}
                  severity="info"
                  sx={{ width: '100%' }}
                >
                  <span>Logging In...</span>
                </Alert>
              </Snackbar>
            </div>
            {/* snackbar notifications end */}

            <form
              id="loginForm"
              name="loginForm"
              onSubmit={(e) => e.preventDefault()}
            >
              <br />

              <div className="grid grid-flow-row gap-5 mx-10">
                <div className=" grid grid-cols-5 gap-0">
                  <label
                    htmlFor="userName"
                    className="my-auto text-sm text-textColor2 col-span-2"
                  >
                    Username{' '}
                  </label>
                  <InputField
                    id="userName"
                    onChangeSetterState={checkUsernameValidity}
                    errorState={userNameError}
                    placeholder="Username"
                    className={'inline-grid grid-cols-1 col-span-3'}
                  />
                </div>
                <div className=" grid grid-cols-5 gap-0">
                  <label
                    htmlFor="password"
                    className="my-auto text-sm text-textColor2 col-span-2"
                  >
                    Password{' '}
                  </label>
                  <InputField
                    id="password"
                    onChangeSetterState={checkPasswordValidity}
                    errorState={passwordError}
                    placeholder="Password"
                    className={'inline-grid grid-cols-1 col-span-3'}
                  />
                </div>
                <div className="grid">
                  <span className="text-failure text-sm mx-auto">
                    {errorState !== errorStateEnum.idl && errorState !== null
                      ? errorState
                      : null}
                  </span>
                  <div className="grid my-5">
                    <Button_comp
                      onClick={() => handleLogin()}
                      paddingX="px-14"
                      type="submit"
                    >
                      Login
                    </Button_comp>
                  </div>
                  <span className="grid">
                    <span className="w-full border-b mt-3"></span>
                    <span className="mx-auto my-5 text-xs text-textColor2">
                      Don&apos;t have an account?{' '}
                      <span className="text-accent">
                        <Link href="/auth/signup">Signup</Link>
                      </span>
                    </span>
                  </span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </BodyLayout>
    </div>
  );
}
