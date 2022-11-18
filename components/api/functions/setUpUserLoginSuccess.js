import { useRouter } from 'next/router';
import  { useContext } from 'react';
import {
  loggedInUserContext,
  loggedInUserSetterContext,
  userStatusContext,
  userStatusSetterContext,
} from '../../UserContextProvider';

export default function SetUpUserLoginSuccess(user) {
  const userState = useContext(userStatusContext);
  const setUserState = useContext(userStatusSetterContext);
  const loggedInUser = useContext(loggedInUserContext);
  const setLoggedInUser = useContext(loggedInUserSetterContext);
  const router = useRouter();

  // localStorage.getItem(user.id)

  // localStorage.setItem('user', JSON.stringify(user));

  // setLoginState(loginEnum.success);
  // setErrorState(errorStateEnum.idl);
  try {
    setUserState(true);
    // check type and save login data in local storage
    if (typeof user === 'string') {
      localStorage.setItem('user', user);
      setLoggedInUser((e) => JSON.parse(user));
    } else {
      localStorage.setItem('user', JSON.stringify(user));
      setLoggedInUser((e) => user);
    }
    // console.log('login resp', resp);
    router.push('/');
  } catch (error) {
    throw 'settingup login failed '+error
  }

  return;
}
