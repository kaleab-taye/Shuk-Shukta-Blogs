import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBlog,
  faCirclePlus,
  faCircleUser,
  faHome,
  faSearch,
  faSort,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import {
  blogsContext,
  fullBlogsContext,
  setBlogContext,
} from './BlogContextProvider';
import { useRouter } from 'next/router';
import { Dropdown } from '@nextui-org/react';
import {
  loggedInUserContext,
  loggedInUserSetterContext,
  userStatusContext,
  userStatusSetterContext,
} from './UserContextProvider';

export default function Nav({ contentType }) {
  var router = useRouter();
  // user context
  const userState = useContext(userStatusContext);
  const setUserState = useContext(userStatusSetterContext);
  const loggedInUser = useContext(loggedInUserContext);
  const setLoggedInUser = useContext(loggedInUserSetterContext);
  console.log('ll', loggedInUser);

  // blog context
  const blogs = useContext(blogsContext);
  const fullBlogs = useContext(fullBlogsContext);
  const setBlogs = useContext(setBlogContext);

  const [sortBy, setSortBy] = useState('id');

  const logoutStateEnum = {
    idl: 'idl',
    loggingOut: 'Logging out . . .',
    success: 'Success',
    failed: 'Failed',
  };
  const [logoutState, setLogoutState] = useState(logoutStateEnum.idl);

  const contentSearchableStateEnum = {
    idl: 'idl',
    searchable: 'searchable',
    notSearchable: 'notSearchable',
  };
  const [contentSearchableState, setContentSearchableState] = useState(
    contentType ? contentType : contentSearchableStateEnum.searchable
  );

  // search feature
  function Search(searchWord) {
    let result = [];
    fullBlogs.forEach((singleData) => {
      if (
        JSON.stringify(singleData)
          .toLowerCase()
          .includes(searchWord.target.value?.toString().toLowerCase())
      ) {
        result.push(singleData);
      }
    });
    setBlogs(result);
  }
  // sort feature
  useEffect(() => {
    if (contentSearchableState === contentSearchableStateEnum.searchable) {
      setBlogs([]);
      if (
        (fullBlogs.length > 0 && sortBy === 'id') ||
        sortBy === 'title' ||
        sortBy === 'author' ||
        sortBy === 'body'
      ) {
        if (fullBlogs.length > 0) {
          let blogList = fullBlogs.sort((a, b) =>
            a[sortBy] > b[sortBy] ? 1 : -1
          );
          setBlogs([...blogList]);
        } else {
          setBlogs(fullBlogs);
        }
      } else if (
        (fullBlogs.length > 0 && sortBy === 'seen') ||
        sortBy === 'upVote' ||
        sortBy === 'downVote' ||
        sortBy === 'date'
      ) {
        if (fullBlogs.length > 0) {
          var blogList = fullBlogs.sort((a, b) =>
            a.blogMeta[sortBy] > b.blogMeta[sortBy] ? -1 : 1
          );
          setBlogs([...blogList]);
        } else {
          setBlogs(fullBlogs);
        }
      } else {
        setBlogs(fullBlogs);
      }
    }
  }, [sortBy, fullBlogs]);

  async function handleLogout() {
    setLogoutState(logoutStateEnum.loggingOut);
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
        setLogoutState(logoutStateEnum.success);
        // check type and save login data in local storage
        localStorage.removeItem('user');
        setUserState((e) => false);
        router.reload();
      } else {
        throw resp;
      }
    } catch (error) {
      console.error('error', error.toString() || JSON.stringify(error));
    }
  }

  return (
    <div className="z-50 sticky top-0 bg-primary border-b py-1  mt-0">
      <div className="max-w-contentWid 2xl:max-w-contentWidLg m-auto px-2 grid grid-cols-2">
        <div className="text-accent font-bold text-2xl my-auto">
          Shuk-Shukta Blogs
        </div>
        {userState === true &&
        contentSearchableState === contentSearchableStateEnum.searchable ? (
          <>
            {/* user logged in + searchable nav start */}
            <div className="grid grid-cols-10 gap-1 ml-auto my-auto max-w-navIconContainerWid3">
              <Link href={'/'} className="">
                <div data-tip="Home" className="p-2  my-auto ">
                  <FontAwesomeIcon
                    className="cursor-pointer w-5 text-onSecondary m-auto"
                    icon={faHome}
                  />
                </div>
              </Link>
              <Link href="/bloggers">
                <div data-tip="Bloggers" className="p-2  my-auto">
                  <FontAwesomeIcon
                    className="cursor-pointer w-6 text-onSecondary m-auto"
                    icon={faUsers}
                  />
                </div>
              </Link>
              {/* blogs */}
              <Dropdown offset={0} className="text-sm">
                <Dropdown.Trigger>
                  <div data-tip="Blogs" className="p-2 my-auto  max-w-iconWid">
                    <FontAwesomeIcon
                      className="cursor-pointer w-5 text-onSecondary m-auto"
                      icon={faBlog}
                    />
                  </div>
                </Dropdown.Trigger>
                <div className="w-28">
                  <Dropdown.Menu aria-label="Static Actions" className="py-0">
                    <Dropdown.Item
                      key="myBlogs"
                      className=" text-textColor1 text-sm p-0 my-2"
                    >
                      <Link
                        href={{
                          pathname: `/user/${loggedInUser.user.id}/blogs`,
                          query: { token: loggedInUser.accessToken },
                        }}
                      >
                        <div className="p-2 ">My Blogs</div>
                      </Link>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </div>
              </Dropdown>
              {/* sort */}
              <Dropdown offset={0} className="text-sm">
                <Dropdown.Trigger>
                  <div data-tip="Sort" className="p-2 my-auto">
                    <FontAwesomeIcon
                      className="cursor-pointer w-3 text-onSecondary m-auto"
                      icon={faSort}
                    />
                  </div>
                </Dropdown.Trigger>
                <div className="w-28">
                  <Dropdown.Menu aria-label="Static Actions" className="py-0">
                    <Dropdown.Item
                      key="date"
                      className=" text-textColor1 text-sm p-0 my-2"
                    >
                      <div className="p-2 " onClick={() => setSortBy('date')}>
                        Date
                      </div>
                    </Dropdown.Item>
                    <Dropdown.Item
                      key="title"
                      withDivider
                      className=" text-textColor1 text-sm p-0 my-2"
                    >
                      <div className="p-2 " onClick={() => setSortBy('title')}>
                        Title
                      </div>
                    </Dropdown.Item>
                    <Dropdown.Item
                      key="upvotes"
                      withDivider
                      className=" text-textColor1 text-sm p-0 my-2"
                    >
                      <div className="p-2 " onClick={() => setSortBy('upVote')}>
                        Up Votes
                      </div>
                    </Dropdown.Item>
                    <Dropdown.Item
                      key="downVote"
                      withDivider
                      className=" text-textColor1 text-sm p-0 my-2"
                    >
                      <div
                        className="p-2 "
                        onClick={() => setSortBy('downVote')}
                      >
                        Down Votes
                      </div>
                    </Dropdown.Item>
                    <Dropdown.Item
                      key="author"
                      withDivider
                      className=" text-textColor1 text-sm p-0 my-2"
                    >
                      <div className="p-2 " onClick={() => setSortBy('author')}>
                        Author
                      </div>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </div>
              </Dropdown>
              <Link href="/blogs/new">
                <div data-tip="Add New Blog" className="p-2 my-auto">
                  <FontAwesomeIcon
                    className="cursor-pointer w-5 text-onSecondary m-auto"
                    icon={faCirclePlus}
                  />
                </div>
              </Link>
              <div className=" col-span-4 p-2  my-auto">
                <div className="m-auto rounded-lg grid grid-cols-5 bg-secondary gap-0">
                  <input
                    id="search"
                    placeholder="Search"
                    className="m-auto max-w-searchBarWid col-span-4 py-1 px-2  mx-1 rounded focus:border-0  focus:outline-none border-none placeholder:text-textColor1 text-textColor1 bg-secondary text-sm"
                    onChange={(e) => Search(e)}
                  />
                  <label htmlFor="search" className="m-auto">
                    <FontAwesomeIcon
                      className="cursor-pointer w-4 text-onSecondary my-auto"
                      icon={faSearch}
                    />
                  </label>
                </div>
              </div>
              <Dropdown offset={0} className="text-sm">
                <Dropdown.Trigger>
                  <div
                    data-tip="User Option"
                    className="p-2  my-auto max-w-iconWid"
                  >
                    <FontAwesomeIcon
                      className="cursor-pointer w-5 text-onSecondary m-auto"
                      icon={faCircleUser}
                    />
                  </div>
                </Dropdown.Trigger>
                <div className="w-28">
                  <Dropdown.Menu aria-label="Static Actions" className="py-0">
                    <Dropdown.Item
                      key="profile"
                      className=" text-textColor1 text-sm p-0 my-2"
                    >
                      <Link
                        href={{
                          pathname: `/user/${loggedInUser.user.id}`,
                          query: { token: loggedInUser.accessToken },
                        }}
                      >
                        <div className="p-2 ">Profile</div>
                      </Link>
                    </Dropdown.Item>

                    <Dropdown.Item
                      key="delete"
                      withDivider
                      color="error"
                      className="text-danger text-sm p-0 my-2"
                    >
                      <div className="p-2" onClick={() => handleLogout()}>
                        Logout
                      </div>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </div>
              </Dropdown>
            </div>
            {/* user logged in + searchable nav end */}
          </>
        ) : userState === false &&
          contentSearchableState === contentSearchableStateEnum.searchable ? (
          <>
            {/* user not logged in + searchable nav start */}
            <div className="grid grid-cols-10 gap-1 ml-auto my-auto max-w-navIconContainerWid2">
              <Link href={'/'}>
                <div data-tip="Home" className="p-2  my-auto ">
                  <FontAwesomeIcon
                    className="cursor-pointer w-5 text-onSecondary m-auto"
                    icon={faHome}
                  />
                </div>
              </Link>
              <Link href="/bloggers">
                <div data-tip="Bloggers" className="p-2  my-auto">
                  <FontAwesomeIcon
                    className="cursor-pointer w-6 text-onSecondary m-auto"
                    icon={faUsers}
                  />
                </div>
              </Link>

              <Dropdown offset={0} className="text-sm">
                <Dropdown.Trigger>
                  <div data-tip="Sort" className="p-2 my-auto">
                    <FontAwesomeIcon
                      className="cursor-pointer w-3 text-onSecondary m-auto"
                      icon={faSort}
                    />
                  </div>
                </Dropdown.Trigger>
                <div className="w-28">
                  <Dropdown.Menu aria-label="Static Actions" className="py-0">
                    <Dropdown.Item
                      key="date"
                      className=" text-textColor1 text-sm p-0 my-2"
                    >
                      <div className="p-2 " onClick={() => setSortBy('date')}>
                        Date
                      </div>
                    </Dropdown.Item>
                    <Dropdown.Item
                      key="title"
                      withDivider
                      className=" text-textColor1 text-sm p-0 my-2"
                    >
                      <div className="p-2 " onClick={() => setSortBy('title')}>
                        Title
                      </div>
                    </Dropdown.Item>
                    <Dropdown.Item
                      key="upvotes"
                      withDivider
                      className=" text-textColor1 text-sm p-0 my-2"
                    >
                      <div className="p-2 " onClick={() => setSortBy('upVote')}>
                        Up Votes
                      </div>
                    </Dropdown.Item>
                    <Dropdown.Item
                      key="downVote"
                      withDivider
                      className=" text-textColor1 text-sm p-0 my-2"
                    >
                      <div
                        className="p-2 "
                        onClick={() => setSortBy('downVote')}
                      >
                        Down Votes
                      </div>
                    </Dropdown.Item>
                    <Dropdown.Item
                      key="author"
                      withDivider
                      className=" text-textColor1 text-sm p-0 my-2"
                    >
                      <div className="p-2 " onClick={() => setSortBy('author')}>
                        Author
                      </div>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </div>
              </Dropdown>

              <div className=" col-span-4 p-2  my-auto">
                <div className="m-auto rounded-lg grid grid-cols-5 bg-secondary gap-0">
                  <input
                    id="search"
                    placeholder="Search"
                    className="m-auto max-w-searchBarWid col-span-4 py-1 px-2  mx-1 rounded focus:border-0  focus:outline-none border-none placeholder:text-textColor1 text-textColor1 bg-secondary text-sm"
                    onChange={(e) => Search(e)}
                  />
                  <label htmlFor="search" className="m-auto">
                    <FontAwesomeIcon
                      className="cursor-pointer w-4 text-onSecondary my-auto"
                      icon={faSearch}
                    />
                  </label>
                </div>
              </div>
              {/* auth start */}
              <div className="p-2  my-auto grid grid-cols-2 col-span-3 text-sm font-bold text-textColor1">
                <Link href="/auth/signup">
                  <a>
                    <div
                      data-tip="Get an account"
                      className=" border-r text-end pr-2 cursor-pointer"
                    >
                      Signup
                    </div>
                  </a>
                </Link>
                <Link href="/auth/login">
                  <a>
                    <div
                      data-tip="Log into your account"
                      className=" text-start pl-2 cursor-pointer"
                    >
                      Login
                    </div>
                  </a>
                </Link>
              </div>
              {/* auth end */}
            </div>
            {/* user not logged in + searchable nav end */}
          </>
        ) : userState === false &&
          contentSearchableState ===
            contentSearchableStateEnum.notSearchable ? (
          <>
            {/* user not logged in + not searchable nav start */}
            <div className="my-auto ml-auto">
              <div className="grid grid-cols-4 gap-6 my-auto max-w-navIconContainerWid1">
                <div data-tip="Home" className="p-2  my-auto  max-w-iconWid1">
                  <FontAwesomeIcon
                    className="cursor-pointer w-5 text-onSecondary m-auto"
                    icon={faHome}
                  />
                </div>

                <div
                  data-tip="Bloggers"
                  className="p-2  my-auto max-w-iconWid1 "
                >
                  <FontAwesomeIcon
                    className="cursor-pointer w-6 text-onSecondary m-auto"
                    icon={faUsers}
                  />
                </div>

                {/* auth start */}
                <div className="my-auto grid grid-cols-2 col-span-2 text-sm font-bold text-textColor1">
                  <Link href="/auth/signup">
                    <a>
                      <div
                        data-tip="Get an account"
                        className=" border-r text-end pr-2 cursor-pointer"
                      >
                        Signup
                      </div>
                    </a>
                  </Link>
                  <Link href="/auth/login">
                    <a>
                      <div
                        data-tip="Log into your account"
                        className=" text-start pl-2 cursor-pointer"
                      >
                        Login
                      </div>
                    </a>
                  </Link>
                </div>
                {/* auth end */}
              </div>
            </div>
            {/* user not logged in + not searchable nav end */}
          </>
        ) : userState === true &&
          contentSearchableState ===
            contentSearchableStateEnum.notSearchable ? (
          <div className="ml-auto">
            {/* user logged in + not searchable nav start */}
            <div className="grid grid-cols-5 gap-6  my-auto  max-w-navIconContainerWid1 ">
              <Link href="/">
                <a>
                  <div data-tip="Home" className="p-2  my-auto  max-w-iconWid">
                    <FontAwesomeIcon
                      className="cursor-pointer w-5 text-onSecondary m-auto"
                      icon={faHome}
                    />
                  </div>
                </a>
              </Link>
              <Link href="/bloggers">
                <a>
                  <div
                    data-tip="Bloggers"
                    className="p-2  my-auto max-w-iconWid"
                  >
                    <FontAwesomeIcon
                      className="cursor-pointer w-6 text-onSecondary m-auto"
                      icon={faUsers}
                    />
                  </div>
                </a>
              </Link>

              <Dropdown offset={0} className="text-sm">
                <Dropdown.Trigger>
                  <div data-tip="Blogs" className="p-2 my-auto  max-w-iconWid">
                    <FontAwesomeIcon
                      className="cursor-pointer w-5 text-onSecondary m-auto"
                      icon={faBlog}
                    />
                  </div>
                </Dropdown.Trigger>
                <div className="w-28">
                  <Dropdown.Menu aria-label="Static Actions" className="py-0">
                    <Dropdown.Item
                      key="myBlogs"
                      className=" text-textColor1 text-sm p-0 my-2"
                    >
                      <Link
                        href={{
                          pathname: `/user/${loggedInUser.user.id}/blogs`,
                          query: { token: loggedInUser.accessToken },
                        }}
                      >
                        <div className="p-2 ">My Blogs</div>
                      </Link>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </div>
              </Dropdown>

              <Link href="/blogs/new">
                <a>
                  <div
                    data-tip="Add New Blog"
                    className="p-2 my-auto max-w-iconWid"
                  >
                    <FontAwesomeIcon
                      className="cursor-pointer w-5 text-onSecondary m-auto"
                      icon={faCirclePlus}
                    />
                  </div>
                </a>
              </Link>
              <Dropdown offset={0} className="text-sm">
                <Dropdown.Trigger>
                  <div
                    data-tip="User Option"
                    className="p-2  my-auto max-w-iconWid"
                  >
                    <FontAwesomeIcon
                      className="cursor-pointer w-5 text-onSecondary m-auto"
                      icon={faCircleUser}
                    />
                  </div>
                </Dropdown.Trigger>
                <div className="w-28">
                  <Dropdown.Menu aria-label="Static Actions" className="py-0">
                    <Dropdown.Item
                      key="profile"
                      className=" text-textColor1 text-sm p-0 my-2"
                    >
                      <Link
                        href={{
                          pathname: `/user/${loggedInUser.user.id}`,
                          query: { token: loggedInUser.accessToken },
                        }}
                      >
                        <div className="p-2 ">Profile</div>
                      </Link>
                    </Dropdown.Item>

                    <Dropdown.Item
                      key="delete"
                      withDivider
                      color="error"
                      className="text-danger text-sm p-0 my-2"
                    >
                      <div className="p-2" onClick={() => handleLogout()}>
                        Logout
                      </div>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </div>
              </Dropdown>
            </div>
            {/* user logged in + not searchable nav end */}
          </div>
        ) : null}
      </div>
    </div>
  );
}
