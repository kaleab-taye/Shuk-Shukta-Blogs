import { useRouter } from 'next/router';
import React, { useState } from 'react';
import setUpUserLoginSuccess from '../../components/api/functions/setUpUserLoginSuccess';

export default function Signup() {
  const signupEnum = {
    idl: 'idl',
    signingUp: 'signingUp',
    failed: 'failed',
    success: 'success',
  };
  const [singUpState, setSignUpState] = useState(signupEnum.idl);

  const errorStateEnum = {
    idl: 'idl',
  };
  const [errorState, setErrorState] = useState(errorStateEnum.idl);

  const router = useRouter();

  const url = process.env.url;

  async function handleSignup(form) {
    form.preventDefault();
    setSignUpState(signupEnum.signingUp);
    try {
      let headersList = {
        Accept: '*/*',
        'Content-Type': 'multipart/json',
      };

      let bodyContent = JSON.stringify({
        userName: form.target.userName.value,
        password: form.target.password.value,
        firstName: form.target.firstName.value,
        lastName: form.target.lastName.value,
      });

      let response = await fetch(`${url}/api/auth/signup`, {
        method: 'POST',
        body: bodyContent,
        headers: headersList,
      });
      let resp = await response.text();
      if (response.status === 200) {
        setSignUpState(signupEnum.success);
        setErrorState(errorStateEnum.idl)
        setUpUserLoginSuccess(resp);
        router.push('/auth/login');
      } else {
        throw resp.toString();
      }
    } catch (error) {
      console.log('error', error.toString());
      setSignUpState(signupEnum.failed);
      try {
        setErrorState(JSON.parse(error).error.message);
      } catch (err) {
        setErrorState(error.toString() || JSON.stringify(error));
      }
    }
  }
  return (
    <div className="grid m-auto mt-10 p-2 max-w-contentWid bg-secondary">
      <form id="signupForm" onSubmit={(e) => handleSignup(e)}>
        <div className="text-accent">
          {singUpState !== signupEnum.idl ? singUpState : null}
          <br/>
          {errorState !== errorStateEnum.idl && errorState !== null
            ? errorState
            : null}        </div>
        <div className="">
          <label htmlFor="firstName">First Name</label>
          <input id="firstName" />
        </div>
        <br />
        <div className="">
          <label htmlFor="lastName">Last Name</label>
          <input id="lastName" required />
        </div>
        <br />
        <div className="">
          <label htmlFor="userName">userName </label>
          <input id="userName" required />
        </div>
        <br />
        <div className="">
          <label htmlFor="password">password </label>
          <input id="password" required />
        </div>
        <br />
        <div className="">
          <label htmlFor="profileImage">profile picture </label>
          <input type="file" id="profileImage" name="profileImage"></input>
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
