import React, { useEffect, useState } from 'react';
export const loggedInUserContext = React.createContext();
export const loggedInUserSetterContext = React.createContext();
export const userStatusContext = React.createContext();
export const userStatusSetterContext = React.createContext();

export default function UserContextProvider({children}) {
  const [loggedUser, setLoggedUser] = useState({});
  const [userStatusState, setUserStatusState] = useState(false);

  useEffect(() => {
    try {
      var user = JSON.parse(localStorage.getItem('user'));
      if (user.accessToken) {
        setUserStatusState(true);
        setLoggedUser(user)
        console.log('uou',userStatusState)
        console.log('joj',loggedUser)
      } else {
        throw 'user not found';
      }
    } catch (error) {
      console.error('critic',error)
      setUserStatusState(false);
    }
  }, []);
  return (
    <loggedInUserContext.Provider value={loggedUser}>
      <loggedInUserSetterContext.Provider value={setLoggedUser}>
        <userStatusContext.Provider value={userStatusState}>
          <userStatusSetterContext.Provider value={setUserStatusState}>
            {children}
          </userStatusSetterContext.Provider>
        </userStatusContext.Provider>
      </loggedInUserSetterContext.Provider>
    </loggedInUserContext.Provider>
  );
}
