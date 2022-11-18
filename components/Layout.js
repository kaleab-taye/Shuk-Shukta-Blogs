import Header from './Header';
import UserContextProvider from './UserContextProvider';

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <UserContextProvider>{children}</UserContextProvider>
    </>
  );
}
