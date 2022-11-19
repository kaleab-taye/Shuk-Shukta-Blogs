import { Alert, Snackbar } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import SetUpUserLoginSuccess from '../../components/api/functions/setUpUserLoginSuccess';
import InputField from '../../components/InputField';
import Nav from '../../components/Nav';
import BodyLayout from '../../components/Ui/BodyLayout';
import Button_comp from '../../components/Ui/Button_comp';

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

  const formErrorPlaceEnum = {
    fullName: 'Full Name',
    email: 'Email Address',
    userName: 'Username',
    password: 'Password',
    confirmPassword: 'Confirm Password',
  };
  const [fullNameError, setFullNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [userNameError, setUserNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  // const [formErrorPlace, setFormErrorPlace] = useState('');
  // const [formError, setFormError] = useState('');

  const url = process.env.url;

  let checkFullNameValidity = () => {
    if (document.getElementById('fullName').value.length === 0) {
      setFullNameError((a) => "*this field can't be empty");
      return false;
    } else {
      setFullNameError((a) => '');
      return true;
    }
  };
  let checkUsernameValidity = () => {
    if (document.getElementById('username').value.length === 0) {
      setUserNameError((a) => "*this field can't be empty");
      return false;
    } else {
      setUserNameError((a) => '');
      return true;
    }
  };
  let checkEmailValidity = () => {
    if (document.getElementById('email').value.length === 0) {
      setEmailError((a) => "*this field can't be empty");
      return false;
    } else {
      setEmailError((a) => '');
      return true;
    }
  };
  let checkConfirmPasswordValidity = () => {
    if (document.getElementById('confirmPassword').value.length === 0) {
      setConfirmPasswordError((a) => "*this field can't be empty");
      return false;
    } else if (
      document.getElementById('confirmPassword').value !==
      document.getElementById('password').value
    ) {
      setConfirmPasswordError("*your password does't match");
      return false;
    } else if (
      document.getElementById('confirmPassword').value ===
        document.getElementById('password').value &&
      document.getElementById('confirmPassword').value !== 0
    ) {
      setConfirmPasswordError('');
      setPasswordError((a) => '');
      return true;
    } else {
      setConfirmPasswordError((a) => '');
      return true;
    }
  };
  let checkPasswordValidity = () => {
    if (document.getElementById('password').value.length === 0) {
      setPasswordError((a) => "*this field can't be empty");
      return false;
    } else if (
      document.getElementById('confirmPassword').value !==
      document.getElementById('password').value
    ) {
      setConfirmPasswordError("*your password does't match");
      setPasswordError((a) => '');
      return false;
    } else if (
      document.getElementById('confirmPassword').value ===
        document.getElementById('password').value &&
      document.getElementById('confirmPassword').value !== 0
    ) {
      setConfirmPasswordError('');
      setPasswordError((a) => '');
      return true;
    } else {
      setPasswordError((a) => '');
      return true;
    }
  };
  let formValidation = () => {
    checkFullNameValidity();
    checkUsernameValidity();
    checkEmailValidity();
    checkConfirmPasswordValidity();
    checkPasswordValidity();

    // error occur checker
    if (
      checkFullNameValidity() &
      checkUsernameValidity() &
      checkEmailValidity() &
      checkConfirmPasswordValidity() &
      checkPasswordValidity()
    ) {
      return true;
    } else {
      return false;
    }
  };

  async function handleSignup(form) {
    form.preventDefault();
    setSignUpState(signupEnum.signingUp);
    if (!formValidation()) {
      setSignUpState(signupEnum.failed);
      return;
    }
    try {
      let headersList = {
        Accept: '*/*',
        'Content-Type': 'multipart/json',
      };

      let bodyContent = JSON.stringify({
        userName: document.getElementById('username').value,
        password: document.getElementById('password').value,
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
      });

      let response = await fetch(`${url}/api/auth/signup`, {
        method: 'POST',
        body: bodyContent,
        headers: headersList,
      });
      let resp = await response.text();
      if (response.status === 200) {
        setSignUpState(signupEnum.success);
        setErrorState(errorStateEnum.idl);
        // SetUpUserLoginSuccess(resp);
        // try to login the user
        console.log('routing');
        router.push({
          pathname: '/auth/login',
          query: {
            userName: document.getElementById('username').value,
            password: document.getElementById('password').value,
          },
        });
        console.log('routing end');
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
    <div>
      <Nav contentType="notSearchable" />
      <BodyLayout>
        <div className="">
          <div className="mx-auto max-w-blogCardWidLg mx-auto grid my-5 py-10 px-5 border border-secondary rounded-md">
            <div className="mx-auto text-accent font-bold text-xl lg:text-3xl">
              Signup
            </div>
            {/* snackbar notifications start */}
            <div>
              <Snackbar
                open={singUpState === signupEnum.failed}
                autoHideDuration={6000}
                onClose={() => setSignUpState(signupEnum.idl)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                // onClose={handleClose}
              >
                <Alert
                  // onClose={handleClose}
                  severity="error"
                  sx={{ width: '100%' }}
                >
                  failed to signup
                </Alert>
              </Snackbar>
              <Snackbar
                open={singUpState === signupEnum.success}
                autoHideDuration={6000}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                onClose={() => setSignUpState(signupEnum.idl)}
                // onClose={handleClose}
              >
                <Alert
                  // onClose={handleClose}
                  severity="success"
                  sx={{ width: '100%' }}
                >
                  signingUp successful
                </Alert>
              </Snackbar>
              <Snackbar
                open={singUpState === signupEnum.signingUp}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                // onClose={() => setSignUpState(signupEnum.idl)}
                // onClose={handleClose}
              >
                <Alert
                  // onClose={handleClose}
                  severity="info"
                  sx={{ width: '100%' }}
                >
                  <span>signingup...</span>
                </Alert>
              </Snackbar>
            </div>
            {/* snackbar notifications end */}

            <form id="signupForm" onSubmit={(e) => handleSignup(e)}>
              <br />

              <div className="grid grid-flow-row gap-5 mx-10">
                <div className=" grid grid-cols-5 gap-0">
                  <label
                    htmlFor="fullName"
                    className="my-auto text-sm text-textColor2 col-span-2"
                  >
                    Full Name
                  </label>
                  <InputField
                    id="fullName"
                    onChangeSetterState={checkFullNameValidity}
                    errorState={fullNameError}
                    errorStateSetter={setFullNameError}
                    placeholder="Full Name"
                    className={'inline-grid grid-cols-1  col-span-3'}
                  />
                </div>
                <div className=" grid grid-cols-5 gap-0">
                  <label
                    htmlFor="email"
                    className="my-auto text-sm text-textColor2 col-span-2"
                  >
                    {' '}
                    Email Address
                  </label>
                  <InputField
                    id="email"
                    onChangeSetterState={checkEmailValidity}
                    errorState={emailError}
                    placeholder="Email Address"
                    className={'inline-grid grid-cols-1 col-span-3'}
                  />
                </div>
                <div className=" grid grid-cols-5 gap-0">
                  <label
                    htmlFor="userName"
                    className="my-auto text-sm text-textColor2 col-span-2"
                  >
                    Username{' '}
                  </label>
                  <InputField
                    id="username"
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
                <div className=" grid grid-cols-5 gap-0">
                  <label
                    htmlFor="confirmPassword"
                    className="my-auto text-sm text-textColor2 col-span-2"
                  >
                    Confirm Password{' '}
                  </label>
                  <InputField
                    id="confirmPassword"
                    onChangeSetterState={checkConfirmPasswordValidity}
                    errorState={confirmPasswordError}
                    placeholder="Confirm Password"
                    className={'inline-grid grid-cols-1 col-span-3'}
                  />
                </div>{' '}
                <div className="grid">
                <span className="text-failure text-sm mx-auto">
                {errorState !== errorStateEnum.idl && errorState !== null
                      ? errorState
                      : null}
                  </span>
                  <div className="grid my-5">
                    <Button_comp  paddingX='px-14' type="submit">
                      Submit
                    </Button_comp>
                  </div>
                  <span className="grid">
                    <span className="w-full border-b mt-3"></span>
                    <span className="mx-auto my-5 text-xs text-textColor2">
                      Already have an account?{' '}
                      
                      <span className="text-accent">
                      <Link href="/auth/login">
                        login
                      </Link>
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
