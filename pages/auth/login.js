import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
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

  const loginEnum = {
    idl: 'idl',
    loggingIn: 'Logging In',
    failed: 'failed',
    success: 'success',
  };
  const [loginState, setLoginState] = useState(loginEnum.idl);

  const errorStateEnum = { idl: 'idl' };
  const [errorState, setErrorState] = useState(errorStateEnum.idl);

  async function handleLogin(form) {
    form.preventDefault();
    setErrorState(errorStateEnum.idl);
    setLoginState(loginEnum.loggingIn);
    try {
      let headersList = {
        Accept: '*/*',
        'Content-Type': 'multipart/json',
      };

      let bodyContent = JSON.stringify({
        userName: form.target.userName.value,
        password: form.target.password.value,
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
          setLoggedInUser(e=>JSON.parse(resp));
        } else {
          localStorage.setItem('user', JSON.stringify(resp));
          setLoggedInUser(e=>resp);
        }
        // console.log('login resp', resp);
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
    <div className="grid m-auto mt-10 p-2 max-w-contentWid bg-secondary">
      <form id="signupForm" onSubmit={(e) => handleLogin(e)}>
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
          type="submit"
          placeholder="Submit"
          className="flex px-3 py-1 m-auto text-primary bg-green-400"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
