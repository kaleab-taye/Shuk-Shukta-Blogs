import { faCommentDots, faEye } from '@fortawesome/free-regular-svg-icons';
import {
  faArrowDown,
  faArrowUp,
  faEllipsis,
} from '@fortawesome/free-solid-svg-icons';
import { Popover } from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import BlogContextProvider from '../../../components/BlogContextProvider';
import BlogMetaSection from '../../../components/BlogMetaSection';
import CommentSection from '../../../components/CommentSection';
import Header from '../../../components/Header';
import Nav from '../../../components/Nav';
import PageHeading from '../../../components/PageHeading';
import Blog_List from '../../../components/Ui/Blog-List';
import BodyLayout from '../../../components/Ui/BodyLayout';
import HomeBlogCard from '../../../components/Ui/Home-Blog-Card';
import HomeBlogCardIcons from '../../../components/Ui/Home-Blog-Card-Icons';
import ProfilePopover from '../../../components/Ui/ProfilePopover';
import ChipSection from '../../../components/Ui/section/ChipSection';
import heroImage from '../../../public/swag-lion.png';

export default function Blog(props) {
  const webUrl = process.env.url;

  useEffect(() => {
    // console.log('a', localStorage.getItem(props.blog.id));
    // localStorage.removeItem(props.blog.id);
    if (localStorage.getItem(props.blog.id) === null) {
      localStorage.setItem(props.blog.id, JSON.stringify({ seen: true }));
      addSeen();
    }
  }, []);

  async function addSeen() {
    let headersList = {
      'Content-Type': 'application/json',
    };
    let bodyContent = JSON.stringify({});

    try {
      let response = await fetch(`${webUrl}/api/blogs/${props.blog.id}/seen`, {
        method: 'POST',
        body: bodyContent,
        headers: headersList,
      });

      let resp = await response.text();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Header title={props.blog.title} description={props.blog.body} />
      <div className="">
        <Nav contentType={'notSearchable'} />
        <BodyLayout
          rightContent={
            <ChipSection options={props.blog.category} disabled={true} />
          }
        >
          {/* blog body content */}
          <div className="max-w-blogCardWidLg m-auto grid my-5 pb-2 pt-4 px-5 border border-secondary rounded-md">
            {/* user icon */}
            <Popover>
              <Popover.Trigger>
                <div className=" grid grid-flow-col mr-auto my-auto">
                  <div className="m-auto inline-block h-11 w-11 xl:h-12 xl:w-12 rounded-full ring-2 ring-secondary">
                    <Image src={heroImage} alt="user image" />
                  </div>
                  <div className="mr-auto grid my-auto pl-3">
                    <div className="mt-auto text-textColor1 text-md font-medium my-auto">
                      {props.blog.author.fullName}
                    </div>
                    <div className=" leading-none mb-auto text-textColor3 text-xs">
                      {new Date(props.blog.blogMeta.date).toUTCString()}
                    </div>
                  </div>
                </div>
              </Popover.Trigger>
              <Popover.Content css={{ px: '$4', py: '$2' }}>
                <ProfilePopover user={props.blog.author} />
              </Popover.Content>
            </Popover>
            <div className="grid ">
              {/* blog content section */}
              <div className="grid py-4 ">
                <h1 className=" break-word font-semibold text-3xl pt-2 pb-2 text-textColor1 font-commonFont">
                  {props.blog.title}
                </h1>
                <p className=" text-md text-textColor1 break-word text-justify ">
                  {' '}
                  {props.blog.body}
                </p>
              </div>
              {/* blog meta section */}
              <BlogMetaSection blog={props.blog} />
            </div>
          </div>
          <div className="m-auto max-w-blogCardWidLg">
            <CommentSection id={props.blog.id} comments={props.blog.comment} />
          </div>
        </BodyLayout>
        {/* <Footer /> */}
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  let url = process.env.url;
  try {
    let res = await fetch(`${url}/api/blogs/${context.params.id}`);
    var blog = await res.json();
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
      blog: blog,
    },
  };
}

// export async function getStaticPaths() {
//   let url = process.env.url;

//   let res = await fetch(`${url}/api/blogs`);
//   let blogs = await res.json();

//   const ids = blogs.map((blog) => blog.id);
//   const paths = ids.map((id) => ({
//     params: {
//       id: id.toString(),
//     },
//   }));

//   return {
//     paths,
//     fallback: false,
//   };
// }

// <div className="max-w-contentWid 2xl:max-w-contentWidLg m-auto my-10 xl:my-20 px-5 ">
//         <div className="break-words  text-3xl lg:text-4xl font-semibold font-commonFont text-accent pb-2">
//           <PageHeading
//             className=""
//             heading={props.blog.title}
//             backTo={`/#${props.blog.id}`}
//           />
//         </div>
//         <hr />
//         <div
//           style={{ whiteSpace: 'pre-wrap' }}
//           className="text-justify break-words py-10 font-commonFont text-lg lg:text-xl "
//         >
//           {props.blog.body}
//         </div>
//         <hr />
//         <BlogMetaSection blog={props.blog} />
//         <hr />
//         <CommentSection id={props.blog.id} comments={props.blog.comment} />
//         <hr />
//       </div>
