import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Popover } from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';
import BlogMetaSection from '../../../../../components/BlogMetaSection';
import CommentSection from '../../../../../components/CommentSection';
import Header from '../../../../../components/Header';
import Nav from '../../../../../components/Nav';
import BodyLayout from '../../../../../components/Ui/BodyLayout';
import ProfilePopover from '../../../../../components/Ui/ProfilePopover';
import heroImage from '../../../../../public/swag-lion.png';

export default function index(props) {
  return (
    <>
      <Header title={props.blog.title} description={props.blog.body} />
      <div className="">
        <Nav contentType={'notSearchable'} />
        <BodyLayout>
          {/* blog body content */}
          <div className="max-w-blogCardWidLg m-auto grid my-5 pb-2 pt-4 px-5 border border-secondary rounded-md">
            {/* user icon */}
            <Popover>
              <div className="grid grid-flow-col">
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
                <div className="ml-auto my-auto mr-10">
                  <Link
                    href={{
                      pathname: `/user/${props.userId}/blogs/${props.blog.id}/edit`,
                      query: { token: props.token },
                    }}
                  >
                    <a>
                      <FontAwesomeIcon
                        data_tip="edit this blog"
                        className="cursor-pointer text-textColor2 max-w-iconWid w-5 h-5 m-auto"
                        icon={faPenToSquare}
                      />
                    </a>
                  </Link>
                </div>
              </div>
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

export const getServerSideProps = async (context) => {
  let url = process.env.url;
  try {
    let res = await fetch(
      `${url}/api/user/${context.params.id}/blogs/${context.params.blogId}`,
      {
        method: 'GET',
        headers: { Authorization: `Bearer ${context.query.token}` },
      }
    );
    let blog = await res.json();
    return {
      props: {
        blog,
        userId: context.params.id,
        token: context.query.token,
      },
    };
  } catch (error) {
    console.error(error);

    return {
      notFound: true,
    };
  }
};
