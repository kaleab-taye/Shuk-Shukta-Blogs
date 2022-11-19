import Link from 'next/link';

export default function Footer() {
  return (
    <div className="border-t">
      <div className=" max-w-contentWid 2xl:max-w-contentWidLg m-auto flex flex-col pt-6 pb-16 px-4 gap-4">
        <Link href="#">
          <a className="m-auto grid">
            <div className="cursor-pointer flex m-auto text-4xl lg:text-5xl  font-semibold font-commonFont text-accent">
              Shuk-Shukta Blogs
            </div>
          </a>
        </Link>
        <div className=" font-commonFont text-lg ">
          Feel totally free to share your ideas, read what others have blogged,
          you can also support or be against what’s written and if you got any
          additional thoughts make sure to comment them on the blogs.
          <br />
          Despite all the freedom and power we have entrusted you with, be
          responsible to what you share & what you respond to what others have
          shared.{' '}
        </div>
      </div>
    </div>
  );
}
